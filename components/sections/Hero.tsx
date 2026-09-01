"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlassContainer from "../glass/GlassContainer";
import GlassButton from "../glass/GlassButton";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
      <motion.div
        className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left: Text Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
          >
            {/* Vector emblem — trimmed to content, crisp at any size.
                Swap for a wide lockup at /logos/brand.png to display 200×60. */}
            <img
              src="/logos/brand-dark.svg"
              alt="elev8tion"
              width={160}
              height={124}
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Full-Stack Developer
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              AI Engineer
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-white/70 max-w-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Building intelligent solutions with Flutter, React, and cutting-edge
            AI/ML technologies. Specialized in on-device AI and cloud
            architecture.
          </motion.p>

          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <GlassButton
              variant="gradient-blue"
              size="lg"
              glow={true}
              ripple={true}
              icon={<span>🚀</span>}
              iconPosition="left"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </GlassButton>
            <GlassButton
              variant="outline"
              size="lg"
              ripple={true}
              icon={<span>✉️</span>}
              iconPosition="left"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </GlassButton>
          </motion.div>
        </div>

        {/* Right: Profile Image with Glass Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center"
        >
          <div onContextMenu={(e) => e.preventDefault()} className="max-w-md w-full">
            <GlassContainer
              className="relative w-full aspect-square overflow-hidden select-none"
              variant="gradient-purple"
              animation="pulse"
              interactive={true}
              blur={30}
            >
              {/* Profile photo — rendered as a CSS background with an interception
                  overlay: blocks right-click save, drag-out, and long-press callout */}
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
            </GlassContainer>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
