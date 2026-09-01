import { Backdrop } from "@/components/traevu";
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
      {/* Background */}
      <Backdrop />

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
