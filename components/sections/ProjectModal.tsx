"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "./Projects";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const galleryLength = project?.gallery.length ?? 0;

  useEffect(() => {
    setActive(0);
  }, [project?.title]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (galleryLength > 1 && e.key === "ArrowRight")
        setActive((i) => (i + 1) % galleryLength);
      if (galleryLength > 1 && e.key === "ArrowLeft")
        setActive((i) => (i - 1 + galleryLength) % galleryLength);
    },
    [project, galleryLength, onClose],
  );

  useEffect(() => {
    if (!project) return;
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4 md:px-8"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-3xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-white/70 mb-5 max-w-2xl">{project.description}</p>

            {/* Video demo */}
            {project.video ? (
              <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-black">
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full max-h-[55vh]"
                />
              </div>
            ) : (
              <>
                {/* Gallery */}
                <div className="relative mb-3 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={project.gallery[active]}
                      src={project.gallery[active]}
                      alt={`${project.title} screenshot ${active + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full object-contain max-h-[55vh]"
                    />
                  </AnimatePresence>

                  {galleryLength > 1 && (
                    <>
                      <button
                        aria-label="Previous screenshot"
                        onClick={() =>
                          setActive((i) => (i - 1 + galleryLength) % galleryLength)
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black/80 hover:text-white"
                      >
                        ‹
                      </button>
                      <button
                        aria-label="Next screenshot"
                        onClick={() => setActive((i) => (i + 1) % galleryLength)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black/80 hover:text-white"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {galleryLength > 1 && (
                  <div className="mb-6 flex gap-2">
                    {project.gallery.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setActive(i)}
                        aria-label={`Screenshot ${i + 1}`}
                        className={`h-14 w-24 overflow-hidden rounded-lg border transition-all ${
                          i === active
                            ? "border-indigo-400 opacity-100"
                            : "border-white/10 opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <span className="text-indigo-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-5 py-2 text-sm font-medium text-indigo-300 border border-indigo-400/30 transition-colors hover:bg-indigo-500/30 hover:text-indigo-200"
              >
                {project.linkLabel} <span aria-hidden>→</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
