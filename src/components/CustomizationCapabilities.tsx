"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C8102E";
const GL = "#E63946";

const capabilities = [
  {
    title: "Full Colour Matching",
    desc: "Choose from unlimited Pantone-matched colourways. Every panel, stripe, and accent tuned to your brand identity.",
    image: "/images/custom-colors.png",
    tag: "Colour",
  },
  {
    title: "Custom Embroidery & Print",
    desc: "Chest logos, sleeve badges, back prints — embroidered, heat-pressed, or screen-printed to your exact artwork.",
    image: "/images/custom-embroidery.png",
    tag: "Branding",
  },
  {
    title: "Pattern Engineering",
    desc: "Bespoke panel layouts, stripe widths, seam placements, and silhouette tweaks. Your design, engineered to production spec.",
    image: "/images/custom-patterns.png",
    tag: "Design",
  },
  {
    title: "Labels & Packaging",
    desc: "Custom woven labels, hang tags, polybag printing, and branded packaging — ready for retail or direct-to-consumer.",
    image: "/images/custom-labelling.png",
    tag: "Finishing",
  },
];

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function CustomizationCapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  /* Gold bar wipe */
  useGSAP(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: barRef.current, start: "top 85%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="customization"
      style={{ background: "#0D0D0D", overflow: "hidden", padding: "96px 0" }}
    >
      <style>{`
        .cust-cap-grid { grid-template-columns: 1fr; }
        @media(min-width: 768px) { .cust-cap-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", marginBottom: 16, fontWeight: 600 }}>
              Customisation Capabilities
            </p>
            <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.05, color: "#F5F0E8", margin: "0 0 16px" }}>
              Your Design.<br />Our Engineering.
            </h2>
            <div
              ref={barRef}
              style={{ width: 64, height: 3, background: G, margin: "0 auto", transformOrigin: "left" }}
            />
            <p style={{ fontSize: 15, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", maxWidth: 520, margin: "20px auto 0", lineHeight: 1.7 }}>
              Every tracksuit we produce is built from the ground up to your specification. From colourway to stitching — nothing is off the shelf.
            </p>
          </div>
        </Reveal>

        {/* Capabilities grid */}
        <div className="cust-cap-grid" style={{ display: "grid", gap: 24 }}>
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.1}>
              <CapabilityCard cap={cap} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 64 }}>
            <motion.a
              href="/customize"
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(200,16,46,0.25)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 40px", background: G, color: "#0D0D0D",
                fontSize: 14, fontWeight: 700, fontFamily: "var(--font-dm-sans)",
                letterSpacing: "0.04em", textDecoration: "none", cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Open Our Customiser
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Capability Card ── */
function CapabilityCard({ cap, index }: { cap: typeof capabilities[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        borderColor: hov ? "rgba(200,16,46,0.3)" : "rgba(255,255,255,0.04)",
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.04)",
        background: "#111111",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <motion.div
          animate={{ scale: hov ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={cap.image}
            alt={cap.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #111111 0%, rgba(17,17,17,0.3) 50%, transparent 100%)" }} />
        {/* Tag */}
        <span style={{
          position: "absolute", top: 16, left: 16,
          fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em",
          color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600,
          padding: "4px 10px", background: "rgba(200,16,46,0.08)", border: "1px solid rgba(200,16,46,0.2)",
        }}>
          {cap.tag}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 24px 28px" }}>
        <h3 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 800, fontSize: 22, color: "#F5F0E8", margin: "0 0 8px" }}>
          {cap.title}
        </h3>
        <p style={{ fontSize: 13, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", lineHeight: 1.65, margin: 0 }}>
          {cap.desc}
        </p>
      </div>

      {/* Hover accent bar */}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: G, transformOrigin: "left" }}
      />
    </motion.div>
  );
}

/* Need useState for hover */

