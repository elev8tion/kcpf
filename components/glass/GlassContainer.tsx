import { ReactNode, CSSProperties, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/liquid-glass.css";

interface GlassContainerProps {
  children?: ReactNode;
  className?: string;
  width?: string | number;
  height?: string | number;
  padding?: string;
  margin?: string;
  blur?: number;
  opacity?: number;
  borderRadius?: string;
  onClick?: () => void;
  style?: CSSProperties;
  variant?: "default" | "frosted" | "ultra" | "gradient-blue" | "gradient-purple" | "gradient-pink" | "gradient-cyan";
  animation?: "none" | "float" | "pulse" | "glow" | "shimmer";
  interactive?: boolean;
  ripple?: boolean;
}

interface RippleType {
  x: number;
  y: number;
  id: number;
}

export default function GlassContainer({
  children,
  className = "",
  width,
  height,
  padding = "1rem",
  margin,
  blur = 20,
  opacity = 0.05,
  borderRadius = "24px",
  onClick,
  style,
  variant = "default",
  animation = "none",
  interactive = false,
  ripple = false,
}: GlassContainerProps) {
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const rippleIdRef = useRef(0);

  const variantClasses = {
    default: "liquid-glass",
    frosted: "liquid-glass liquid-glass-frosted",
    ultra: "liquid-glass liquid-glass-ultra",
    "gradient-blue": "liquid-glass liquid-glass-gradient-blue",
    "gradient-purple": "liquid-glass liquid-glass-gradient-purple",
    "gradient-pink": "liquid-glass liquid-glass-gradient-pink",
    "gradient-cyan": "liquid-glass liquid-glass-gradient-cyan",
  };

  const animationClasses = {
    none: "",
    float: "liquid-glass-float",
    pulse: "liquid-glass-pulse",
    glow: "liquid-glass-glow",
    shimmer: "liquid-glass-shimmer",
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const glassStyle: CSSProperties = {
    width,
    height,
    padding,
    margin,
    borderRadius,
    backdropFilter: `blur(${blur}px) saturate(180%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
    ...style,
  };

  // Override background if variant is default
  if (variant === "default") {
    glassStyle.background = `rgba(255, 255, 255, ${opacity})`;
  }

  return (
    <motion.div
      className={`
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${interactive ? "liquid-glass-interactive" : ""}
        ${ripple ? "liquid-ripple-container" : ""}
        ${className}
      `}
      style={glassStyle}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={interactive ? { y: -4 } : {}}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="liquid-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// Glass Card variant
interface GlassCardProps extends Omit<GlassContainerProps, "padding"> {
  padding?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  padding = "1.5rem",
  hover = true,
  variant = "frosted",
  animation = "shimmer",
  interactive = true,
  ripple = true,
  ...props
}: GlassCardProps) {
  return (
    <GlassContainer
      className={className}
      padding={padding}
      variant={variant}
      animation={animation}
      interactive={interactive}
      ripple={ripple}
      {...props}
    >
      {children}
    </GlassContainer>
  );
}

// Glass Panel with title
interface GlassPanelProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: GlassContainerProps["variant"];
  animation?: GlassContainerProps["animation"];
}

export function GlassPanel({
  title,
  subtitle,
  children,
  icon,
  className = "",
  variant = "frosted",
  animation = "glow",
}: GlassPanelProps) {
  return (
    <GlassContainer
      className={className}
      padding="1.25rem"
      variant={variant}
      animation={animation}
      interactive={true}
    >
      <div className="flex items-start gap-3 mb-4">
        {icon && (
          <motion.div
            className="text-white text-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {icon}
          </motion.div>
        )}
        <div className="flex-1">
          <motion.h3
            className="text-white text-lg font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>
          {subtitle && (
            <motion.p
              className="text-white/70 text-sm mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
      {children}
    </GlassContainer>
  );
}
