"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";
import HeroFallback from "./HeroFallback";

const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const callouts = [
  { text: "7-PANEL CONSTRUCTION", x: "8%", y: "20%" },
  { text: "280GSM OPTIONS", x: "75%", y: "15%" },
  { text: "PANTONE MATCHED", x: "5%", y: "72%" },
  { text: "FULL BRANDING", x: "70%", y: "78%" },
];

function useIsDesktop(bp = 1024) {
  const [desk, setDesk] = useState(false);
  useEffect(() => {
    const check = () => setDesk(window.innerWidth >= bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return desk;
}

/* ─── CTA Button ─── */
function HeroCTA({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: primary
          ? hov ? GL : G
          : hov ? "rgba(201,145,58,0.1)" : "transparent",
        borderColor: primary
          ? hov ? GL : G
          : hov ? G : "rgba(201,145,58,0.5)",
        scale: hov ? 1.03 : 1,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.22, ease: EASE }}
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
      <motion.span
        animate={{ x: hov ? "350%" : "-100%" }}
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

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Headline line masks — reveal each line sequentially */
      const lines = headlineRef.current?.querySelectorAll<HTMLElement>("[data-line]");
      if (lines) {
        gsap.fromTo(
          lines,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }

      /* Supporting copy + CTAs */
      const contentEls = contentRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
      if (contentEls) {
        gsap.fromTo(
          contentEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.9,
          }
        );
      }

      /* Technical callouts */
      const calloutEls = calloutsRef.current?.querySelectorAll<HTMLElement>("[data-callout]");
      if (calloutEls) {
        gsap.fromTo(
          calloutEls,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: "back.out(1.5)",
            delay: 1.4,
          }
        );
      }

      /* Scroll-driven parallax exit */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      if (contentRef.current) {
        tl.to(contentRef.current, { opacity: 0, y: -40, duration: 1 }, 0);
      }
      if (scrollCueRef.current) {
        tl.to(scrollCueRef.current, { opacity: 0, duration: 0.3 }, 0);
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about-hero"
      className="stripe-texture"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#1A1612",
        paddingTop: 100,
      }}
    >
      {/* 3D or fallback visual */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        {isDesktop ? <HeroScene3D /> : <HeroFallback />}
      </div>

      {/* Technical callouts */}
      <div
        ref={calloutsRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          display: isDesktop ? "block" : "none",
        }}
      >
        {callouts.map((c) => (
          <span
            key={c.text}
            data-callout=""
            style={{
              position: "absolute",
              left: c.x,
              top: c.y,
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,255,43,0.45)",
              fontFamily: "var(--font-dm-sans)",
              padding: "4px 10px",
              border: "1px solid rgba(212,255,43,0.1)",
              background: "rgba(26,22,18,0.7)",
              opacity: 0,
              whiteSpace: "nowrap",
            }}
          >
            {c.text}
          </span>
        ))}
      </div>

      {/* Content overlay */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          width: "100%",
        }}
      >
        {/* Headline */}
        <div ref={headlineRef}>
          <h1
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 800,
              fontSize: "clamp(48px, 8vw, 112px)",
              lineHeight: 0.92,
              color: "#F0E8D8",
              margin: 0,
            }}
          >
            <span data-line="" style={{ display: "block", opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
              We make one thing.
            </span>
            <span data-line="" style={{ display: "block", opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
              We make it{" "}
              <span style={{ color: G }}>well.</span>
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <div
          style={{
            marginTop: 32,
            maxWidth: 560,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <p
            data-reveal=""
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
              margin: 0,
              opacity: 0,
            }}
          >
            RayoRise is a specialist tracksuit manufacturer for UK streetwear
            brands and football-culture labels. No distractions. No general
            catalogue. Just tracksuits built to your exact brief.
          </p>

          {/* CTAs */}
          <div
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              opacity: 0,
            }}
          >
            <HeroCTA href="/contact" label="Request a Sample" primary />
            <HeroCTA href="#anti-generalist" label="See What We Make" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            position: "relative",
            width: 1,
            height: 48,
            background: "rgba(201,145,58,0.2)",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 16,
              background: G,
            }}
          />
        </div>
      </div>

      {/* Fine technical rules */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`,
        }}
      />
    </section>
  );
}
