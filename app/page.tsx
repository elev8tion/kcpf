import { WarpFieldBackground } from "@/components/effects/warp-field/WarpFieldBackground";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

const FOOTER_LINKS = [
  { label: "Email", href: "mailto:your@email.com", external: false },
  { label: "GitHub", href: "https://github.com/yourusername", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", external: true },
];

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Background — Warp Field, hyperspace variant (verified Traevu source, Three.js r128) */}
      <div
        aria-hidden
        className="shader-frame fixed inset-0 z-0 overflow-hidden bg-[color:var(--page)]"
      >
        <WarpFieldBackground
          variant="hyperspace"
          speed={15.0}
          streakOpacity={0.6}
          tileOpacity={0.9}
          fov={75}
          hue={0}
          saturation={1.0}
          brightness={1.0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Contact />

        {/* Footer strip — Traevu meta-bar pattern */}
        <footer className="border-t border-[color:var(--border)] px-6 py-6 md:px-12">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="t-microlabel">© 2026 elev8tion</p>
            <nav aria-label="Footer" className="flex items-center gap-5">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="t-microlabel underline decoration-[color:var(--border)] underline-offset-4 transition-colors duration-150 hover:text-[color:var(--foreground)] hover:decoration-current"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </main>
  );
}
