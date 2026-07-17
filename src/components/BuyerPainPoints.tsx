"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";

const painPoints = [
  {
    problem: "Manufacturers miss deadlines",
    consequence: "Delayed drops, lost revenue, and broken promises to stockists.",
    solution: "Defined 3–5 week production window",
    detail: "We lock a confirmed production schedule before work begins. Every order ships with tracked dispatch so you always know where your goods are.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(232,77,48,0.8)" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
    solutionIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    problem: "Quality differs from sample",
    consequence: "Bulk production arrives looking nothing like the approved prototype.",
    solution: "Physical sample approval before any bulk",
    detail: "You hold a production-accurate sample in your hands before a single unit enters the production line. No exceptions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(232,77,48,0.8)" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    solutionIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    problem: "Poor communication",
    consequence: "Weeks without updates. Emails go unanswered. No visibility on production status.",
    solution: "Dedicated account manager + WhatsApp",
    detail: "One point of contact who knows your project inside out. Responsive WhatsApp support and proactive production updates at every stage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(232,77,48,0.8)" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <line x1="9" y1="10" x2="15" y2="10" strokeDasharray="2 2" />
      </svg>
    ),
    solutionIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 10l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    problem: "High MOQ barriers",
    consequence: "Forced to order 500+ units before validating the market. Too much risk for emerging brands.",
    solution: "Starting from just 50 units per colourway",
    detail: "Test your market with 50 units. Scale when the demand is proven. No pressure to over-commit on your first production run.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(232,77,48,0.8)" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <rect x="1" y="6" width="22" height="12" rx="2" />
        <path d="M1 10h22" />
      </svg>
    ),
    solutionIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
];

export default function BuyerPainPoints() {
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

      const headEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-bp-head]");
      gsap.fromTo(headEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: headEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      const rows = sectionRef.current!.querySelectorAll<HTMLElement>("[data-bp-row]");
      gsap.fromTo(rows, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: rows[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="pain-points"
      style={{
        width: "100%",
        background: "#1A1612",
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

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <p
          data-bp-head=""
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: G,
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 600,
            margin: "0 0 16px",
            opacity: 0,
          }}
        >
          Common Industry Problems
        </p>
        <h2
          data-bp-head=""
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.05,
            color: "#F0E8D8",
            margin: "0 0 16px",
            maxWidth: 700,
            opacity: 0,
          }}
        >
          The problems every brand{" "}
          <span style={{ color: G }}>runs into.</span>
        </h2>
        <p
          data-bp-head=""
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
            maxWidth: 560,
            margin: "0 0 56px",
            opacity: 0,
          }}
        >
          We built RayoRise to solve the exact issues that cost brands time,
          money, and trust. Here&apos;s what we hear from every new client — and
          how we respond.
        </p>

        {/* Pain point rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {painPoints.map((pp, i) => (
            <div
              key={pp.problem}
              data-bp-row=""
              style={{
                opacity: 0,
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <style>{`
                .bp-row-inner { grid-template-columns: 1fr; gap: 24px; }
                @media(min-width: 768px) {
                  .bp-row-inner { grid-template-columns: 1fr 1fr !important; gap: 48px !important; }
                }
              `}</style>
              <div
                className="bp-row-inner"
                style={{
                  display: "grid",
                  padding: "32px 0",
                  alignItems: "start",
                }}
              >
                {/* Problem side */}
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(232,77,48,0.06)",
                      border: "1px solid rgba(232,77,48,0.12)",
                    }}
                  >
                    {pp.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#F0E8D8",
                        margin: "0 0 4px",
                      }}
                    >
                      {pp.problem}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: "#6A5F54",
                        fontFamily: "var(--font-dm-sans)",
                        margin: 0,
                      }}
                    >
                      {pp.consequence}
                    </p>
                  </div>
                </div>

                {/* Solution side */}
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(201,145,58,0.06)",
                      border: `1px solid rgba(201,145,58,0.15)`,
                    }}
                  >
                    {pp.solutionIcon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: G,
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 700,
                        margin: "0 0 4px",
                      }}
                    >
                      RayoRise solution
                    </p>
                    <h4
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#F0E8D8",
                        margin: "0 0 4px",
                      }}
                    >
                      {pp.solution}
                    </h4>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: "#8A7E70",
                        fontFamily: "var(--font-dm-sans)",
                        margin: 0,
                      }}
                    >
                      {pp.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
