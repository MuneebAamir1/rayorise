"use client";

const G = "#C9913A";

/**
 * CSS-only fallback for the hero visual when 3D canvas is not available
 * (mobile, SSR, reduced-motion, or while 3D is loading).
 * Renders abstract layered fabric panel shapes with gradients and grain.
 */
export default function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 400,
        overflow: "hidden",
      }}
    >
      {/* Background grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Panel 1 — large back panel */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "45%",
          height: "65%",
          background: "linear-gradient(135deg, #2A2520 0%, #1A1612 100%)",
          border: "1px solid rgba(201,145,58,0.08)",
          transform: "rotate(-2deg) skewY(1deg)",
          opacity: 0.9,
        }}
      />

      {/* Panel 2 — contrast side panel */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "18%",
          width: "30%",
          height: "50%",
          background: "linear-gradient(180deg, rgba(201,145,58,0.06) 0%, #221E19 100%)",
          border: "1px solid rgba(201,145,58,0.12)",
          transform: "rotate(1.5deg)",
          opacity: 0.85,
        }}
      />

      {/* Panel 3 — sleeve panel */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "8%",
          width: "22%",
          height: "40%",
          background: "linear-gradient(160deg, #2A2520 0%, rgba(201,145,58,0.04) 100%)",
          border: "1px solid rgba(255,255,255,0.04)",
          transform: "rotate(-4deg) skewX(2deg)",
          opacity: 0.7,
        }}
      />

      {/* Panel 4 — small accent panel */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "25%",
          width: "18%",
          height: "25%",
          background: G,
          opacity: 0.04,
          transform: "rotate(3deg)",
        }}
      />

      {/* Technical grid lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        viewBox="0 0 600 500"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Vertical construction lines */}
        <line x1="200" y1="30" x2="200" y2="470" stroke="rgba(201,145,58,0.06)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="400" y1="30" x2="400" y2="470" stroke="rgba(201,145,58,0.06)" strokeWidth="0.5" strokeDasharray="4 8" />
        {/* Horizontal construction lines */}
        <line x1="50" y1="150" x2="550" y2="150" stroke="rgba(201,145,58,0.04)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="50" y1="350" x2="550" y2="350" stroke="rgba(201,145,58,0.04)" strokeWidth="0.5" strokeDasharray="4 8" />
        {/* Cross mark */}
        <line x1="295" y1="245" x2="305" y2="255" stroke={G} strokeWidth="0.8" opacity="0.3" />
        <line x1="305" y1="245" x2="295" y2="255" stroke={G} strokeWidth="0.8" opacity="0.3" />
      </svg>

      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "30%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,145,58,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
