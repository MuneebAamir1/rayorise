"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const GL = "#DBAA55";

const specs = [
  { title: "Fabric", value: "280gsm French Terry / Tricot" },
  { title: "Panel Config", value: "7-panel contrast colour-block" },
  { title: "Customisation", value: "Embroidery, woven labels, print" },
  { title: "Fit", value: "Slim / regular / oversized" },
  { title: "MOQ", value: "50 units per colourway" },
];

const details = [
  { src: "/images/stitching-detail.png", label: "Overlock Stitch" },
  { src: "/images/fabric-texture.png", label: "280gsm Fabric" },
  { src: "/images/tracksuit-back.png", label: "Back Panel" },
];

/* Animated CTA button */
function FlagshipCTA({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: hov ? GL : G,
        scale: hov ? 1.04 : 1,
        boxShadow: hov ? `0 8px 32px rgba(201,145,58,0.3)` : `0 4px 16px rgba(201,145,58,0.15)`,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.22 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 40px",
        textDecoration: "none",
        cursor: "pointer",
        color: "#1A1612",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: "0.04em",
        fontFamily: "var(--font-dm-sans)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.span
        animate={{ x: hov ? "350%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", top: 0, left: 0, width: "35%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)", transform: "skewX(-20deg)", pointerEvents: "none" }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </motion.a>
  );
}

/* ── Scroll-triggered fade-up block ── */
function RevealBlock({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function FlagshipProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  /* GSAP stagger for spec rows */
  useGSAP(() => {
    if (!specsRef.current) return;
    const rows = specsRef.current.querySelectorAll(".spec-row");
    gsap.fromTo(
      rows,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: specsRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="flagship"
      style={{ background: "#1A1612", overflow: "hidden" }}
    >
      <style>{`
        .flagship-hero-grid { grid-template-columns: 1fr; text-align: center; }
        .flagship-hero-img { max-width: 320px; margin: 0 auto; }
        .flagship-specs-grid { grid-template-columns: 1fr; }
        .flagship-details-grid { grid-template-columns: 1fr; }
        @media(min-width: 768px) {
          .flagship-hero-grid { grid-template-columns: 1fr 1fr !important; text-align: left !important; }
          .flagship-hero-img { max-width: 100% !important; margin: 0 !important; }
          .flagship-specs-grid { grid-template-columns: 1fr 1fr !important; }
          .flagship-details-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      {/* ── Section label ── */}
      <RevealBlock>
        <div style={{ textAlign: "center", paddingTop: 80, paddingBottom: 12 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)" }}>
            Flagship Product
          </p>
        </div>
      </RevealBlock>

      {/* ── BLOCK 1: Hero image + title ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 64px" }}>
        <div className="flagship-hero-grid" style={{ display: "grid", gap: 48, alignItems: "center" }}>
          {/* Image */}
          <RevealBlock>
            <div className="flagship-hero-img" style={{ position: "relative" }}>
              <Image
                src="/images/rayorise-product.png"
                alt="Retro panel tracksuit — flagship product"
                width={700}
                height={850}
                style={{ width: "100%", height: "auto", objectFit: "contain", filter: "drop-shadow(0 60px 120px rgba(201,145,58,0.10))" }}
              />
            </div>
          </RevealBlock>

          {/* Title + intro */}
          <RevealBlock delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: "clamp(36px, 5vw, 64px)", margin: 0, lineHeight: 1.05 }}>
                Retro Panel<br />Tracksuit
              </h2>
              <div style={{ width: 48, height: 3, background: G }} />
              <p style={{ fontSize: 15, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
                Our signature two-piece set engineered for streetwear brands rooted in 90s football heritage. Every panel, stitch, and colourway is yours to define.
              </p>
            </div>
          </RevealBlock>
        </div>
      </div>

      {/* ── BLOCK 2: Specs panel ── */}
      <div style={{ background: "#221E19", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
          <div className="flagship-specs-grid" style={{ display: "grid", gap: 48, alignItems: "start" }}>
            <RevealBlock>
              <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: "clamp(28px, 4vw, 48px)", margin: 0 }}>
                Built to Spec
              </h2>
              <p style={{ fontSize: 14, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", maxWidth: 400, marginTop: 12, lineHeight: 1.6 }}>
                Premium construction meets total customisation. Every specification tuned to your brand&apos;s exact requirements.
              </p>
            </RevealBlock>
            <div ref={specsRef} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {specs.map((spec) => (
                <div
                  className="spec-row"
                  key={spec.title}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    opacity: 0,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>{spec.title}</span>
                  <span style={{ fontSize: 14, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", textAlign: "right", maxWidth: "60%" }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BLOCK 3: Detail shots ── */}
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "64px 24px" }}>
        <RevealBlock>
          <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", textAlign: "center", marginBottom: 32, fontSize: "clamp(28px, 4vw, 48px)" }}>
            Every Detail, Considered
          </h2>
        </RevealBlock>
        <div className="flagship-details-grid" style={{ display: "grid", gap: 16 }}>
          {details.map((img, i) => (
            <RevealBlock key={img.label} delay={i * 0.12}>
              <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
                <Image
                  src={img.src}
                  alt={img.label}
                  width={360}
                  height={280}
                  style={{ width: "100%", height: 220, objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: 12 }}>
                  <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: G, fontFamily: "var(--font-dm-sans)" }}>{img.label}</span>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>

      {/* ── BLOCK 4: CTA ── */}
      <RevealBlock>
        <div style={{ textAlign: "center", padding: "32px 24px 96px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)" }}>
            Ready to order?
          </p>
          <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: "clamp(32px, 5vw, 64px)", margin: 0, lineHeight: 1.05 }}>
            Request a Sample<br />of This Product
          </h2>
          <p style={{ fontSize: 15, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", maxWidth: 420 }}>
            We&apos;ll have a physical sample in your hands within 7–10 days.
          </p>
          <FlagshipCTA href="#contact" label="Request Sample →" />
        </div>
      </RevealBlock>
    </section>
  );
}
