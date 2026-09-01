"use client";

import { motion } from "framer-motion";
import GlassContainer from "../glass/GlassContainer";
import GlassButton from "../glass/GlassButton";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-6 md:px-12">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-white/60">
            Ready to elevate your project with cutting-edge technology?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <GlassContainer
            className="p-8 md:p-12"
            variant="gradient-cyan"
            animation="glow"
            interactive={true}
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-[16px] bg-white/5 border border-white/10 text-white focus:border-indigo-400/50 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-[16px] bg-white/5 border border-white/10 text-white focus:border-indigo-400/50 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">Project Details</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 rounded-[16px] bg-white/5 border border-white/10 text-white focus:border-indigo-400/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="flex justify-center pt-4">
                <GlassButton
                  variant="gradient-blue"
                  size="lg"
                  glow={true}
                  ripple={true}
                  icon={<span>📨</span>}
                  iconPosition="right"
                  fullWidth={false}
                >
                  Send Message
                </GlassButton>
              </div>
            </div>
          </GlassContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="text-white/60">Or reach out directly:</p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:your@email.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
