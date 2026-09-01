"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Chip, EASE_SHEET, IconButton } from "../traevu";
import type { Project } from "./Projects";

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

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
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="t-scrim fixed inset-0 z-50 flex items-center justify-center px-4 md:px-8"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
            transition={{ duration: 0.3, ease: [...EASE_SHEET] }}
            onClick={(e) => e.stopPropagation()}
            className="t-dialog relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6"
          >
            <IconButton
              label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 z-10"
            >
              <CloseIcon />
            </IconButton>

            <h3 className="text-[20px] leading-8 tracking-[-0.6px]">
              {project.title}
            </h3>
            <p className="mb-5 mt-1 max-w-2xl text-[13px] leading-[20px] text-brand-muted">
              {project.description}
            </p>

            {/* Video demo */}
            {project.video ? (
              <div className="mb-6 overflow-hidden rounded-md border-[0.5px] border-[color:var(--border)] bg-brand-wall">
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="max-h-[55vh] w-full"
                />
              </div>
            ) : (
              <>
                {/* Gallery */}
                <div className="relative mb-3 overflow-hidden rounded-md border-[0.5px] border-[color:var(--border)] bg-brand-wall">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={project.gallery[active]}
                      src={project.gallery[active]}
                      alt={`${project.title} screenshot ${active + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="max-h-[55vh] w-full object-contain"
                    />
                  </AnimatePresence>

                  {galleryLength > 1 && (
                    <>
                      <IconButton
                        label="Previous screenshot"
                        onClick={() =>
                          setActive((i) => (i - 1 + galleryLength) % galleryLength)
                        }
                        className="t-iconbtn--lg absolute left-3 top-1/2 -translate-y-1/2"
                      >
                        <ChevronIcon direction="left" />
                      </IconButton>
                      <IconButton
                        label="Next screenshot"
                        onClick={() => setActive((i) => (i + 1) % galleryLength)}
                        className="t-iconbtn--lg absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <ChevronIcon direction="right" />
                      </IconButton>
                    </>
                  )}
                </div>

                {galleryLength > 1 && (
                  <div className="mb-6 flex items-center gap-2">
                    <div className="flex gap-2">
                      {project.gallery.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActive(i)}
                          aria-label={`Screenshot ${i + 1}`}
                          className={`t-thumb ${
                            i === active ? "t-thumb--active" : ""
                          }`}
                        >
                          <img src={src} alt="" />
                        </button>
                      ))}
                    </div>
                    <span className="t-microlabel ml-auto">
                      {active + 1} / {galleryLength}
                    </span>
                  </div>
                )}
              </>
            )}

            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>

            <ul className="mb-6 grid gap-x-6 gap-y-2 md:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-[12px] leading-[20px] text-brand-muted"
                >
                  <span className="t-statusdot" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="t-btn"
              >
                {project.linkLabel}
                <span aria-hidden="true">→</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
