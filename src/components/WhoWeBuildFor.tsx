"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const industries = [
  {
    title: "Clothing Brands",
    desc: "Private label manufacturing for independent apparel brands.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <path d="M7 7h10l1 3-3 2v8H9v-8L6 10l1-3Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Football Apparel Brands",
    desc: "Custom production for football-inspired collections and heritage sportswear labels.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="7.5" />
        <path d="M10 8.5 12 7l2 1.5-1 2.5h-2l-1-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Sportswear Brands",
    desc: "Premium manufacturing for performance and lifestyle sportswear companies.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <path d="M6 9.5 12 6l6 3.5v8L12 18l-6-.5v-8Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Startup Fashion Brands",
    desc: "Low MOQ production designed for emerging brands entering the market.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <path d="M12 4v16M4 12h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Buying Houses",
    desc: "Reliable manufacturing support for international sourcing partners.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <path d="M4.5 19.5h15M6 19.5V9.75L12 5l6 4.75v9.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Importers",
    desc: "Export-ready production with scalable manufacturing capacity.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <path d="M4.5 15h15l-1.5 3h-12zM7 15V9l5-3 5 3v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Wholesalers",
    desc: "Bulk production tailored for wholesale distribution businesses.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <rect x="5" y="7" width="14" height="10" rx="2" />
        <path d="M8 10h8M8 13h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Retail Chains",
    desc: "Consistent production for private label retail collections.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <path d="M5 10h14l-1 8H6l-1-8Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10a4 4 0 0 1 8 0" strokeLinecap="round" />
      </svg>
    ),
  },
];

const staggerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function WhoWeBuildFor() {
  return (
    <section
      id="who-we-build-for"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#1A1612",
        padding: "112px 0",
      }}
    >
      {/* Background atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at top, rgba(201,145,58,0.08) 0%, transparent 40%), radial-gradient(circle at left, rgba(255,255,255,0.03) 0%, transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 30%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(201,145,58,0.25), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative gold blurs */}
      <div style={{ position: "absolute", top: 80, right: 40, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,145,58,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 60, left: 20, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,145,58,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        {/* ── Section Header ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{ marginBottom: 64 }}
        >
          <motion.p variants={fadeUp} style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: G, fontFamily: "var(--font-dm-sans)" }}>
            Who we build for
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ margin: 0, fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 0.92, color: "#F0E8D8", maxWidth: 700 }}>
            Manufacturing for ambitious apparel businesses
          </motion.h2>
          <motion.p variants={fadeUp} style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.75, color: "#C8BFA8", fontFamily: "var(--font-dm-sans)", maxWidth: 640 }}>
            We partner with businesses of all sizes — from startups launching their first collection to established brands scaling production — with a focus on football-inspired tracksuits.
          </motion.p>
        </motion.div>

        {/* ── Metrics Strip ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 64,
            padding: 20,
            border: "1px solid rgba(201,145,58,0.12)",
            borderRadius: 20,
            background: "rgba(34,30,25,0.6)",
          }}
        >
          {[
            { label: "Minimum Order Quantity", value: "50+ Units" },
            { label: "Sampling Timeline", value: "7–10 Days" },
            { label: "Bulk Production", value: "3–5 Weeks" },
            { label: "Export Markets", value: "Worldwide" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              style={{
                flex: "1 1 180px",
                padding: "14px 20px",
                borderRadius: 14,
                border: "1px solid rgba(201,145,58,0.08)",
                background: "rgba(23,18,14,0.6)",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 900, color: "#F0E8D8", fontFamily: "var(--font-barlow-condensed)", lineHeight: 1.2 }}>{s.value}</div>
              <div style={{ marginTop: 4, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Industry Cards ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {industries.map((item) => (
            <IndustryCard key={item.title} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Industry Card ─── */
function IndustryCard({ title, desc, svg }: { title: string; desc: string; svg: React.ReactNode }) {
  return (
    <Link
      href="/contact"
      aria-label={`${title} — contact RayoRise`}
      style={{ textDecoration: "none", display: "block" }}
      className="who-card"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: EASE }}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          padding: 1,
          height: "100%",
        }}
      >
        <div
          className="who-card-inner"
          style={{
            position: "relative",
            borderRadius: 19,
            background: "#221E19",
            padding: "24px 24px 28px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Hover glow */}
          <div
            className="who-card-glow"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 19,
              background: "radial-gradient(circle at 50% 0%, rgba(201,145,58,0.12) 0%, transparent 60%)",
              opacity: 0,
              transition: "opacity 0.35s ease",
              pointerEvents: "none",
            }}
          />

          {/* Icon */}
          <div
            className="who-card-icon"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 14,
              border: "1px solid rgba(201,145,58,0.15)",
              background: "#17120E",
              color: "#E7C27E",
              transition: "all 0.3s ease",
            }}
          >
            {svg}
          </div>

          {/* Title */}
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 900,
              fontSize: 22,
              lineHeight: 1.05,
              color: "#F0E8D8",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.65,
              color: "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
              flex: 1,
            }}
          >
            {desc}
          </p>

          {/* CTA */}
          <div
            className="who-card-cta"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: G,
              fontFamily: "var(--font-dm-sans)",
              transition: "transform 0.3s ease",
            }}
          >
            Contact sales
            <span style={{ display: "inline-block", transition: "transform 0.3s ease" }} className="who-card-arrow">→</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        .who-card:hover .who-card-glow { opacity: 1; }
        .who-card:hover .who-card-icon { border-color: rgba(201,145,58,0.35); background: rgba(23,18,14,0.8); box-shadow: 0 0 20px rgba(201,145,58,0.1); }
        .who-card:hover .who-card-cta { transform: translateX(4px); }
        .who-card:hover .who-card-arrow { transform: translateX(3px); }
        .who-card:focus-visible { outline: 2px solid ${G}; outline-offset: 4px; border-radius: 20px; }
      `}</style>
    </Link>
  );
}