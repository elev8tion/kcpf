"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Chip, EASE_OUT, SectionHeading } from "../traevu";
import ProjectModal from "./ProjectModal";

export interface Project {
  title: string;
  image?: string;
  video?: string;
  description: string;
  tags: string[];
  features: string[];
  gallery: string[];
  link?: string;
  linkLabel?: string;
}

const projects: Project[] = [
  {
    title: "vnodes",
    image: "/demos/vnodes-picker.png",
    description:
      "Local code-intelligence engine with a native desktop app. Indexes codebases into symbol/dependency graphs and serves token-budgeted AI context capsules, impact analysis, and MCP tools — wrapped in a sandboxed Electron shell.",
    tags: ["TypeScript", "Electron", "SQLite", "MCP", "Graphs"],
    features: [
      "Multi-language code graph",
      "Token-budgeted AI context",
      "Native macOS app + CI harness",
    ],
    gallery: [
      "/demos/vnodes-graph-large.png",
      "/demos/vnodes-picker.png",
      "/demos/vnodes-map.png",
      "/demos/vnodes-index.png",
      "/demos/vnodes-capsule.png",
    ],
    link: "https://github.com/KcAnom/vnodes",
    linkLabel: "View on GitHub",
  },
  {
    title: "Dodis Browser",
    image: "/demos/dodis-demo-poster.jpg",
    video: "/demos/dodis-demo.mp4",
    description:
      "Agent-ready desktop browser with a safety-gated action bridge. Structured agent commands — navigate, click, fill, snapshot — enforced by a block/confirm/mask/allow policy engine with crash-safe human + agent session recording. Recorded here driving the vnodes and Everyday Christian demos.",
    tags: ["Electron", "TypeScript", "Agent Infra", "Security"],
    features: [
      "Safety-gated agent bridge",
      "Crash-safe session recording",
      "Hardened partitioned webviews",
    ],
    gallery: [],
  },
  {
    title: "Everyday Christian",
    image: "/demos/edc-hero.png",
    description:
      "AI-powered faith companion. Gemini chat grounded on a curated 19,750-example corpus, offline SQLite storage, scheduled devotionals, biometric lock, and in-app purchases — backed by 50+ tests including integration suites.",
    tags: ["Flutter", "Gemini AI", "Riverpod", "SQLite", "iOS/Android"],
    features: ["AI faith companion", "Offline-first", "50+ tests, CI-ready"],
    gallery: [
      "/demos/edc-hero.png",
      "/demos/edc-features.png",
      "/demos/edc-mid.png",
      "/demos/edc-deep.png",
    ],
    link: "https://everydaychristian.app",
    linkLabel: "Visit everydaychristian.app",
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Featured Work"
          title="Featured Projects"
          lede="Building the future with AI and modern frameworks"
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.button
              key={project.title}
              type="button"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.36,
                delay: Math.min(index * 0.035, 0.42),
                ease: [...EASE_OUT],
              }}
              className="t-card flex cursor-pointer flex-col"
            >
              {project.image && (
                <div className="t-card-media m-1.5 mb-0">
                  <img
                    src={project.image}
                    alt={`${project.title} demo`}
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex flex-grow flex-col gap-2.5 px-3.5 pb-3.5 pt-3">
                <h3 className="flex items-center gap-2 text-[13px]">
                  <span className="t-statusdot" aria-hidden="true" />
                  {project.title}
                </h3>

                <p className="flex-grow text-[12px] leading-[20px] text-brand-muted">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>

                <ul className="space-y-1.5">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[12px] leading-[18px] text-brand-muted"
                    >
                      <span className="t-statusdot" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[12px] text-brand-accent">
                  See it in action
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
