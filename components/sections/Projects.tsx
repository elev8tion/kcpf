"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../glass/GlassContainer";
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
    <section id="projects" className="min-h-screen py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-white/60">
            Building the future with AI and modern frameworks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => setSelected(project)}
            >
              <GlassCard
                className="h-full flex flex-col"
                variant="frosted"
                animation="shimmer"
                interactive={true}
                ripple={true}
              >
                {project.image && (
                  <div className="relative -mx-5 -mt-5 mb-5 overflow-hidden rounded-t-2xl border-b border-white/10">
                    <img
                      src={project.image}
                      alt={`${project.title} demo`}
                      className="w-full h-44 object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 mb-5">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <span className="text-indigo-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-indigo-300">
                  See it in action
                  <span aria-hidden>→</span>
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
