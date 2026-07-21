"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Collage images ── */
const collageImages = [
  { src: "/images/custom-colors.png", alt: "Custom colour panels", label: "Colours" },
  { src: "/images/custom-embroidery.png", alt: "Custom embroidery detail", label: "Branding" },
  { src: "/images/custom-patterns.png", alt: "Pattern engineering", label: "Design" },
  { src: "/images/custom-labelling.png", alt: "Custom labels & packaging", label: "Finishing" },
];

/* ── Customisation categories (CMS-ready) ── */
const categories = [
  {
    title: "Panels",
    body: "Custom panel layouts, contrast panels, side panels, shoulder panels, and sleeve construction — all built to your design.",
    benefit: "Create a unique garment design that reflects your brand identity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 4v16M15 4v16M4 9h16M4 15h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Branding",
    body: "Embroidery, screen printing, heat transfer, silicone badges, rubber patches, and woven patches — with fully customisable placement.",
    benefit: "Branding placement is fully customisable to your design.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Labels",
    body: "Neck labels, size labels, care labels, composition labels, and country of origin labels — all custom-branded for your label.",
    benefit: "Labels are an important part of professional brand development.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Trims",
    body: "Drawcords, cord ends, eyelets, toggles, and elastic details — functional trims that improve both usability and brand identity.",
    benefit: "Trims improve both functionality and brand identity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M4 20h16M4 4h16" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Hardware",
    body: "Nylon zippers, coil zippers, metal pullers, custom pull tabs, and matching colours — hardware selection affects both appearance and performance.",
    benefit: "Hardware selection affects both appearance and performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8v8M16 8v8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Packaging",
    body: "Poly bags, custom stickers, barcode labels, carton labels, shipping marks, and retail-ready packaging options.",
    benefit: "Products are prepared for retail or wholesale distribution.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22V12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export default function CustomizationCapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;
    gsap.fromTo(barRef.current, { scaleX: 0 }, {
      scaleX: 1, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: barRef.current, start: "top 85%", once: true },
    });
  }, { scope: sectionRef });

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll("[data-cat-card]");
    gsap.fromTo(cards, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out",
      scrollTrigger: { trigger: cards[0]?.parentElement, start: "top 80%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="customization" style={{ background: "#1A1612", overflow: "hidden" }}>
      <style>{`
        .cust-main-grid { grid-template-columns: 1fr; gap: 40px; }
        @media(min-width: 1024px) {
          .cust-main-grid { grid-template-columns: 1fr 1.2fr !important; gap: 48px !important; }
        }
        .cat-grid { grid-template-columns: 1fr; gap: 16px; }
        @media(min-width: 640px) { .cat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media(min-width: 1024px) { .cat-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>

      {/* ═══ HERO TOP ═══ */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1320, margin: "0 auto", padding: "80px 28px 40px" }}>

        <div className="cust-main-grid" style={{ display: "grid", alignItems: "center" }}>

          {/* ── LEFT: Copy ── */}
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600, margin: 0 }}>
                CUSTOMISATION CAPABILITIES
              </p>
              <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.05, color: "#F0E8D8", margin: 0 }}>
                Complete Private-Label<br />
                <span style={{ color: G }}>Product Development.</span>
              </h2>
              <div ref={barRef} style={{ width: 56, height: 3, background: G, transformOrigin: "left" }} />

              {/* Intro + CTA */}
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 24, width: "100%", marginTop: 8 }}>
                <p style={{ fontSize: 14, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", lineHeight: 1.7, maxWidth: 420, margin: 0 }}>
                  Every product is made to order and can be customised across garment construction, branding, labels, packaging, and trims — so your product matches your brand exactly. We're your development partner, not just a manufacturer.
                </p>
                <motion.a
                  href="/customize"
                  whileHover={{ scale: 1.04, boxShadow: "0 6px 24px rgba(201,145,58,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: G, color: "#1A1612", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-dm-sans)", letterSpacing: "0.04em", textDecoration: "none", cursor: "pointer", width: "fit-content", flexShrink: 0 }}
                >
                  Open Customiser
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT: Creative Collage ── */}
          <Reveal delay={0.15}>
            <MosaicCollage />
          </Reveal>
        </div>
      </div>

      {/* ═══ CATEGORIES GRID ═══ */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 28px 64px" }}>
        <div className="cat-grid" style={{ display: "grid" }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>

        {/* Information strip */}
        <Reveal delay={0.2}>
          <div
            style={{
              marginTop: 32,
              padding: "20px 24px",
              border: "1px solid rgba(201,145,58,0.12)",
              background: "rgba(201,145,58,0.03)",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 13, color: "#C8BFA8", fontFamily: "var(--font-dm-sans)", margin: 0, lineHeight: 1.7 }}>
              Every element can be combined to create a fully customised private-label product tailored to your brand.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════ CATEGORY CARD ═══════ */
function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      data-cat-card=""
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#221E19",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: `2px solid ${G}`,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
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

      {/* Icon + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <motion.span
          animate={{ color: hov ? G : "#8A7E70" }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", alignItems: "center", color: "#8A7E70", flexShrink: 0 }}
        >
          {cat.icon}
        </motion.span>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
          {cat.title}
        </h3>
      </div>

      {/* Description */}
      <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
        {cat.body}
      </p>

      {/* Buyer benefit */}
      <div style={{ marginTop: "auto", paddingTop: 8 }}>
        <span style={{ fontSize: 11, color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontStyle: "italic" }}>
          {cat.benefit}
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════ MOSAIC COLLAGE ═══════ */
function MosaicCollage() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1.05" }}>
      {/* Decorative frame accent */}
      <div style={{ position: "absolute", top: -6, left: -6, width: "55%", height: "55%", border: "1px solid rgba(201,145,58,0.15)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -6, right: -6, width: "55%", height: "55%", border: "1px solid rgba(201,145,58,0.1)", pointerEvents: "none", zIndex: 0 }} />

      {/* Image 1 — large, top-left */}
      <CollageCell
        src={collageImages[0].src}
        alt={collageImages[0].alt}
        label={collageImages[0].label}
        style={{ position: "absolute", top: "0%", left: "0%", width: "58%", height: "52%" }}
        rotate={-1.5}
        delay={0}
      />
      {/* Image 2 — tall, top-right */}
      <CollageCell
        src={collageImages[1].src}
        alt={collageImages[1].alt}
        label={collageImages[1].label}
        style={{ position: "absolute", top: "3%", right: "0%", width: "38%", height: "48%" }}
        rotate={2}
        delay={0.08}
      />
      {/* Image 3 — wide, bottom-left */}
      <CollageCell
        src={collageImages[2].src}
        alt={collageImages[2].alt}
        label={collageImages[2].label}
        style={{ position: "absolute", bottom: "0%", left: "0%", width: "42%", height: "44%" }}
        rotate={1}
        delay={0.16}
      />
      {/* Image 4 — large, bottom-right, overlapping */}
      <CollageCell
        src={collageImages[3].src}
        alt={collageImages[3].alt}
        label={collageImages[3].label}
        style={{ position: "absolute", bottom: "2%", right: "0%", width: "54%", height: "46%" }}
        rotate={-1}
        delay={0.24}
      />

      {/* Center accent dot */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 36, height: 36, borderRadius: "50%", border: `2px solid ${G}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#1A1612", zIndex: 20, boxShadow: "0 0 20px rgba(201,145,58,0.15)",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: G }} />
      </div>
    </div>
  );
}

/* ═══════ COLLAGE CELL ═══════ */
function CollageCell({ src, alt, label, style, rotate, delay }: {
  src: string; alt: string; label: string;
  style: React.CSSProperties; rotate: number; delay: number;
}) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, rotate: rotate * 2 }}
      animate={inView ? { opacity: 1, scale: 1, rotate } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...style, overflow: "hidden", zIndex: hov ? 15 : 10, cursor: "pointer" }}
    >
      <motion.div
        animate={{
          scale: hov ? 1.08 : 1,
          rotate: hov ? 0 : 0,
          boxShadow: hov ? "0 16px 48px rgba(0,0,0,0.5)" : "0 4px 16px rgba(0,0,0,0.2)",
        }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{ width: "100%", height: "100%", position: "relative", border: hov ? `1px solid rgba(201,145,58,0.3)` : "1px solid rgba(255,255,255,0.06)" }}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,22,18,0.85) 0%, transparent 60%)" }} />
        {/* Label */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0.7, y: hov ? 0 : 4 }}
          transition={{ duration: 0.25 }}
          style={{ position: "absolute", bottom: 10, left: 12, zIndex: 5 }}
        >
          <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.16em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 700 }}>
            {label}
          </span>
        </motion.div>
        {/* Hover accent */}
        <motion.div
          animate={{ scaleX: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: G, transformOrigin: "left", zIndex: 5 }}
        />
      </motion.div>
    </motion.div>
  );
}