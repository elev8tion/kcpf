"use client";

import MidnightMist from "@/components/backgrounds/MidnightMist";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Background */}
      <MidnightMist />

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
