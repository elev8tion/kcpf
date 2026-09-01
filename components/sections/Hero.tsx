"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "../traevu";
import { LiquidMetalPillButton } from "../effects/liquid-metal-button/LiquidMetalPillButton";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 md:px-12">
      <motion.div
        className="grid w-full max-w-6xl items-center gap-12 md:grid-cols-2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [...EASE_OUT] }}
      >
        {/* Left: doc-intro column */}
        <div className="space-y-6">
          <p className="t-microlabel">Full-Stack Development</p>

          {/* Vector emblem — trimmed to content, crisp at any size.
              Swap for a wide lockup at /logos/brand.png to display 200×60. */}
          <img src="/logos/brand-dark.svg" alt="elev8tion" width={160} height={124} />

          <h1 className="text-[clamp(26px,4vw,40px)] leading-[1.3]">
            Full-Stack Developer
            <br />
            <span className="text-brand-accent">AI Engineer</span>
          </h1>

          <p className="max-w-lg text-brand-muted">
            Building intelligent solutions with Flutter, React, and cutting-edge
            AI/ML technologies. Specialized in on-device AI and cloud
            architecture.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <LiquidMetalPillButton
              text="View Projects"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <LiquidMetalPillButton
              text="Contact Me"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
        </div>

        {/* Right: portrait in a hairline surface card.
            Photo rendered as a CSS background with an interception overlay:
            blocks right-click save, drag-out, and long-press callout. */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.08, ease: [...EASE_OUT] }}
          className="flex justify-center"
        >
          <div
            onContextMenu={(e) => e.preventDefault()}
            className="w-full max-w-md"
          >
            <div className="t-portrait">
              <div
                aria-label="Portrait of the developer"
                role="img"
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/kc_shot.png')",
                  WebkitTouchCallout: "none",
                  userDrag: "none",
                } as React.CSSProperties}
              />
              {/* transparent shield — swallows clicks/right-clicks on the photo */}
              <div className="absolute inset-0" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
