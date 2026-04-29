"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C8102E";
const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { number: 50, suffix: "+", label: "Units MOQ", icon: "📦" },
  { number: 10, prefix: "7–", suffix: " Days", label: "Sampling", icon: "⏱" },
  { number: 5, prefix: "3–", suffix: " Weeks", label: "Production", icon: "🏭" },
  { number: null, text: "Full", label: "Panel Customisation", icon: "🎨" },
];

/* Count-up with easing */
function CountUp({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
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

  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>{prefix}{count}{suffix}</span>;
}

export default function TrustStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  /* GSAP: parallax gold line across the top */
  useGSAP(() => {
    if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const line = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");
    if (!line) return;

    gsap.fromTo(line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#111111",
      }}
    >
      {/* Animated gold top border */}
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
      {/* Bottom border */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(200,16,46,0.15) 30%, rgba(200,16,46,0.15) 70%, transparent)` }} />

      <style>{`@media(min-width:768px){.trust-grid{grid-template-columns:repeat(4,1fr)!important}}`}</style>
      <div className="trust-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "36px 16px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(200,16,46,0.1)" : "none",
              position: "relative",
            }}
          >
            {/* Hover glow — subtle gold radial on hover */}
            <motion.div
              whileHover={{ opacity: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle, rgba(200,16,46,0.04) 0%, transparent 70%)`,
                opacity: 0,
                transition: "opacity 0.3s",
                pointerEvents: "none",
              }}
            />

            {/* Number */}
            <div
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 900,
                lineHeight: 1,
                color: G,
                fontFamily: "var(--font-barlow-condensed)",
                marginBottom: 6,
              }}
            >
              {stat.number !== null ? (
                <CountUp target={stat.number} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
              ) : (
                stat.text
              )}
            </div>

            {/* Label */}
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#4A4A4A",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
