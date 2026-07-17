"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";

const genericItems = [
  "Hoodies",
  "T-Shirts",
  "Jerseys",
  "Sweatshirts",
  "Polos",
  "Vests",
];

const ourItems = [
  { name: "Tracksuit Sets", desc: "Full two-piece custom sets" },
  { name: "Track Jackets", desc: "Retro-panel standalone jackets" },
  { name: "Track Pants", desc: "Custom waistband & panel bottoms" },
];

export default function AntiGeneralist() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Section label + headline reveal */
      const headEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-head]");
      gsap.fromTo(headEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });

      /* Manifesto copy */
      const manifestoLines = sectionRef.current!.querySelectorAll<HTMLElement>("[data-manifesto]");
      gsap.fromTo(manifestoLines, { clipPath: "inset(0 100% 0 0)", opacity: 0 }, {
        clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: manifestoLines[0], start: "top 85%", toggleActions: "play none none none" },
      });

      /* Generic items — fade to low contrast */
      const genericEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-generic]");
      gsap.fromTo(genericEls, { opacity: 0, x: 20 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: genericEls[0], start: "top 85%", toggleActions: "play none none none" },
      });
      /* Then fade them to low contrast */
      gsap.to(genericEls, {
        opacity: 0.15, duration: 0.6, stagger: 0.04, ease: "power2.in",
        scrollTrigger: { trigger: genericEls[0], start: "top 60%", toggleActions: "play none none none" },
      });

      /* Our items — reveal brightly */
      const ourEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-ours]");
      gsap.fromTo(ourEls, { opacity: 0, y: 20, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ourEls[0], start: "top 80%", toggleActions: "play none none none" },
      });

      /* Gold line */
      const goldLine = sectionRef.current!.querySelector<HTMLElement>("[data-gold-line]");
      if (goldLine) {
        gsap.fromTo(goldLine, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="anti-generalist"
      style={{
        width: "100%",
        background: "#221E19",
        padding: "112px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold top line */}
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

      <style>{`
        .anti-grid { grid-template-columns: 1fr; gap: 48px; }
        @media(min-width: 768px) {
          .anti-grid { grid-template-columns: 1fr 1fr !important; gap: 64px !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* Section label */}
        <p
          data-head=""
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(212,255,43,0.6)",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 600,
            margin: "0 0 16px",
            opacity: 0,
          }}
        >
          01 — The RayoRise Method
        </p>

        {/* Headline */}
        <h2
          data-head=""
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 60px)",
            lineHeight: 1.05,
            color: "#F0E8D8",
            margin: "0 0 56px",
            maxWidth: 700,
            opacity: 0,
          }}
        >
          Specialism isn&apos;t a smaller offer.
          <br />
          It&apos;s a{" "}
          <span style={{ color: G }}>sharper standard.</span>
        </h2>

        <div className="anti-grid" style={{ display: "grid" }}>
          {/* Left — Manifesto copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              "RayoRise does not make hoodies, tees, jerseys, or random",
              "catalogue items. We focus exclusively on tracksuit",
              "construction — sets, jackets, and pants — because that",
              "depth of focus is how you get silhouettes that actually",
              "work, panels that balance properly, and production that",
              "delivers on time, every time.",
            ].map((line, i) => (
              <span
                key={i}
                data-manifesto=""
                style={{
                  display: "block",
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#8A7E70",
                  fontFamily: "var(--font-dm-sans)",
                  opacity: 0,
                  clipPath: "inset(0 100% 0 0)",
                }}
              >
                {line}
              </span>
            ))}
          </div>

          {/* Right — NOT/OUR matrix */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* NOT OUR LINE */}
            <div>
              <p
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(232,77,48,0.7)",
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 700,
                  margin: "0 0 12px",
                }}
              >
                ✕ Not our line
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                }}
              >
                {genericItems.map((item) => (
                  <div
                    key={item}
                    data-generic=""
                    style={{
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      fontSize: 12,
                      color: "#6A5F54",
                      fontFamily: "var(--font-dm-sans)",
                      textAlign: "center",
                      textDecoration: "line-through",
                      textDecorationColor: "rgba(232,77,48,0.4)",
                      opacity: 0,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* OUR LINE */}
            <div>
              <p
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: G,
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 700,
                  margin: "0 0 12px",
                }}
              >
                ✦ Our line
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {ourItems.map((item) => (
                  <div
                    key={item.name}
                    data-ours=""
                    style={{
                      padding: "16px 20px",
                      background: "#2A2520",
                      border: `1px solid rgba(201,145,58,0.15)`,
                      borderLeft: `3px solid ${G}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      opacity: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#F0E8D8",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#8A7E70",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
