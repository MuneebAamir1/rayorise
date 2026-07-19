"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Benefit cards data ─── */
const benefits = [
  {
    title: "Dedicated Product Expertise",
    body: "Every team member knows tracksuit construction inside out — from rib cuffs to panel alignment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Precision Pattern Development",
    body: "Patterns are engineered specifically for tracksuit silhouettes, not adapted from generic blocks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Consistent Quality Standards",
    body: "Dedicated QC at every stage — fabric inspection, stitching audit, and final garment check.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Faster Sampling Process",
    body: "Streamlined sample development with dedicated pattern graders and sample machinists.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Scalable Bulk Production",
    body: "Production capacity scales from 50 to 5,000 units without compromising fit or finish.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Long-Term Manufacturing Partnership",
    body: "We grow with your brand — repeat production runs with consistent quality and priority scheduling.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ─── Why Specialize points ─── */
const specializePoints = [
  "Better pattern accuracy through dedicated tracksuit block development",
  "More consistent fit across every size and production run",
  "Stronger material expertise — we know exactly which fabrics work for tracksuits",
  "Improved sewing precision with specialised machinists and dedicated production lines",
  "Faster product development cycles from pattern to sealed sample",
  "Rigorous quality control at every stage — fabric in, garment out",
  "Reliable repeat production with documented specifications for every style",
  "Scalable manufacturing from small batches to full production runs",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* GSAP ScrollTrigger animations */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const goldLine = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");
    const image = sectionRef.current.querySelector<HTMLElement>("[data-about-image]");
    const goldBar = sectionRef.current.querySelector<HTMLElement>("[data-gold-bar]");
    const heading = sectionRef.current.querySelector<HTMLElement>("[data-heading]");
    const intro = sectionRef.current.querySelector<HTMLElement>("[data-intro]");
    const eduHeading = sectionRef.current.querySelector<HTMLElement>("[data-edu-heading]");
    const eduPoints = sectionRef.current.querySelectorAll<HTMLElement>("[data-edu-point]");
    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-benefit-card]");

    /* Gold top line wipe */
    if (goldLine) {
      gsap.fromTo(goldLine, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }

    /* Image fade-in */
    if (image) {
      gsap.fromTo(image, { y: 40, scale: 0.96, opacity: 0 }, {
        y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: image, start: "top 85%", toggleActions: "play none none none" },
      });
    }

    /* Gold left bar grow */
    if (goldBar) {
      gsap.fromTo(goldBar, { scaleY: 0 }, {
        scaleY: 1, duration: 0.8, ease: "power2.out", delay: 0.3,
        scrollTrigger: { trigger: goldBar, start: "top 85%", toggleActions: "play none none none" },
      });
    }

    /* Heading */
    if (heading) {
      gsap.fromTo(heading, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      });
    }

    /* Intro paragraph */
    if (intro) {
      gsap.fromTo(intro, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.15,
        scrollTrigger: { trigger: intro, start: "top 90%", toggleActions: "play none none none" },
      });
    }

    /* Educational heading */
    if (eduHeading) {
      gsap.fromTo(eduHeading, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: eduHeading, start: "top 90%", toggleActions: "play none none none" },
      });
    }

    /* Educational points stagger */
    eduPoints.forEach((point, i) => {
      gsap.fromTo(point,
        { x: -16, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.5, ease: "power2.out", delay: i * 0.06,
          scrollTrigger: { trigger: point, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    });

    /* Benefit cards stagger */
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.65, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger && sectionRef.current?.contains(st.vars.trigger as Element)) st.kill();
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ width: "100%", background: "#221E19", padding: "96px 0 112px", position: "relative" }}
    >
      {/* Animated gold top line */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      <style>{`@media(min-width:768px){.about-grid{grid-template-columns:1fr 1fr!important}} @media(min-width:640px){.benefit-grid{grid-template-columns:repeat(2,1fr)!important}} @media(min-width:1024px){.benefit-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
      <div className="about-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr", gap: 64, alignItems: "start" }}>

        {/* LEFT — Educational visual */}
        <div data-about-image="" style={{ position: "relative", opacity: 0 }}>
          {/* Gold left bar — animates from top */}
          <div
            data-gold-bar=""
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: G, zIndex: 10, transformOrigin: "top", transform: "scaleY(0)" }}
          />
          <div style={{ paddingLeft: 16, position: "relative", overflow: "hidden", height: "clamp(400px, 50vw, 580px)" }}>
            <Image
              src="/images/stitching-detail.png"
              alt="Close-up of precision stitching on a tracksuit — RayoRise manufacturing detail"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,17,17,0.4) 0%, transparent 50%)", pointerEvents: "none" }} />
            {/* Gold corner accents */}
            <span style={{ position: "absolute", bottom: 16, right: 16, width: 28, height: 2, background: G }} />
            <span style={{ position: "absolute", bottom: 16, right: 16, width: 2, height: 28, background: G }} />
          </div>
        </div>

        {/* RIGHT — Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Heading group */}
          <div data-heading="" style={{ display: "flex", flexDirection: "column", gap: 16, opacity: 0 }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600, margin: 0 }}>
              About RayoRise
            </p>
            <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", lineHeight: 1.05, fontSize: "clamp(32px, 4vw, 52px)", margin: 0 }}>
              Specialists in football-inspired<br />tracksuit manufacturing
            </h2>
          </div>

          {/* Introduction */}
          <p
            data-intro=""
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
              margin: 0,
              opacity: 0,
            }}
          >
            RayoRise specialises in manufacturing football-inspired tracksuits, track jackets, and track pants for UK streetwear brands. We don't produce dozens of garment categories — we focus on one product family. This allows us to refine every stage of manufacturing, from pattern development and sampling through to bulk production, for better consistency and quality across every order.
          </p>

          {/* Educational block — Why We Specialize */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3
              data-edu-heading=""
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#F0E8D8",
                fontFamily: "var(--font-dm-sans)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                margin: 0,
                opacity: 0,
              }}
            >
              Why We Specialize
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {specializePoints.map((point, i) => (
                <span
                  key={i}
                  data-edu-point=""
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "#8A7E70",
                    fontFamily: "var(--font-dm-sans)",
                    opacity: 0,
                  }}
                >
                  <span style={{ color: G, flexShrink: 0, marginTop: 3 }}>—</span>
                  {point}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits grid */}
          <div className="benefit-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, marginTop: 4 }}>
            {benefits.map((benefit, i) => (
              <BenefitCard key={benefit.title} benefit={benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Interactive benefit card ─── */
function BenefitCard({ benefit }: { benefit: typeof benefits[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-benefit-card=""
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#2A2520",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: `2px solid ${G}`,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        cursor: "default",
        opacity: 0,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        borderColor: hov ? "rgba(201,145,58,0.15)" : "rgba(255,255,255,0.06)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Hover glow */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(201,145,58,0.06) 0%, transparent 70%)", pointerEvents: "none" }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <motion.span
          animate={{ color: hov ? G : "#8A7E70" }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", alignItems: "center", color: "#8A7E70" }}
        >
          {benefit.icon}
        </motion.span>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
          {benefit.title}
        </h4>
      </div>
      <p style={{ fontSize: 12, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
        {benefit.body}
      </p>
    </div>
  );
}