"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { MATRIX_FIELD_HTML } from "./matrixFieldSource";
import "./styles.css";

export type MatrixFieldProps = {
  speed?: number;
  size?: number;
  length?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

const LASER_DEFAULTS = {
  speed: 1,
  size: 1,
  length: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function glslFloat(value: number, digits = 3) {
  const fixed = Number(value).toFixed(digits);
  return fixed.includes(".") ? fixed : `${fixed}.0`;
}

function buildFocusedSource(size: number, length: number, speed: number, opacity: number) {
  const controlsJson = JSON.stringify({ speed, opacity }).replace(/</g, "\\u003c");
  const patchedSource = MATRIX_FIELD_HTML.replace(
    "float intensity = 0.006;",
    `float intensity = ${glslFloat(0.006 * size * length, 5)};`,
  );

  const focusStyles = `<style data-matrix-field-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: #000000 !important; }
body { position: relative !important; display: block !important; }
body > * { visibility: hidden !important; }
body[data-matrix-field-ready] > [data-matrix-field-role] { visibility: visible !important; }
[data-matrix-field-residual] { display: none !important; }
[data-matrix-field-role="background"] { position: fixed !important; inset: 0 !important; z-index: 0 !important; display: block !important; width: 100vw !important; height: 100vh !important; max-width: none !important; max-height: none !important; margin: 0 !important; opacity: var(--matrix-field-opacity, 1) !important; pointer-events: none !important; transform: none !important; }
</style>`;

  const controlScript = `<script data-matrix-field-controls>
(function () {
  var controls = ${controlsJson};
  var media = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var baseSpeed = controls.speed || 1;
  if (media && media.matches) controls.speed = 0;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 0);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  function applyVisual() {
    document.documentElement.style.setProperty('--matrix-field-opacity', String(controls.opacity == null ? 1 : controls.opacity));
  }
  function syncMotion() {
    controls.speed = media && media.matches ? 0 : baseSpeed;
  }
  if (media) media.addEventListener('change', function () { syncMotion(); });
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'matrix-field-controls') return;
    var next = event.data.controls || {};
    if (next.speed != null) baseSpeed = next.speed;
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    syncMotion();
    applyVisual();
  });
  window.__MATRIX_FIELD_APPLY_CONTROLS = applyVisual;
  applyVisual();
})();
</script>`;

  const focusScript = `<script data-matrix-field-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var canvas = document.querySelector('#glcanvas');
    if (!canvas) return;
    isolated = true;
    canvas.setAttribute('data-matrix-field-role', 'background');
    document.body.appendChild(canvas);
    Array.from(document.body.children).forEach(function (element) {
      if (element === canvas) return;
      element.setAttribute('data-matrix-field-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-matrix-field-ready', '');
    if (window.__MATRIX_FIELD_APPLY_CONTROLS) window.__MATRIX_FIELD_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  if (document.readyState === 'complete') isolate();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;

  return patchedSource
    .replace(/<head([^>]*)>/i, `<head$1>${controlScript}${focusStyles}`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

export function MatrixField({
  speed = LASER_DEFAULTS.speed,
  size = LASER_DEFAULTS.size,
  length = LASER_DEFAULTS.length,
  opacity = LASER_DEFAULTS.opacity,
  hue = LASER_DEFAULTS.hue,
  saturation = LASER_DEFAULTS.saturation,
  brightness = LASER_DEFAULTS.brightness,
  className = "",
  style,
}: MatrixFieldProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [motionReduced, setMotionReduced] = useState(false);
  const safeSpeed = clamp(speed, 0, 3);
  const safeSize = clamp(size, 0.05, 2.5);
  const safeLength = clamp(length, 0.35, 2.5);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const source = useMemo(
    () => buildFocusedSource(safeSize, safeLength, motionReduced ? 0 : safeSpeed, safeOpacity),
    [motionReduced, safeLength, safeOpacity, safeSize, safeSpeed],
  );

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "matrix-field-controls",
        controls: { speed: motionReduced ? 0 : safeSpeed, opacity: safeOpacity },
      },
      "*",
    );
  }, [motionReduced, safeOpacity, safeSpeed, source]);

  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <div
      className={`matrix-field-root${className ? ` ${className}` : ""}`}
      style={style}
    >
      <iframe
        ref={iframeRef}
        title="Matrix Field Laser"
        srcDoc={source}
        sandbox="allow-scripts"
        loading="eager"
        style={{ filter }}
      />
    </div>
  );
}
