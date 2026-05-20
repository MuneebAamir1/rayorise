"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Share your design",
    desc: "Send us your artwork, reference images, or a written brief. We'll review it and come back with a production-ready spec within 48 hours.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <path d="M4 6h24M4 12h16M4 18h20M4 24h12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Sample development",
    desc: "We produce a physical sample of your tracksuit — typically within 7 to 10 working days. You'll receive it for approval before any production begins.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <rect x="6" y="4" width="20" height="24" rx="2" />
        <path d="M11 14h10M11 19h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Your approval",
    desc: "Review the sample, request any amendments, and sign off. We don't proceed to production until you're fully satisfied.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <circle cx="16" cy="16" r="10" />
        <path d="M11 16l3.5 3.5L21 11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Production runs",
    desc: "Full production runs 3–5 weeks. We handle quality control, packaging, and dispatch — tracked to your door.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <path d="M4 20h24M20 20V12l6 8M4 20l6-12h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* Step Node component */
function ProcessStep({ step }: { step: typeof steps[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-step-card=""
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20,
        opacity: 0, position: "relative"
      }}
    >
      {/* Node circle */}
      <div style={{ position: "relative" }}>
        <motion.div
          animate={{
            borderColor: hov ? GL : G,
            backgroundColor: hov ? "rgba(201,145,58,0.1)" : "#1A1612",
            scale: hov ? 1.05 : 1,
            boxShadow: hov ? `0 0 20px rgba(201,145,58,0.2)` : "none"
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: 56, height: 56, borderRadius: "50%", border: "1.5px solid",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, position: "relative"
          }}
        >
          <span style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: G, fontSize: 18 }}>
            {step.number}
          </span>
        </motion.div>
      </div>

      <motion.div animate={{ opacity: hov ? 1 : 0.6, scale: hov ? 1.05 : 1, y: hov ? -4 : 0 }} transition={{ duration: 0.3 }}>
        {step.icon}
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: 22, margin: 0 }}>
          {step.title}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0, maxWidth: 260 }}>
          {step.desc}
        </p>
      </div>
    </div>
  );
}

/* CTA */
function ProcessCTA() {
  const [hov, setHov] = useState(false);
  return (
    <div id="process-cta" style={{ display: "flex", justifyContent: "center", marginTop: 64, opacity: 0 }}>
      <a
        href="#contact"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 700,
          color: hov ? GL : G, fontFamily: "var(--font-dm-sans)", textDecoration: "none", cursor: "pointer",
          textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s"
        }}
      >
        Start this process
        <motion.span animate={{ x: hov ? 6 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
      </a>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const goldLine = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");
    const headerElements = sectionRef.current.querySelectorAll<HTMLElement>("[data-header]");
    const stepsElements = sectionRef.current.querySelectorAll<HTMLElement>("[data-step-card]");
    const connector = sectionRef.current.querySelector<HTMLElement>("[data-connector]");
    const cta = sectionRef.current.querySelector<HTMLElement>("#process-cta");

    if (goldLine) {
      gsap.fromTo(goldLine, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }

    headerElements.forEach((el, i) => {
      gsap.fromTo(el, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    });

    if (connector) {
      gsap.fromTo(connector, { scaleX: 0 }, {
        scaleX: 1, duration: 1.5, ease: "power2.inOut", delay: 0.2,
        scrollTrigger: { trigger: connector, start: "top 85%", toggleActions: "play none none none" },
      });
    }

    stepsElements.forEach((step, i) => {
      gsap.fromTo(step, { y: 40, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.2)", delay: 0.3 + (i * 0.15),
        scrollTrigger: { trigger: step, start: "top 88%", toggleActions: "play none none none" },
      });
    });

    if (cta) {
      gsap.fromTo(cta, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.8,
        scrollTrigger: { trigger: cta, start: "top 95%", toggleActions: "play none none none" },
      });
    }

    return () => ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger && sectionRef.current?.contains(st.vars.trigger as Element)) st.kill();
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ width: "100%", background: "#1A1612", padding: "112px 0", position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Gold top line */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", width: "100%", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p data-header="" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", marginBottom: 16, fontWeight: 600, opacity: 0 }}>
            How it works
          </p>
          <h2 data-header="" style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", lineHeight: 1.05, fontSize: "clamp(32px, 5vw, 56px)", margin: 0, opacity: 0 }}>
            From brief to delivery.
          </h2>
        </div>

        {/* Steps Grid */}
        <style>{`
          .process-grid { grid-template-columns: 1fr; }
          .process-connector { display: none; }
          @media(min-width: 768px) {
            .process-grid { grid-template-columns: repeat(4, 1fr) !important; }
            .process-connector { display: block !important; }
          }
        `}</style>
        
        <div style={{ position: "relative" }}>
          {/* Connector line */}
          <div className="process-connector" style={{ position: "absolute", top: 28, left: "12%", right: "12%", height: 1, zIndex: 0 }}>
            <div
              data-connector=""
              style={{ width: "100%", height: "100%", background: "rgba(201,145,58,0.3)", transformOrigin: "left", transform: "scaleX(0)" }}
            />
            {/* Traveling dot */}
            <motion.div
              style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: G }}
              animate={inView ? { left: ["0%", "100%"] } : {}}
              transition={{ duration: 2.5, ease: "linear", delay: 1, repeat: Infinity, repeatDelay: 1 }}
            />
          </div>

          <div className="process-grid" style={{ display: "grid", gap: 48, position: "relative", zIndex: 10 }}>
            {steps.map((step) => (
              <ProcessStep key={step.number} step={step} />
            ))}
          </div>
        </div>

        <ProcessCTA />
      </div>
    </section>
  );
}
