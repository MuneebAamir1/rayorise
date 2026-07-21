"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const EASE = [0.16, 1, 0.3, 1] as const;

const materials = [
  {
    name: "Nylon Taslan",
    tags: ["Premium Retro Feel", "Water Resistant", "Lightweight", "Best Seller"],
    tier: "Tier 1",
    rating: 5,
    desc: "100% Nylon · 115–140 GSM · Matte DWR finish. Our hero fabric with authentic 90s football look and wind-resistant performance.",
    color: "#F0E8D8",
    accent: G,
  },
  {
    name: "Polyester Taslan",
    tags: ["Cost Efficient", "Durable", "Teamwear", "Easy Printing"],
    tier: "Tier 2",
    rating: 5,
    desc: "100% Polyester · 110–135 GSM · Matte finish. Excellent value and durability — ideal for OEM production and export orders.",
    color: "#F0E8D8",
    accent: G,
  },
  {
    name: "Recycled Polyester Taslan",
    tags: ["Eco Friendly", "Performance", "European Brands", "GRS Options"],
    tier: "Tier 3",
    rating: 4,
    desc: "100% Recycled Polyester · 110–130 GSM · PFC-free DWR. Sustainable performance for eco-conscious collections.",
    color: "#F0E8D8",
    accent: G,
  },
  {
    name: "Supplex Nylon",
    tags: ["Premium Hand Feel", "Soft", "Luxury Collection", "High-end Brands"],
    tier: "Tier 4",
    rating: 4,
    desc: "100% Nylon · 120–145 GSM · Soft matte finish. Luxury-grade fabric for premium collections with exceptional hand feel.",
    color: "#F0E8D8",
    accent: G,
  },
  {
    name: "Micro Peach Polyester",
    tags: ["Soft Touch", "Matte Finish", "Lifestyle Collection"],
    tier: "Tier 5",
    rating: 3,
    desc: "100% Polyester · 120–150 GSM · Peach finish. Soft-touch lifestyle fabric for casual and contemporary streetwear.",
    color: "#F0E8D8",
    accent: G,
  },
];

/* RATING STARS */
function Stars({ count }: { count: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= count ? G : "none"} stroke={G} strokeWidth="1.5" style={{ opacity: s <= count ? 1 : 0.25 }}>
          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

export default function MaterialLibrary() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-mat-card]");
    const heading = sectionRef.current.querySelector<HTMLElement>("[data-mat-heading]");
    const intro = sectionRef.current.querySelector<HTMLElement>("[data-mat-intro]");

    if (lineRef.current) {
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }

    if (heading) {
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" } }
      );
    }

    if (intro) {
      gsap.fromTo(intro,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1,
          scrollTrigger: { trigger: intro, start: "top 88%", toggleActions: "play none none none" } }
      );
    }

    /* Cards stagger with clip reveal */
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.75, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger && sectionRef.current?.contains(st.vars.trigger as Element)) st.kill();
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        background: "#1A1612",
        padding: "64px 0 96px",
        position: "relative",
      }}
    >
      {/* Gold top line */}
      <div
        ref={lineRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(201,145,58,0.2) 30%, rgba(201,145,58,0.2) 70%, transparent)",
          transformOrigin: "left",
          transform: "scaleX(0)",
        }}
      />

      <style>{`
        @media(min-width:640px){.mat-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(min-width:1024px){.mat-grid{grid-template-columns:repeat(3,1fr)!important}}
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Heading */}
        <div data-mat-heading="" style={{ marginBottom: 40, opacity: 0 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600, margin: "0 0 16px" }}>
            Material Library
          </p>
          <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: "clamp(28px, 4vw, 48px)", margin: 0, lineHeight: 1.05 }}>
            Our Approved Material Library
          </h2>
        </div>

        {/* Intro */}
        <p
          data-mat-intro=""
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
            margin: "-16px 0 40px",
            maxWidth: 720,
            opacity: 0,
          }}
        >
          Every RayoRise tracksuit is manufactured using a carefully selected technical material library. We don't offer hundreds of random fabrics — we engineer our products around proven performance materials to ensure consistency, durability and repeatable production quality.
        </p>

        {/* Cards grid */}
        <div className="mat-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
          {materials.map((mat, i) => (
            <MaterialCard key={mat.name} mat={mat} index={i} />
          ))}
        </div>

        {/* Pyramid legend */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 20px",
            padding: "14px 20px",
            border: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(34,30,25,0.5)",
          }}
        >
          {["Tier 1 · Hero", "Tier 2 · Core", "Tier 3 · Eco", "Tier 4 · Luxury", "Tier 5 · Lifestyle"].map((t) => (
            <span
              key={t}
              style={{ fontSize: 11, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.04em" }}
            >
              <span style={{ color: G }}>▸</span> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Material Card ─── */
function MaterialCard({ mat, index }: { mat: typeof materials[0]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-mat-card=""
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#221E19",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: `2px solid ${G}`,
        padding: "20px 22px",
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

      {/* Header: Name + Tier + Rating */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
            {mat.name}
          </h3>
          <span style={{ fontSize: 10, color: G, fontFamily: "var(--font-dm-sans)", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7 }}>
            {mat.tier}
          </span>
        </div>
        <Stars count={mat.rating} />
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
        {mat.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
        {mat.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: hov ? "#C8BFA8" : "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
              padding: "3px 10px",
              border: "1px solid",
              borderColor: hov ? "rgba(201,145,58,0.2)" : "rgba(255,255,255,0.06)",
              borderRadius: 2,
              background: hov ? "rgba(201,145,58,0.04)" : "transparent",
              transition: "all 0.25s ease",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}