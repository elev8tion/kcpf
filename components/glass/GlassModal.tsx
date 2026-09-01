import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassContainer from "./GlassContainer";
import GlassButton from "./GlassButton";
import "../../styles/liquid-glass.css";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  width?: string;
  height?: string;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  variant?: "default" | "frosted" | "ultra" | "gradient-blue" | "gradient-purple" | "gradient-pink" | "gradient-cyan";
  animation?: "none" | "float" | "pulse" | "glow" | "shimmer";
  footer?: ReactNode;
}

export default function GlassModal({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  width = "600px",
  height = "auto",
  closeOnBackdrop = true,
  showCloseButton = true,
  variant = "frosted",
  animation = "glow",
  footer,
}: GlassModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(12px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 w-full"
            style={{ maxWidth: width }}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            <GlassContainer
              variant={variant}
              animation={animation}
              height={height}
              padding="0"
              className="overflow-hidden"
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between p-6 pb-4 border-b border-white/10">
                  <div className="flex-1">
                    {title && (
                      <motion.h2
                        className="text-2xl font-bold text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {title}
                      </motion.h2>
                    )}
                    {subtitle && (
                      <motion.p
                        className="text-white/70 mt-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        {subtitle}
                      </motion.p>
                    )}
                  </div>

                  {showCloseButton && (
                    <motion.button
                      onClick={onClose}
                      className="ml-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  )}
                </div>
              )}

              {/* Body */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {children}
              </motion.div>

              {/* Footer */}
              {footer && (
                <motion.div
                  className="p-6 pt-4 border-t border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {footer}
                </motion.div>
              )}
            </GlassContainer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Preset modal variants
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "success";
}

export function GlassConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmModalProps) {
  const variantConfig = {
    default: {
      glassVariant: "frosted" as const,
      confirmVariant: "gradient-blue" as const,
    },
    danger: {
      glassVariant: "gradient-pink" as const,
      confirmVariant: "gradient-pink" as const,
    },
    success: {
      glassVariant: "gradient-blue" as const,
      confirmVariant: "gradient-blue" as const,
    },
  };

  const config = variantConfig[variant];

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width="400px"
      variant={config.glassVariant}
      footer={
        <div className="flex gap-3 justify-end">
          <GlassButton variant="outline" onClick={onClose} size="sm">
            {cancelText}
          </GlassButton>
          <GlassButton
            variant={config.confirmVariant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            size="sm"
          >
            {confirmText}
          </GlassButton>
        </div>
      }
    >
      <p className="text-white/90">{message}</p>
    </GlassModal>
  );
}
