"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Quality feature cards (CMS-ready) ─── */
const qualityFeatures = [
  {
    title: "Overlock Stitching",
    what: "Professional overlock stitching on every seam — prevents fraying and creates a clean internal finish.",
    why: "Seams last longer, resist washing wear, and maintain their structure over time.",
    image: "/images/stitching-detail.png",
  },
  {
    title: "Reinforced Stress Points",
    what: "High-stress areas — crotch seam, pocket corners, zipper ends — reinforced with bartack stitching.",
    why: "Prevents tearing at common failure points, extending the usable life of every garment.",
    image: "/images/sewing-machine.png",
  },
  {
    title: "Precision Pattern Engineering",
    what: "Every size grade is developed from a dedicated tracksuit block — not adapted from generic patterns.",
    why: "Consistent fit across all sizes with proper sleeve pitch, crotch curve, and panel alignment.",
    image: "/images/custom-patterns.png",
  },
  {
    title: "Controlled Stitch Density",
    what: "Stitch count per inch is specified and monitored — typically 8–10 stitches per inch for main seams.",
    why: "Balances seam strength with fabric flexibility, preventing puckering or seam failure.",
    image: "/images/fabric-inspection.png",
  },
  {
    title: "Premium Hardware",
    what: "YKK zippers, durable snap buttons, and metal cord ends — selected for performance, not cost.",
    why: "Hardware failures are the most common quality complaint. Premium components prevent returns.",
    image: "/images/factory-floor.png",
  },
  {
    title: "Fabric Performance",
    what: "280gsm–320gsm French Terry and brushed fleece — tested for shrinkage, pilling, and colour fastness.",
    why: "Garments retain their shape, feel, and colour after repeated washing and wear.",
    image: "/images/fabric-texture.png",
  },
];

/* ─── Engineering principles ─── */
const principles = [
  "Engineered for Durability",
  "Precision Construction",
  "Consistent Production Standards",
  "Quality Checked Before Shipment",
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export default function ManufacturingProof() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-quality-card]");
    const heading = sectionRef.current.querySelector<HTMLElement>("[data-heading]");
    const intro = sectionRef.current.querySelector<HTMLElement>("[data-intro]");
    const goldLine = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");
    const strip = sectionRef.current.querySelector<HTMLElement>("[data-strip]");

    /* Gold top line wipe */
    if (goldLine) {
      gsap.fromTo(goldLine, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }

    /* Heading slide */
    if (heading) {
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" } }
      );
    }

    /* Intro */
    if (intro) {
      gsap.fromTo(intro,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.15,
          scrollTrigger: { trigger: intro, start: "top 88%", toggleActions: "play none none none" } }
      );
    }

    /* Cards stagger */
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    });

    /* Strip fade */
    if (strip) {
      gsap.fromTo(strip,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3,
          scrollTrigger: { trigger: strip, start: "top 92%", toggleActions: "play none none none" } }
      );
    }

    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger && sectionRef.current?.contains(st.vars.trigger as Element)) st.kill();
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="manufacturing"
      style={{ width: "100%", background: "#1A1612", padding: "96px 0 112px", position: "relative" }}
    >
      {/* Gold top border — animated */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${G} 30%, ${G} 70%, transparent)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      <style>{`@media(min-width:640px){.quality-grid{grid-template-columns:repeat(2,1fr)!important}} @media(min-width:1024px){.quality-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Heading */}
        <div data-heading="" style={{ maxWidth: 640, marginBottom: 48, opacity: 0 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", marginBottom: 16, fontWeight: 600 }}>
            Manufacturing Quality
          </p>
          <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", lineHeight: 1.05, fontSize: "clamp(28px, 4vw, 48px)", margin: 0 }}>
            Engineered quality.<br />Consistent production.
          </h2>
        </div>

        {/* Intro */}
        <p
          data-intro=""
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
            margin: "-24px 0 40px",
            maxWidth: 680,
            opacity: 0,
          }}
        >
          Quality at RayoRise is built into every stage of production — through carefully selected materials, proven construction methods, and consistent quality control. Not marketing claims — just engineering decisions that make better garments.
        </p>

        {/* Quality cards grid */}
        <div className="quality-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
          {qualityFeatures.map((feature, i) => (
            <QualityCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Engineering Principles Strip */}
        <Reveal delay={0.2}>
          <div
            data-strip=""
            style={{
              marginTop: 36,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px 24px",
              padding: "18px 24px",
              border: "1px solid rgba(201,145,58,0.12)",
              background: "rgba(201,145,58,0.03)",
              opacity: 0,
            }}
          >
            {principles.map((p) => (
              <span
                key={p}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#C8BFA8",
                  fontFamily: "var(--font-dm-sans)",
                  letterSpacing: "0.04em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: G }}>▸</span>
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Quality Feature Card ─── */
function QualityCard({ feature, index }: { feature: typeof qualityFeatures[0]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-quality-card=""
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#221E19",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        cursor: "default",
        opacity: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s, transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        borderColor: hov ? "rgba(201,145,58,0.15)" : "rgba(255,255,255,0.06)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative", height: 180, overflow: "hidden", background: "#2A2520" }}>
        <motion.div
          animate={{ scale: hov ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Image
            src={feature.image}
            alt={`${feature.title} — RayoRise manufacturing quality detail`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
        {/* Gradient overlay */}
        <motion.div
          animate={{ opacity: hov ? 0.6 : 0.3 }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,22,18,0.8) 0%, transparent 50%)", pointerEvents: "none" }}
        />
        {/* Gold bottom border on image */}
        <motion.div
          animate={{ scaleX: hov ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: G, transformOrigin: "left", zIndex: 5 }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
          {feature.title}
        </h3>

        {/* What It Is */}
        <div>
          <span style={{ fontSize: 10, fontWeight: 600, color: G, fontFamily: "var(--font-dm-sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            What It Is
          </span>
          <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: "3px 0 0" }}>
            {feature.what}
          </p>
        </div>

        {/* Why It Matters */}
        <div style={{ marginTop: "auto", paddingTop: 6, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: G, fontFamily: "var(--font-dm-sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Why It Matters
          </span>
          <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#C8BFA8", fontFamily: "var(--font-dm-sans)", margin: "3px 0 0" }}>
            {feature.why}
          </p>
        </div>
      </div>
    </div>
  );
}