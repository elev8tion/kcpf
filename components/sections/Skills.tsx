"use client";

import { motion } from "framer-motion";
import { EASE_OUT, Panel, SectionHeading } from "../traevu";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4.5" y="1.5" width="7" height="13" rx="1.5" />
      <path d="M7 12.5h2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M1.5 8h13M8 1.5c-4.5 4-4.5 9 0 13M8 1.5c4.5 4 4.5 9 0 13" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="4.5" y="4.5" width="7" height="7" rx="1" />
      <path d="M6.5 1.5v3M9.5 1.5v3M6.5 11.5v3M9.5 11.5v3M1.5 6.5h3M1.5 9.5h3M11.5 6.5h3M11.5 9.5h3" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 12.5a3 3 0 0 1-.4-5.97 4 4 0 0 1 7.8-.7 2.75 2.75 0 0 1-.4 5.47z" />
    </svg>
  );
}

const skills: Record<string, { items: string[]; icon: JSX.Element }> = {
  "Mobile Development": {
    items: ["Flutter", "React Native", "iOS (Swift)", "Android (Kotlin)"],
    icon: <PhoneIcon />,
  },
  "Web Development": {
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: <GlobeIcon />,
  },
  "AI/ML": {
    items: ["TensorFlow Lite", "ML Kit", "On-device AI", "LLM Integration"],
    icon: <ChipIcon />,
  },
  "Backend & Cloud": {
    items: ["Node.js", "FastAPI", "Firebase", "AWS/GCP"],
    icon: <CloudIcon />,
  },
};

export default function Skills() {
  return (
    <section className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Capabilities"
          title="Skills & Technologies"
          lede="Tools I use to bring ideas to life"
        />

        <div className="grid gap-3 md:grid-cols-2">
          {Object.entries(skills).map(([category, { items, icon }], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.36,
                delay: Math.min(index * 0.035, 0.42),
                ease: [...EASE_OUT],
              }}
            >
              <Panel label={category} icon={icon}>
                <div className="grid grid-cols-2 gap-1.5 p-3.5">
                  {items.map((skill) => (
                    <span key={skill} className="t-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
