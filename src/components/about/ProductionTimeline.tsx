"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Share your design",
    time: "Within 48 hours",
    details: [
      "Send artwork, reference images, or a written brief.",
      "RayoRise returns a production-ready specification within 48 hours.",
      "We clarify fabric, fit, panel layout, branding, and packaging.",
    ],
  },
  {
    number: "02",
    title: "Sample development",
    time: "7–10 working days",
    details: [
      "Physical sample produced to your exact specification.",
      "Typically arrives within 7–10 working days.",
      "Includes your chosen fabric, colour blocking, and branding.",
    ],
  },
  {
    number: "03",
    title: "Approve the sample",
    time: "At your pace",
    details: [
      "Amend and approve before bulk production begins.",
      "Request revisions on fit, fabric weight, or colourway.",
      "No production starts until you sign off.",
    ],
  },
  {
    number: "04",
    title: "Production & dispatch",
    time: "3–5 weeks",
    details: [
      "Production takes 3–5 weeks from approval.",
      "Includes quality control, packaging, and branded finishing.",
      "Tracked dispatch to your UK address.",
    ],
  },
];

function TimelineStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      data-timeline-step=""
      style={{
        display: "flex",
        gap: 24,
        position: "relative",
        opacity: 0,
      }}
    >
      {/* Vertical stitch line + node */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 40,
        }}
      >
        {/* Node */}
        <motion.div
          animate={{
            borderColor: expanded ? GL : "rgba(201,145,58,0.4)",
            backgroundColor: expanded ? "rgba(201,145,58,0.1)" : "transparent",
            boxShadow: expanded ? `0 0 16px rgba(201,145,58,0.2)` : "none",
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1.5px solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
            background: "#1A1612",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onClick={() => setExpanded((o) => !o)}
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          aria-label={`${step.title} - ${expanded ? "collapse" : "expand"}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setExpanded((o) => !o);
            }
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 800,
              fontSize: 14,
              color: G,
            }}
          >
            {step.number}
          </span>
        </motion.div>

        {/* Stitch line */}
        {index < steps.length - 1 && (
          <div
            style={{
              width: 1,
              flex: 1,
              minHeight: 40,
              background: "rgba(201,145,58,0.15)",
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(201,145,58,0.3) 0px, rgba(201,145,58,0.3) 4px, transparent 4px, transparent 8px)",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: index < steps.length - 1 ? 32 : 0 }}>
        <button
          onClick={() => setExpanded((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "8px 0",
            width: "100%",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 800,
              fontSize: "clamp(20px, 3vw, 28px)",
              color: expanded ? "#F0E8D8" : "#8A7E70",
              margin: 0,
              transition: "color 0.3s",
              flex: 1,
            }}
          >
            {step.title}
          </h3>
          <span
            style={{
              fontSize: 11,
              color: G,
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
              padding: "4px 12px",
              border: "1px solid rgba(201,145,58,0.15)",
              background: "rgba(201,145,58,0.04)",
            }}
          >
            {step.time}
          </span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ padding: "12px 0 8px" }}>
                {step.details.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: G,
                        flexShrink: 0,
                        marginTop: 7,
                        opacity: 0.6,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "#8A7E70",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── CTA ─── */
function TimelineCTA() {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="/contact"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: hov ? GL : G,
        scale: hov ? 1.03 : 1,
        boxShadow: hov ? `0 8px 32px rgba(201,145,58,0.25)` : `0 4px 16px rgba(201,145,58,0.1)`,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 40px",
        textDecoration: "none",
        cursor: "pointer",
        color: "#1A1612",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.04em",
        fontFamily: "var(--font-dm-sans)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.span
        animate={{ x: hov ? "350%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "35%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          transform: "skewX(-20deg)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>Start Your Brief</span>
    </motion.a>
  );
}

export default function ProductionTimeline() {
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

      const headEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-tl-head]");
      gsap.fromTo(headEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: headEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      const stepEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-timeline-step]");
      gsap.fromTo(stepEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: stepEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      const ctaEl = sectionRef.current!.querySelector<HTMLElement>("[data-tl-cta]");
      if (ctaEl) {
        gsap.fromTo(ctaEl, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ctaEl, start: "top 92%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="production-timeline"
      style={{
        width: "100%",
        background: "#221E19",
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

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <p
          data-tl-head=""
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(212,255,43,0.5)",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 600,
            margin: "0 0 16px",
            opacity: 0,
          }}
        >
          04 — The Process
        </p>
        <h2
          data-tl-head=""
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.05,
            color: "#F0E8D8",
            margin: "0 0 56px",
            opacity: 0,
          }}
        >
          From rough idea to{" "}
          <span style={{ color: G }}>ready-to-sell.</span>
        </h2>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((step, i) => (
            <TimelineStep key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          data-tl-cta=""
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 56,
            opacity: 0,
          }}
        >
          <TimelineCTA />
        </div>
      </div>
    </section>
  );
}
