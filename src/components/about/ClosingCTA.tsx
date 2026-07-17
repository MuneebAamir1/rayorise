"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const checklist = [
  "A rough idea or clear design direction",
  "Reference images or mood board",
  "Logo or branding direction",
  "Estimated quantity (MOQ from 50)",
];

const reassurance = [
  "MOQ from 50 units",
  "Sample in 7–10 working days",
  "Production in 3–5 weeks",
];

/* WhatsApp icon */
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ─── Primary CTA ─── */
function PrimaryCTA() {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="/contact"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: hov ? GL : G,
        scale: hov ? 1.03 : 1,
        boxShadow: hov
          ? `0 8px 32px rgba(201,145,58,0.3)`
          : `0 4px 16px rgba(201,145,58,0.15)`,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px 48px",
        textDecoration: "none",
        cursor: "pointer",
        color: "#1A1612",
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: "0.04em",
        fontFamily: "var(--font-dm-sans)",
        position: "relative",
        overflow: "hidden",
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
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          transform: "skewX(-20deg)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>Request a Sample</span>
    </motion.a>
  );
}

/* ─── WhatsApp CTA ─── */
function WhatsAppCTA() {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="https://wa.me/447700000000"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: hov ? "#20BD5A" : "#25D366",
        scale: hov ? 1.03 : 1,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 32px",
        textDecoration: "none",
        cursor: "pointer",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "var(--font-dm-sans)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <WaIcon />
      <span style={{ position: "relative", zIndex: 1 }}>
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const goldLine = sectionRef.current!.querySelector<HTMLElement>("[data-gold-line]");
      if (goldLine) {
        gsap.fromTo(goldLine, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      const revealEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-closing]");
      gsap.fromTo(revealEls, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: revealEls[0], start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="closing-cta"
      style={{
        width: "100%",
        background: "#1A1612",
        padding: "128px 0 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        data-gold-line=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${G} 30%, ${G} 70%, transparent)`,
          transformOrigin: "left",
          transform: "scaleX(0)",
        }}
      />

      {/* Converging panel lines background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <svg
          style={{ width: "100%", height: "100%", opacity: 0.04 }}
          viewBox="0 0 1200 600"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Converging construction lines */}
          <line x1="0" y1="0" x2="600" y2="300" stroke={G} strokeWidth="0.5" />
          <line x1="1200" y1="0" x2="600" y2="300" stroke={G} strokeWidth="0.5" />
          <line x1="0" y1="600" x2="600" y2="300" stroke={G} strokeWidth="0.5" />
          <line x1="1200" y1="600" x2="600" y2="300" stroke={G} strokeWidth="0.5" />
          <line x1="0" y1="300" x2="1200" y2="300" stroke={G} strokeWidth="0.3" />
          <line x1="600" y1="0" x2="600" y2="600" stroke={G} strokeWidth="0.3" />
          {/* Monogram hint */}
          <text
            x="600"
            y="310"
            fill={G}
            fontSize="48"
            textAnchor="middle"
            fontFamily="var(--font-barlow-condensed)"
            fontWeight="800"
            opacity="0.15"
          >
            RR
          </text>
        </svg>
      </div>

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Headline */}
        <h2
          data-closing=""
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 1.05,
            color: "#F0E8D8",
            margin: "0 0 24px",
            opacity: 0,
          }}
        >
          Bring us the reference.
          <br />
          We&apos;ll build the{" "}
          <span style={{ color: G }}>tracksuit.</span>
        </h2>

        {/* Checklist */}
        <div
          data-closing=""
          style={{
            margin: "0 auto 40px",
            maxWidth: 480,
            opacity: 0,
          }}
        >
          <p
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#6A5F54",
              fontFamily: "var(--font-dm-sans)",
              margin: "0 0 16px",
            }}
          >
            You&apos;re ready if you have:
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              textAlign: "left",
            }}
          >
            {checklist.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 14,
                  color: "#8A7E70",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                <svg
                  style={{ width: 16, height: 16, flexShrink: 0 }}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="rgba(201,145,58,0.3)"
                    strokeWidth="1"
                  />
                  <path
                    d="M6 10l2.5 2.5L14 8"
                    stroke={G}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div
          data-closing=""
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            marginBottom: 40,
            opacity: 0,
          }}
        >
          <PrimaryCTA />
          <WhatsAppCTA />
        </div>

        {/* Reassurance strip */}
        <div
          data-closing=""
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 0,
            opacity: 0,
          }}
        >
          {reassurance.map((item, i) => (
            <span
              key={item}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: 12,
                color: "#6A5F54",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              {i > 0 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: G,
                    margin: "0 14px",
                    opacity: 0.4,
                  }}
                />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
