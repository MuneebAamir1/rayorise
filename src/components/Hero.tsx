"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const G = "#C9913A";
const GL = "#DBAA55";

/* stagger container + child variants */
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mob = window.innerWidth < 768;
    if (pref || mob || !sectionRef.current || !imageRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    tl.to(textRef.current, { opacity: 0, y: -30, duration: 1 }, 0)
      .to(imageRef.current, { y: 80, scale: 0.9, opacity: 0, duration: 1 }, 0)
      .to(scrollRef.current, { opacity: 0, duration: 0.3 }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === sectionRef.current) st.kill();
      });
    };
  }, { scope: sectionRef });

  /* Headline split into lines for better visual hierarchy */
  const lines = [
    { words: ["Custom", "90s"], accent: [false, true] },
    { words: ["Football"], accent: [false] },
    { words: ["Tracksuits", "for", "UK"], accent: [false, false, true] },
    { words: ["Streetwear"], accent: [false] },
    { words: ["Brands"], accent: [false] },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="stripe-texture"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#1A1612",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "20%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,145,58,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid container */}
      <style>{`@media(min-width:1024px){.hero-grid{grid-template-columns:1.1fr 0.9fr!important;gap:64px!important}}`}</style>
      <div
        className="hero-grid"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 40px 64px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* ── LEFT: Text ── */}
        <motion.div
          ref={textRef}
          variants={containerV}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", gap: 28, zIndex: 10 }}
        >
          {/* Pre-headline badge */}
          <motion.div variants={fadeUp}>
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: G,
                fontFamily: "var(--font-dm-sans)",
                padding: "6px 16px",
                border: `1px solid rgba(201,145,58,0.25)`,
                background: "rgba(201,145,58,0.05)",
              }}
            >
              UK B2B Tracksuit Manufacturer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 900,
              lineHeight: 0.92,
              color: "#F0E8D8",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              margin: 0,
            }}
          >
            {lines.map((line, li) => (
              <span key={li} style={{ display: "block" }}>
                {line.words.map((word, wi) => (
                  <span key={wi} style={{ marginRight: "0.18em", display: "inline-block" }}>
                    {line.accent[wi] ? (
                      <span style={{ color: G }}>{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: "#C8BFA8",
              fontFamily: "var(--font-dm-sans)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Low MOQ <span style={{ color: G, margin: "0 6px" }}>·</span> Fast Sampling <span style={{ color: G, margin: "0 6px" }}>·</span> Full Panel Customisation
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            style={{ display: "flex", flexWrap: "wrap", gap: 14, paddingTop: 4 }}
          >
            {/* Primary CTA */}
            <HeroCTA href="#contact" label="Request Sample" primary />
            {/* Secondary CTA */}
            <HeroCTA href="#flagship" label="View Tracksuit" />
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Product image ── */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1000 }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 380, margin: "0 auto" }}>
            {/* glow */}
            <div
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,145,58,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <Image
              src="/images/hero-tracksuit-1.png"
              alt="Retro panel tracksuit — 90s football style, RayoRise B2B"
              width={560}
              height={680}
              priority
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 40px 80px rgba(201,145,58,0.1))",
              }}
            />

            {/* MOQ Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
              style={{
                position: "absolute",
                top: 32,
                left: -12,
                background: "#221E19",
                border: "1px solid rgba(201,145,58,0.25)",
                padding: "10px 16px",
                zIndex: 20,
              }}
            >
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "#8A7E70", margin: 0, fontFamily: "var(--font-dm-sans)" }}>MOQ From</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: G, margin: 0, fontFamily: "var(--font-barlow-condensed)" }}>50 Units</p>
            </motion.div>

            {/* Sampling Tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.4 }}
              style={{
                position: "absolute",
                bottom: 48,
                right: -12,
                background: "#221E19",
                border: "1px solid rgba(201,145,58,0.25)",
                padding: "10px 16px",
                zIndex: 20,
              }}
            >
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "#8A7E70", margin: 0, fontFamily: "var(--font-dm-sans)" }}>Sampling In</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: G, margin: 0, fontFamily: "var(--font-barlow-condensed)" }}>7–10 Days</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>Scroll</span>
        <div style={{ position: "relative", width: 1, height: 48, background: "rgba(201,145,58,0.2)", overflow: "hidden" }}>
          <motion.div animate={{ y: [0, 48, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 16, background: G }} />
        </div>
      </div>
    </section>
  );
}

/* ─── Hero CTA Button ─── */
function HeroCTA({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        backgroundColor: primary
          ? (hovered ? GL : G)
          : (hovered ? "rgba(201,145,58,0.1)" : "transparent"),
        borderColor: primary ? (hovered ? GL : G) : (hovered ? G : "rgba(201,145,58,0.5)"),
        scale: hovered ? 1.03 : 1,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 32px",
        border: "1.5px solid",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-dm-sans)",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: primary ? "#1A1612" : G,
      }}
    >
      {/* shimmer */}
      <motion.span
        animate={{ x: hovered ? "350%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "35%",
          height: "100%",
          background: primary
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)"
            : "linear-gradient(90deg, transparent, rgba(201,145,58,0.2), transparent)",
          transform: "skewX(-20deg)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </motion.a>
  );
}

