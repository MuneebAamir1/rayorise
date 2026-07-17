"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const EASE = [0.16, 1, 0.3, 1] as const;

const metrics = [
  { number: 50, suffix: "+", label: "units MOQ", prefix: "" },
  { number: 10, suffix: "", label: "working days to sample", prefix: "7–" },
  { number: 5, suffix: "", label: "weeks production", prefix: "3–" },
  { number: 100, suffix: "%", label: "panel customisation", prefix: "" },
];

const pillars = [
  {
    title: "Built for brands, not marketplaces",
    desc: "We serve founders and designers — not resellers or Amazon dropshippers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Samples before production, every time",
    desc: "You hold the garment in your hands before a single unit goes into bulk.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Clear process. Clear timelines.",
    desc: "You always know where your order is and when it arrives. No guessing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* ─── Count Up ─── */
function CountUp({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = Date.now();
    const timer = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function ProofMetrics() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const goldLine = sectionRef.current!.querySelector<HTMLElement>("[data-gold-line]");
      if (goldLine) {
        gsap.fromTo(goldLine, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      const pillars = sectionRef.current!.querySelectorAll<HTMLElement>("[data-pillar]");
      gsap.fromTo(pillars, { y: 32, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: pillars[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="proof-metrics"
      style={{
        width: "100%",
        background: "#1A1612",
        padding: "96px 0",
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
          background: `linear-gradient(90deg, transparent, ${G} 30%, ${G} 70%, transparent)`,
          transformOrigin: "left",
          transform: "scaleX(0)",
        }}
      />

      {/* Metrics band */}
      <style>{`
        .metrics-grid { grid-template-columns: repeat(2, 1fr); }
        @media(min-width: 768px) {
          .metrics-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>

      <div
        className="metrics-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gap: 0,
        }}
      >
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 16px",
              textAlign: "center",
              borderRight:
                i < metrics.length - 1
                  ? "1px solid rgba(201,145,58,0.1)"
                  : "none",
            }}
          >
            <div
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 800,
                lineHeight: 1,
                color: G,
                fontFamily: "var(--font-barlow-condensed)",
                marginBottom: 8,
              }}
            >
              <CountUp
                target={metric.number}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
            </div>
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#8A7E70",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
              }}
            >
              {metric.label}
            </span>
          </div>
        ))}
      </div>

      {/* Credibility pillars */}
      <style>{`
        .pillars-grid { grid-template-columns: 1fr; }
        @media(min-width: 768px) {
          .pillars-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      <div
        className="pillars-grid"
        style={{
          maxWidth: 1080,
          margin: "64px auto 0",
          padding: "0 32px",
          display: "grid",
          gap: 24,
        }}
      >
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            data-pillar=""
            style={{
              background: "#2A2520",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: `2px solid rgba(201,145,58,0.3)`,
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              opacity: 0,
            }}
          >
            {pillar.icon}
            <h4
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#F0E8D8",
                fontFamily: "var(--font-dm-sans)",
                margin: 0,
              }}
            >
              {pillar.title}
            </h4>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "#8A7E70",
                fontFamily: "var(--font-dm-sans)",
                margin: 0,
              }}
            >
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
