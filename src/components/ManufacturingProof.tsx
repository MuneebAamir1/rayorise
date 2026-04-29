"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C8102E";
const EASE = [0.16, 1, 0.3, 1] as const;

const images = [
  { src: "/images/factory-floor.png", label: "Production Line", sublabel: "Fully equipped manufacturing floor" },
  { src: "/images/stitching-detail.png", label: "Overlock Stitch Finish", sublabel: "Professional-grade finish on every seam" },
  { src: "/images/fabric-inspection.png", label: "Fabric QC", sublabel: "Every roll inspected before cutting" },
  { src: "/images/packaged-tracksuits.png", label: "Packaged & Ready", sublabel: "Branded packaging included" },
];

const specs = [
  { title: "Full panel customisation", desc: "Every colour block, stripe, and panel configured to your design brief." },
  { title: "Woven & embroidered labels", desc: "Brand identity sewn in — not printed on." },
  { title: "MOQ from 50 units", desc: "No minimum risk for growing brands." },
  { title: "Overlock + chain stitch finish", desc: "Professional seam construction for durability and appearance." },
  { title: "Fabric sourcing included", desc: "We source appropriate fabric for your spec — you just approve." },
  { title: "Branded packaging", desc: "Polybag, swing tags, and inner tissue — your brand, your boxes." },
];

export default function ManufacturingProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  /* GSAP: staggered image reveal with clip-path wipe */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-img-card]");
    const specRows = sectionRef.current.querySelectorAll<HTMLElement>("[data-spec-row]");
    const heading = sectionRef.current.querySelector<HTMLElement>("[data-heading]");
    const goldLine = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");

    /* Gold top line wipe */
    if (goldLine) {
      gsap.fromTo(goldLine, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }

    /* Images: clip-path reveal + slight y shift */
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { clipPath: "inset(100% 0 0 0)", y: 40, opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)", y: 0, opacity: 1,
          duration: 0.9, ease: "power3.out", delay: i * 0.15,
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });

    /* Heading slide */
    if (heading) {
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" } }
      );
    }

    /* Spec rows: staggered slide from left */
    specRows.forEach((row, i) => {
      gsap.fromTo(row,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.6, ease: "power2.out", delay: i * 0.08,
          scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
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
      id="manufacturing"
      style={{ width: "100%", background: "#0D0D0D", padding: "96px 0", position: "relative" }}
    >
      {/* Gold top border — animated */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${G} 30%, ${G} 70%, transparent)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      <style>{`@media(min-width:768px){.mfg-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      <div className="mfg-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr", gap: 64, alignItems: "start" }}>

        {/* LEFT — Image Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {images.map((img, i) => (
            <div
              key={img.label}
              data-img-card=""
              style={{ position: "relative", overflow: "hidden", cursor: "pointer", opacity: 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{ position: "relative", overflow: "hidden" }}
              >
                <Image
                  src={img.src}
                  alt={img.sublabel}
                  width={380}
                  height={280}
                  style={{ width: "100%", height: i === 0 || i === 3 ? 240 : 220, objectFit: "cover", display: "block" }}
                />
                {/* Gradient overlay — always visible on hover */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                  className="img-overlay"
                />
                {/* Gold corner accent */}
                <span style={{ position: "absolute", top: 0, left: 0, width: 24, height: 2, background: G, opacity: 0, transition: "opacity 0.3s" }} className="img-corner-h" />
                <span style={{ position: "absolute", top: 0, left: 0, width: 2, height: 24, background: G, opacity: 0, transition: "opacity 0.3s" }} className="img-corner-v" />
              </motion.div>

              {/* Label */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 14px", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", transform: "translateY(100%)", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", pointerEvents: "none" }} className="img-label">
                <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: G, fontFamily: "var(--font-dm-sans)", margin: 0 }}>{img.label}</p>
                <p style={{ fontSize: 12, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: "2px 0 0" }}>{img.sublabel}</p>
              </div>

              <style>{`
                [data-img-card]:hover .img-overlay { opacity: 1 !important; }
                [data-img-card]:hover .img-label { transform: translateY(0) !important; }
                [data-img-card]:hover .img-corner-h, [data-img-card]:hover .img-corner-v { opacity: 1 !important; }
              `}</style>
            </div>
          ))}
        </div>

        {/* RIGHT — Spec list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div data-heading="" style={{ opacity: 0 }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", marginBottom: 16, fontWeight: 600 }}>
              What this means for your order
            </p>
            <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F5F0E8", lineHeight: 1.05, fontSize: "clamp(28px, 4vw, 44px)", margin: 0 }}>
              Built in a real factory.<br />No shortcuts.
            </h2>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {specs.map((spec, i) => (
              <div
                key={spec.title}
                data-spec-row=""
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  opacity: 0,
                  cursor: "default",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,16,46,0.03)"; e.currentTarget.style.paddingLeft = "8px"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "0"; }}
              >
                {/* Animated check icon */}
                <svg style={{ width: 20, height: 20, marginTop: 2, flexShrink: 0 }} viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="rgba(200,16,46,0.3)" strokeWidth="1" />
                  <path d="M6 10l2.5 2.5L14 8" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#F5F0E8", margin: "0 0 4px", fontFamily: "var(--font-dm-sans)" }}>{spec.title}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
