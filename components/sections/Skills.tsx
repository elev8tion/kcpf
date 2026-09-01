"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "../glass/GlassContainer";

const skills = {
  "Mobile Development": [
    "Flutter",
    "React Native",
    "iOS (Swift)",
    "Android (Kotlin)",
  ],
  "Web Development": [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  "AI/ML": [
    "TensorFlow Lite",
    "ML Kit",
    "On-device AI",
    "LLM Integration",
  ],
  "Backend & Cloud": [
    "Node.js",
    "FastAPI",
    "Firebase",
    "AWS/GCP",
  ],
};

export default function Skills() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-white/60">
            Tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GlassPanel
                title={category}
                variant="frosted"
                animation="glow"
                icon={
                  index === 0 ? "📱" :
                  index === 1 ? "🌐" :
                  index === 2 ? "🤖" : "☁️"
                }
              >
                <div className="grid grid-cols-2 gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 rounded-[16px] bg-white/5 border border-white/10 text-white/80 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
