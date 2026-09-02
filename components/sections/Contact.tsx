"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT, Panel, SectionHeading } from "../traevu";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  // Honest submit: compose a real mailto draft from the field values.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry from ${name || "your portfolio"}`,
    );
    const body = encodeURIComponent(
      `${details}\n\n— ${name}\n${email}`,
    );
    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="flex min-h-screen items-center justify-center px-6 py-20 md:px-12"
    >
      <div className="w-full max-w-4xl">
        <SectionHeading
          kicker="Contact"
          title="Let's Build Something Amazing"
          lede="Ready to elevate your project with cutting-edge technology?"
        />

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.36, ease: [...EASE_OUT] }}
        >
          <Panel className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-[11px] text-brand-muted"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="t-input"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-[11px] text-brand-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="t-input"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-details"
                  className="mb-2 block text-[11px] text-brand-muted"
                >
                  Project Details
                </label>
                <textarea
                  id="contact-details"
                  rows={6}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="t-input"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="hero-cta hero-cta--primary contact-submit"
                >
                  <span>Send Message</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </Panel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.36, delay: 0.08, ease: [...EASE_OUT] }}
          className="mt-10 space-y-3"
        >
          <p className="text-[12px] text-brand-muted">Or reach out directly:</p>
          <div className="flex gap-6">
            <a href="mailto:your@email.com" className="t-link text-[12px]">
              Email
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="t-link text-[12px]"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="t-link text-[12px]"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
