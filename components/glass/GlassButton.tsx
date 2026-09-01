import { ReactNode, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/liquid-glass.css";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "gradient-blue" | "gradient-purple" | "gradient-pink";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
  ripple?: boolean;
  glow?: boolean;
}

interface RippleType {
  x: number;
  y: number;
  id: number;
}

export default function GlassButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  ripple = true,
  glow = true,
}: GlassButtonProps) {
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const rippleIdRef = useRef(0);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-2xl",
    md: "px-6 py-3 text-base rounded-3xl",
    lg: "px-8 py-4 text-lg rounded-3xl",
  };

  const variantClasses = {
    primary: "liquid-glass bg-white/10 border-white/20 text-white",
    secondary: "liquid-glass liquid-glass-gradient-blue border-indigo-400/30 text-white",
    outline: "liquid-glass bg-transparent border-white/30 text-white",
    "gradient-blue": "liquid-glass liquid-glass-gradient-blue border-blue-400/30 text-white",
    "gradient-purple": "liquid-glass liquid-glass-gradient-purple border-purple-400/30 text-white",
    "gradient-pink": "liquid-glass liquid-glass-gradient-pink border-pink-400/30 text-white",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = rippleIdRef.current++;

      setRipples((prev) => [...prev, { x, y, id }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }

    onClick?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || loading}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        font-medium border relative overflow-hidden
        flex items-center justify-center gap-2
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${glow ? "liquid-glass-glow" : ""}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileHover={
        disabled || loading
          ? {}
          : {
              scale: 1.05,
              boxShadow: "0 12px 48px 0 rgba(255, 255, 255, 0.15)",
            }
      }
      whileTap={disabled || loading ? {} : { scale: 0.95 }}
    >
      {/* Shimmer effect on hover */}
      <AnimatePresence>
        {isHovered && !disabled && !loading && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Icon and children */}
      {!loading && (
        <>
          {icon && iconPosition === "left" && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {icon}
            </motion.span>
          )}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            {children}
          </motion.span>
          {icon && iconPosition === "right" && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {icon}
            </motion.span>
          )}
        </>
      )}
    </motion.button>
  );
}
