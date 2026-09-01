"use client";

import type { ReactNode } from "react";

/* Traevu motion curve constants (C-003) — spread into framer-motion
   transitions as `ease: [...EASE_OUT]` to satisfy tuple typing. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_SHEET = [0.32, 0.72, 0, 1] as const;

export function Button({
  variant = "quiet",
  size = "md",
  icon,
  onClick,
  type = "button",
  className = "",
  children,
}: {
  variant?: "quiet" | "primary";
  size?: "md" | "lg";
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`t-btn ${variant === "primary" ? "t-btn--primary" : ""} ${
        size === "lg" ? "t-btn--lg" : ""
      } ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export function Chip({
  children,
  as = "span",
  href,
  className = "",
}: {
  children: ReactNode;
  as?: "span" | "a";
  href?: string;
  className?: string;
}) {
  const cls = `t-chip ${className}`;
  if (as === "a") {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return <span className={cls}>{children}</span>;
}

export function Panel({
  label,
  icon,
  children,
  className = "",
}: {
  label?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`t-panel ${className}`}>
      {(label || icon) && (
        <div className="t-panel-head">
          {icon && <span className="t-iconwell">{icon}</span>}
          {label && <span>{label}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

export function IconButton({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`t-iconbtn ${className}`}
    >
      {children}
    </button>
  );
}

export function SectionHeading({
  kicker,
  title,
  lede,
  className = "",
}: {
  kicker: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 ${className}`}>
      <p className="t-microlabel">{kicker}</p>
      <h2 className="mt-3">{title}</h2>
      {lede && (
        <p className="mt-2 max-w-xl text-[13px] leading-[20px] text-brand-muted">
          {lede}
        </p>
      )}
    </div>
  );
}

export function Backdrop() {
  return <div aria-hidden="true" className="t-backdrop" />;
}
