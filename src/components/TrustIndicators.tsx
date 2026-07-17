"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";

const indicators = [
  {
    title: "Export-Ready Manufacturing",
    desc: "Production compliant with international quality standards and export documentation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: "Private Label Specialist",
    desc: "Full white-label production — your brand, your labels, your packaging. No trace of ours.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sample Before Production",
    desc: "Physical sample in your hands within 7–10 working days before any bulk commitment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Dedicated Account Manager",
    desc: "One point of contact who knows your project — responsive via email, phone, or WhatsApp.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Worldwide Shipping",
    desc: "Tracked international delivery to UK, EU, USA, and beyond. DDP and EXW terms available.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function TrustIndicators() {
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

      const headEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-ti-head]");
      gsap.fromTo(headEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: headEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      const cards = sectionRef.current!.querySelectorAll<HTMLElement>("[data-ti-card]");
      gsap.fromTo(cards, { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: cards[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="trust-indicators"
      style={{
        width: "100%",
        background: "#221E19",
        padding: "96px 0",
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

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            data-ti-head=""
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: G,
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 600,
              margin: "0 0 12px",
              opacity: 0,
            }}
          >
            Why Brands Choose RayoRise
          </p>
          <h2
            data-ti-head=""
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.1,
              color: "#F0E8D8",
              margin: 0,
              opacity: 0,
            }}
          >
            Manufacturing you can{" "}
            <span style={{ color: G }}>trust.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <style>{`
          .ti-grid { grid-template-columns: repeat(2, 1fr); }
          @media(min-width: 768px) { .ti-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media(min-width: 1024px) { .ti-grid { grid-template-columns: repeat(5, 1fr) !important; } }
        `}</style>

        <div
          className="ti-grid"
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {indicators.map((ind) => (
            <div
              key={ind.title}
              data-ti-card=""
              style={{
                background: "#2A2520",
                borderTop: `2px solid rgba(201,145,58,0.3)`,
                border: "1px solid rgba(255,255,255,0.06)",
                borderTopColor: "rgba(201,145,58,0.3)",
                borderTopWidth: 2,
                padding: "28px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                opacity: 0,
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,145,58,0.2)";
                (e.currentTarget as HTMLElement).style.borderTopColor = G;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(201,145,58,0.3)";
              }}
            >
              {ind.icon}
              <h3
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#F0E8D8",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {ind.title}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "#8A7E70",
                  fontFamily: "var(--font-dm-sans)",
                  margin: 0,
                }}
              >
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
