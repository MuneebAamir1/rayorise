"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";

export default function BrandFactory() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Gold line */
      const goldLine = sectionRef.current!.querySelector<HTMLElement>("[data-gold-line]");
      if (goldLine) {
        gsap.fromTo(goldLine, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      /* Heading */
      const headEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-bf-head]");
      gsap.fromTo(headEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: headEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      /* Left side */
      const leftEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-left]");
      gsap.fromTo(leftEls, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: leftEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      /* Right side */
      const rightEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-right]");
      gsap.fromTo(rightEls, { x: 30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: rightEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      /* Divider shift on scroll */
      if (dividerRef.current) {
        gsap.fromTo(dividerRef.current,
          { left: "35%" },
          {
            left: "65%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        );
      }

      /* Caption */
      const caption = sectionRef.current!.querySelector<HTMLElement>("[data-caption]");
      if (caption) {
        gsap.fromTo(caption, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: caption, start: "top 90%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="brand-factory"
      style={{
        width: "100%",
        background: "#221E19",
        padding: "112px 0",
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
          background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`,
          transformOrigin: "left",
          transform: "scaleX(0)",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <p
          data-bf-head=""
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(212,255,43,0.5)",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 600,
            margin: "0 0 16px",
            opacity: 0,
          }}
        >
          03 — Brand × Factory
        </p>
        <h2
          data-bf-head=""
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.05,
            color: "#F0E8D8",
            margin: "0 0 56px",
            maxWidth: 600,
            opacity: 0,
          }}
        >
          Your creative direction.
          <br />
          Our production{" "}
          <span style={{ color: G }}>discipline.</span>
        </h2>

        {/* Split layout */}
        <style>{`
          .bf-grid { grid-template-columns: 1fr; gap: 40px; }
          @media(min-width: 768px) {
            .bf-grid { grid-template-columns: 1fr 1fr !important; gap: 0 !important; }
          }
        `}</style>

        <div
          className="bf-grid"
          style={{
            display: "grid",
            position: "relative",
            minHeight: 400,
          }}
        >
          {/* Animated divider line (desktop only) */}
          <div
            ref={dividerRef}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 1,
              background: `linear-gradient(180deg, transparent, ${G} 20%, ${G} 80%, transparent)`,
              zIndex: 10,
              display: "var(--bf-divider, none)",
            }}
          />
          <style>{`@media(min-width: 768px) { :root { --bf-divider: block; } }`}</style>

          {/* LEFT — Designer's side */}
          <div
            style={{
              padding: "32px 32px 32px 0",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <p
              data-left=""
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: G,
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 700,
                margin: 0,
                opacity: 0,
              }}
            >
              Your side
            </p>
            {[
              "Reference imagery & mood boards",
              "Pantone colours & colour blocking",
              "Fit direction — slim, regular, or oversized",
              "Logo placement & branding spec",
              "Packaging preferences",
            ].map((item, i) => (
              <div
                key={item}
                data-left=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 14,
                  color: "#8A7E70",
                  fontFamily: "var(--font-dm-sans)",
                  opacity: 0,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: G,
                    flexShrink: 0,
                    opacity: 0.6,
                  }}
                />
                {item}
              </div>
            ))}
            {/* Abstract visual placeholder */}
            <div
              data-left=""
              style={{
                position: "relative",
                height: 180,
                overflow: "hidden",
                marginTop: 8,
                opacity: 0,
              }}
            >
              <Image
                src="/images/fabric-texture.png"
                alt="Fabric reference texture"
                fill
                style={{ objectFit: "cover", filter: "saturate(0.5) brightness(0.7)" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, rgba(34,30,25,0.8), transparent 50%, rgba(34,30,25,0.8))",
                }}
              />
              {/* Blueprint overlay */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 400 180" fill="none">
                <rect x="20" y="20" width="120" height="140" stroke="rgba(201,145,58,0.15)" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="200" y1="40" x2="380" y2="40" stroke="rgba(201,145,58,0.1)" strokeWidth="0.5" />
                <line x1="200" y1="90" x2="350" y2="90" stroke="rgba(201,145,58,0.1)" strokeWidth="0.5" />
                <line x1="200" y1="140" x2="320" y2="140" stroke="rgba(201,145,58,0.1)" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          {/* RIGHT — Factory side */}
          <div
            style={{
              padding: "32px 0 32px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <p
              data-right=""
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: G,
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 700,
                margin: 0,
                opacity: 0,
              }}
            >
              Our side
            </p>
            {[
              "Production-ready tech pack",
              "Fabric sourcing & swatch matching",
              "Sample development & grading",
              "Quality control & testing",
              "Packaging, labelling & tracked dispatch",
            ].map((item, i) => (
              <div
                key={item}
                data-right=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 14,
                  color: "#8A7E70",
                  fontFamily: "var(--font-dm-sans)",
                  opacity: 0,
                }}
              >
                <svg style={{ width: 16, height: 16, flexShrink: 0 }} viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="rgba(201,145,58,0.3)" strokeWidth="1" />
                  <path d="M6 10l2.5 2.5L14 8" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
            {/* Factory visual */}
            <div
              data-right=""
              style={{
                position: "relative",
                height: 180,
                overflow: "hidden",
                marginTop: 8,
                opacity: 0,
              }}
            >
              <Image
                src="/images/sewing-machine.png"
                alt="Production sewing machine"
                fill
                style={{ objectFit: "cover", filter: "saturate(0.6) brightness(0.6)" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(34,30,25,0.9), transparent 60%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Caption */}
        <div
          data-caption=""
          style={{
            textAlign: "center",
            marginTop: 48,
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
              margin: 0,
            }}
          >
            From design intent{" "}
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: G }}
            >
              →
            </motion.span>{" "}
            production-ready spec
          </p>
        </div>
      </div>
    </section>
  );
}
