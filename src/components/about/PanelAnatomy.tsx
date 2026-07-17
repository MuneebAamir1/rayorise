"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";

const stages = [
  {
    id: 1,
    label: "Silhouette",
    spec: "Custom panel geometry",
    detail: "Every garment starts with the outline — your silhouette defines the fit, the proportions, and the entire visual balance of the piece.",
    color: "rgba(240,232,216,0.08)",
    accent: "rgba(201,145,58,0.15)",
  },
  {
    id: 2,
    label: "Panel Layout",
    spec: "Pantone-matched colour blocking",
    detail: "The contrast panels are where your brand identity lives. We map every block to your exact Pantone references.",
    color: "rgba(201,145,58,0.06)",
    accent: "rgba(201,145,58,0.25)",
  },
  {
    id: 3,
    label: "Fabric",
    spec: "280gsm French Terry or Tricot",
    detail: "We source the right weight and hand-feel for your product — from heavyweight French Terry to classic polyester Tricot.",
    color: "rgba(42,37,32,0.9)",
    accent: "rgba(201,145,58,0.3)",
  },
  {
    id: 4,
    label: "Stitching",
    spec: "Overlock + chain stitch finish",
    detail: "Professional seam construction that holds up to production volumes and repeated wear. No shortcuts.",
    color: "rgba(201,145,58,0.04)",
    accent: "rgba(201,145,58,0.4)",
  },
  {
    id: 5,
    label: "Branding",
    spec: "Embroidery, patches, woven labels",
    detail: "Your logo, your labels, your identity — applied with precision. Embroidery, heat-sealed patches, or woven labels to your spec.",
    color: "rgba(201,145,58,0.08)",
    accent: G,
  },
  {
    id: 6,
    label: "Packaging",
    spec: "Branded polybags, swing tags, tissue",
    detail: "The unboxing experience matters. Custom polybags, swing tags, tissue paper — all branded to your specifications.",
    color: "rgba(201,145,58,0.1)",
    accent: G,
  },
];

function useIsMobile(bp = 768) {
  const [mob, setMob] = useState(true);
  useEffect(() => {
    const check = () => setMob(window.innerWidth < bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return mob;
}

/* ─── Desktop: scroll-pinned version ─── */
function DesktopAnatomy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const totalStages = stages.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalStages * 400}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const stage = Math.min(
            totalStages - 1,
            Math.floor(self.progress * totalStages)
          );
          setActiveStage(stage);
        },
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, { scope: containerRef });

  const active = stages[activeStage];

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 32px",
      }}
    >
      {/* Left — garment visual */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 4",
          overflow: "hidden",
        }}
      >
        {/* SVG jacket silhouette with stage-driven fill */}
        <svg
          viewBox="0 0 300 400"
          fill="none"
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          {/* Outer silhouette */}
          <path
            d="M80 40 L60 80 L50 180 L55 350 L120 360 L150 355 L180 360 L245 350 L250 180 L240 80 L220 40 L190 30 L170 50 L150 55 L130 50 L110 30 Z"
            stroke={active.accent}
            strokeWidth="1"
            fill={activeStage >= 0 ? active.color : "none"}
            style={{ transition: "fill 0.6s ease, stroke 0.6s ease" }}
          />
          {/* Left panel */}
          <path
            d="M80 40 L60 80 L55 200 L120 200 L130 50 L110 30 Z"
            stroke={activeStage >= 1 ? G : "rgba(255,255,255,0.04)"}
            strokeWidth={activeStage >= 1 ? "1" : "0.5"}
            fill={activeStage >= 1 ? "rgba(201,145,58,0.06)" : "none"}
            style={{ transition: "all 0.6s ease" }}
          />
          {/* Right panel */}
          <path
            d="M220 40 L240 80 L245 200 L180 200 L170 50 L190 30 Z"
            stroke={activeStage >= 1 ? G : "rgba(255,255,255,0.04)"}
            strokeWidth={activeStage >= 1 ? "1" : "0.5"}
            fill={activeStage >= 1 ? "rgba(201,145,58,0.06)" : "none"}
            style={{ transition: "all 0.6s ease" }}
          />
          {/* Collar */}
          <path
            d="M130 50 L150 55 L170 50 L160 25 L150 20 L140 25 Z"
            stroke={activeStage >= 4 ? G : "rgba(255,255,255,0.06)"}
            strokeWidth="1"
            fill={activeStage >= 4 ? "rgba(201,145,58,0.1)" : "none"}
            style={{ transition: "all 0.6s ease" }}
          />
          {/* Fabric grain pattern (stage 2+) */}
          {activeStage >= 2 && (
            <g opacity="0.15" style={{ transition: "opacity 0.6s" }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1={60}
                  y1={80 + i * 25}
                  x2={240}
                  y2={80 + i * 25}
                  stroke={G}
                  strokeWidth="0.3"
                  strokeDasharray="2 6"
                />
              ))}
            </g>
          )}
          {/* Stitch lines (stage 3+) */}
          {activeStage >= 3 && (
            <g opacity="0.4" style={{ transition: "opacity 0.6s" }}>
              <line x1="120" y1="100" x2="120" y2="350" stroke={G} strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="180" y1="100" x2="180" y2="350" stroke={G} strokeWidth="0.8" strokeDasharray="3 3" />
            </g>
          )}
          {/* Branding badge (stage 4+) */}
          {activeStage >= 4 && (
            <g style={{ transition: "opacity 0.6s" }}>
              <rect x="130" y="120" width="40" height="16" rx="1" fill={G} opacity="0.2" />
              <text x="150" y="131" fill={G} fontSize="6" textAnchor="middle" fontFamily="var(--font-dm-sans)" fontWeight="700" opacity="0.8">LOGO</text>
            </g>
          )}
          {/* Packaging outline (stage 5+) */}
          {activeStage >= 5 && (
            <rect x="40" y="10" width="220" height="380" rx="4" stroke={G} strokeWidth="0.5" strokeDasharray="8 4" fill="none" opacity="0.2" />
          )}
        </svg>

        {/* Stage progress dots */}
        <div
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {stages.map((s, i) => (
            <div
              key={s.id}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i <= activeStage ? G : "rgba(255,255,255,0.1)",
                border: i === activeStage ? `2px solid ${G}` : "none",
                boxShadow: i === activeStage ? `0 0 8px rgba(201,145,58,0.3)` : "none",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right — spec readout */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <p
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(212,255,43,0.5)",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Stage {active.id} of {stages.length}
        </p>
        <motion.h3
          key={active.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "#F0E8D8",
            margin: 0,
          }}
        >
          {active.label}
        </motion.h3>
        <motion.p
          key={active.spec}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: G,
            fontFamily: "var(--font-dm-sans)",
            margin: 0,
            padding: "8px 16px",
            background: "rgba(201,145,58,0.06)",
            border: "1px solid rgba(201,145,58,0.12)",
            width: "fit-content",
          }}
        >
          {active.spec}
        </motion.p>
        <motion.p
          key={active.detail}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
            margin: 0,
            maxWidth: 440,
          }}
        >
          {active.detail}
        </motion.p>

        {/* Progress bar */}
        <div style={{ marginTop: 8 }}>
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(255,255,255,0.06)",
              position: "relative",
            }}
          >
            <motion.div
              animate={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                height: "100%",
                background: G,
              }}
            />
          </div>
        </div>

        {/* Key quote */}
        <p
          style={{
            fontSize: 13,
            color: "#6A5F54",
            fontFamily: "var(--font-dm-sans)",
            fontStyle: "italic",
            margin: "16px 0 0",
            borderLeft: `2px solid rgba(201,145,58,0.2)`,
            paddingLeft: 16,
          }}
        >
          Every block of colour is a brand decision. We build the garment around it.
        </p>
      </div>
    </div>
  );
}

/* ─── Mobile: stacked modules ─── */
function MobileAnatomy() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {stages.map((stage) => (
        <MobileStageCard key={stage.id} stage={stage} />
      ))}
      <p
        style={{
          fontSize: 13,
          color: "#6A5F54",
          fontFamily: "var(--font-dm-sans)",
          fontStyle: "italic",
          borderLeft: `2px solid rgba(201,145,58,0.2)`,
          paddingLeft: 16,
          marginTop: 8,
        }}
      >
        Every block of colour is a brand decision. We build the garment around it.
      </p>
    </div>
  );
}

function MobileStageCard({ stage }: { stage: (typeof stages)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      style={{
        background: "#2A2520",
        border: `1px solid ${open ? "rgba(201,145,58,0.2)" : "rgba(255,255,255,0.06)"}`,
        borderLeft: `3px solid ${open ? G : "rgba(201,145,58,0.2)"}`,
        padding: "16px 20px",
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
        transition: "border-color 0.3s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: G,
              fontFamily: "var(--font-barlow-condensed)",
              width: 24,
            }}
          >
            0{stage.id}
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#F0E8D8",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {stage.label}
          </span>
        </div>
        <span style={{ fontSize: 11, color: "#6A5F54", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </div>
      {open && (
        <div style={{ marginTop: 12, paddingLeft: 36 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: G,
              fontFamily: "var(--font-dm-sans)",
              margin: "0 0 6px",
            }}
          >
            {stage.spec}
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
              margin: 0,
            }}
          >
            {stage.detail}
          </p>
        </div>
      )}
    </button>
  );
}

export default function PanelAnatomy() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const headEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-anat-head]");
      gsap.fromTo(headEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: headEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      const goldLine = sectionRef.current!.querySelector<HTMLElement>("[data-gold-line]");
      if (goldLine) {
        gsap.fromTo(goldLine, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="panel-anatomy"
      style={{
        width: "100%",
        background: "#1A1612",
        padding: "112px 0",
        position: "relative",
      }}
    >
      <div
        data-gold-line=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`,
          transformOrigin: "left",
          transform: "scaleX(0)",
        }}
      />

      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto 56px", padding: "0 32px" }}>
        <p
          data-anat-head=""
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: G,
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 600,
            margin: "0 0 16px",
            opacity: 0,
          }}
        >
          02 — Designed Around the Panel
        </p>
        <h2
          data-anat-head=""
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.05,
            color: "#F0E8D8",
            margin: 0,
            maxWidth: 600,
            opacity: 0,
          }}
        >
          Anatomy of a{" "}
          <span style={{ color: G }}>RayoRise</span> tracksuit.
        </h2>
      </div>

      {isMobile ? <MobileAnatomy /> : <DesktopAnatomy />}
    </section>
  );
}
