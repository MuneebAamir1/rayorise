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

/* ── Feature annotations ── */
const annotations = [
  { label: "Custom Panels", desc: "Unique panel layouts built to your design." },
  { label: "Custom Colours", desc: "Unlimited Pantone-matched colourways." },
  { label: "Branding Options", desc: "Embroidery, printing, labels & patches." },
  { label: "Perfect Fit", desc: "Tailored to your exact measurements." },
];

/* ── Bottom pills ── */
const pills = [
  { icon: "✦", title: "Complete Design Freedom", desc: "Your ideas, our expertise." },
  { icon: "◆", title: "Premium Materials", desc: "Quality you can feel." },
  { icon: "★", title: "Brand-Focused", desc: "Manufactured for impact." },
  { icon: "●", title: "Reliable Production", desc: "On-time, every time." },
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
    const els = sectionRef.current.querySelectorAll(".anno-item");
    gsap.fromTo(els, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: els[0]?.parentElement, start: "top 65%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="customization" style={{ background: "#1A1612", overflow: "hidden" }}>
      <style>{`
        .cust-main-grid { grid-template-columns: 1fr; gap: 40px; }
        .cust-annos-col { display: none; }
        .cust-pills-grid { grid-template-columns: 1fr 1fr; }
        @media(min-width: 768px) {
          .cust-pills-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media(min-width: 1024px) {
          .cust-main-grid { grid-template-columns: 1fr 1.2fr 0.65fr !important; gap: 32px !important; }
          .cust-annos-col { display: flex !important; }
        }
      `}</style>

      {/* ═══ HERO 100vh ═══ */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1320, margin: "0 auto", padding: "80px 28px 40px" }}>

        <div className="cust-main-grid" style={{ display: "grid", alignItems: "center" }}>

          {/* ── LEFT: Copy ── */}
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600, margin: 0 }}>
                Customisation Capabilities
              </p>
              <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.05, color: "#F0E8D8", margin: 0 }}>
                Fully Custom.<br />
                <span style={{ color: G }}>Built for Your Brand.</span>
              </h2>
              <div ref={barRef} style={{ width: 56, height: 3, background: G, transformOrigin: "left" }} />
              
              {/* Responsive side-by-side flex wrapper */}
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 24, width: "100%", marginTop: 8 }}>
                <p style={{ fontSize: 14, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
                  From fabrics and colours to fit and branding — every detail is customised to match your brand identity and market.
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

          {/* ── CENTER: Creative Collage ── */}
          <Reveal delay={0.15}>
            <MosaicCollage />
          </Reveal>

          {/* ── RIGHT: Annotations (desktop) ── */}
          <div className="cust-annos-col" style={{ flexDirection: "column", justifyContent: "center", gap: 28, paddingLeft: 8 }}>
            {annotations.map((a, i) => (
              <AnnotationItem key={a.label} label={a.label} desc={a.desc} index={i} />
            ))}
          </div>
        </div>

        {/* ── PILLS ── */}
        <Reveal delay={0.3}>
          <div className="cust-pills-grid" style={{ display: "grid", gap: 12, marginTop: 40, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 28 }}>
            {pills.map((p) => (
              <PillItem key={p.title} pill={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
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

/* ═══════ ANNOTATION ITEM ═══════ */
function AnnotationItem({ label, desc, index }: { label: string; desc: string; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      className="anno-item"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ opacity: 0 }}
    >
      <motion.div
        animate={{ x: hov ? 4 : 0, borderColor: hov ? "rgba(201,145,58,0.3)" : "rgba(255,255,255,0.04)" }}
        transition={{ duration: 0.25 }}
        style={{ borderLeft: "2px solid rgba(255,255,255,0.04)", paddingLeft: 14 }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: "0 0 3px" }}>{label}</p>
        <p style={{ fontSize: 11, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0, lineHeight: 1.5 }}>{desc}</p>
      </motion.div>
    </motion.div>
  );
}

/* ═══════ PILL ITEM ═══════ */
function PillItem({ pill }: { pill: typeof pills[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{ borderColor: hov ? "rgba(201,145,58,0.25)" : "rgba(255,255,255,0.04)" }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.04)", background: hov ? "rgba(201,145,58,0.03)" : "transparent", transition: "background 0.25s", cursor: "default" }}
    >
      <span style={{ fontSize: 14, color: G, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{pill.icon}</span>
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: "0 0 2px" }}>{pill.title}</p>
        <p style={{ fontSize: 11, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{pill.desc}</p>
      </div>
    </motion.div>
  );
}
