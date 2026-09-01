import puppeteer from "puppeteer";
import { PNG } from "pngjs";

const url = process.env.URL || "http://localhost:3111";
const browser = await puppeteer.launch({ args: ["--no-sandbox", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text()}`));
page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
page.on("requestfailed", (r) => logs.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

const info = await page.evaluate(() => {
  const c = document.querySelector(".warp-field canvas");
  const out = { canvasFound: !!c };
  if (c) {
    const r = c.getBoundingClientRect();
    out.css = { w: r.width, h: r.height, top: r.top };
    out.buffer = { w: c.width, h: c.height };
    out.filter = getComputedStyle(c).filter;
    out.visible = getComputedStyle(c).display !== "none" && r.width > 0 && r.height > 0;
  }
  const host = document.querySelector(".warp-field-backdrop");
  if (host) {
    const hr = host.getBoundingClientRect();
    out.host = { w: hr.width, h: hr.height, position: getComputedStyle(host).position, z: getComputedStyle(host).zIndex };
  }
  return out;
});
console.log("CANVAS_INFO", JSON.stringify(info, null, 1));

const shot = await page.screenshot({ type: "png" });
const png = PNG.sync.read(shot);
let sum = 0, lit = 0, total = 0;
const buckets = {};
for (let i = 0; i < png.data.length; i += 4) {
  const r = png.data[i], g = png.data[i + 1], b = png.data[i + 2];
  const l = (r + g + b) / 3;
  sum += l; total++;
  if (l > 40) lit++;
  const key = l > 200 ? "bright" : l > 80 ? "mid" : l > 20 ? "dim" : "black";
  buckets[key] = (buckets[key] || 0) + 1;
}
console.log("PIXELS avgBrightness=" + (sum / total).toFixed(2), "lit%=" + (100 * lit / total).toFixed(2));
console.log("BUCKETS", JSON.stringify(Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, (100 * v / total).toFixed(1) + "%"]))));

// Sample the top-right corner region (mostly background, little text)
let bsum = 0, bcount = 0;
for (let y = 0; y < 200; y++) for (let x = 900; x < 1400; x++) {
  const i = (y * png.width + x) * 4;
  bsum += (png.data[i] + png.data[i + 1] + png.data[i + 2]) / 3; bcount++;
}
console.log("TOPRIGHT avgBrightness=" + (bsum / bcount).toFixed(2));

console.log("CONSOLE_LOGS", JSON.stringify(logs.slice(0, 15), null, 1));
await page.screenshot({ path: "warp-field-check.png", type: "png" });
await browser.close();
