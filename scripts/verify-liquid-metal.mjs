import puppeteer from "puppeteer";

const url = process.env.URL || "http://localhost:3113";
const browser = await puppeteer.launch({ args: ["--no-sandbox", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
const logs = [];
page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5000));

const info = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll(".liquid-metal-button--pill")];
  return hosts.map((h) => {
    const r = h.getBoundingClientRect();
    const f = h.querySelector("iframe");
    const fr = f ? f.getBoundingClientRect() : null;
    const host = h.querySelector(".liquid-metal-button");
    return {
      host: { w: Math.round(r.width), h: Math.round(r.height) },
      iframe: fr ? { w: Math.round(fr.width), h: Math.round(fr.height) } : null,
      state: host ? host.getAttribute("data-state") : null,
      title: f ? f.title : null,
    };
  });
});
console.log("PILLS", JSON.stringify(info, null, 1));

// Inspect each iframe's inner document
const frames = page.frames().filter((f) => f !== page.mainFrame());
for (const f of frames) {
  try {
    const inner = await f.evaluate(() => {
      const btn = document.getElementById("btn");
      const cv = document.querySelector("canvas");
      const label = btn?.querySelector(".lbl")?.textContent;
      const r = btn?.getBoundingClientRect();
      return {
        hasButton: !!btn,
        ariaLabel: btn?.getAttribute("aria-label"),
        label,
        btnSize: r ? { w: Math.round(r.width), h: Math.round(r.height) } : null,
        hasCanvas: !!cv,
        canvasBuf: cv ? { w: cv.width, h: cv.height } : null,
      };
    });
    console.log("FRAME", JSON.stringify(inner));
  } catch (e) {
    console.log("FRAME_EVAL_FAIL", e.message);
  }
}

// Click the first pill at its viewport coordinates (real pointer event — the
// sandboxed iframe correctly blocks contentDocument access) and verify scroll
const target = await page.evaluate(() => {
  const r = document.querySelectorAll(".liquid-metal-button--pill")[0]?.getBoundingClientRect();
  return r ? { x: r.x + r.width / 2, y: r.y + r.height / 2 } : null;
});
const before = await page.evaluate(() => window.scrollY);
if (target) {
  await page.mouse.click(target.x, target.y);
  await new Promise((r) => setTimeout(r, 2000));
}
const after = await page.evaluate(() => window.scrollY);
console.log("ACTIVATION", after > before ? `PASS (scrolled ${Math.round(after - before)}px toward #projects)` : "FAIL");

console.log("PAGE_ERRORS", logs.length ? JSON.stringify(logs) : "none");
await browser.close();
