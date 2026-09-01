"use client";

/* Thin integration wrapper around the ported LiquidMetalButton for pill
   buttons on this site. It mirrors the component's own pill width formula
   (pillWidthUnits = clamp(820 + len*94, 1407, 3000)) mapped through the
   authored unit scale (--u = --h / 516 at the authored --h of 52px) so the
   host box exactly fits the authored pill. The iframe is clipped to the
   pill silhouette per the Traevu `.pro-preview-liquid-metal` pattern. */

import { LiquidMetalButton } from "./LiquidMetalButton";
import "./styles.css";

const PILL_HEIGHT_PX = 52;
const UNITS_TO_PX = PILL_HEIGHT_PX / 516;

export function pillHostWidth(text: string) {
  const units = Math.min(3000, Math.max(1407, 820 + text.length * 94));
  return Math.round(units * UNITS_TO_PX);
}

export function LiquidMetalPillButton({
  text,
  onClick,
  className = "",
}: {
  text: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`liquid-metal-button--pill${className ? ` ${className}` : ""}`}
      style={{ width: pillHostWidth(text), height: PILL_HEIGHT_PX }}
    >
      <LiquidMetalButton variant="pill" text={text} onClick={onClick} />
    </div>
  );
}
