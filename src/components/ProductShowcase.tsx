"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const products = [
  {
    id: "tracksuits",
    name: "Tracksuits",
    tagline: "The complete set. Full panel, full spec.",
    desc: "Two-piece retro panel tracksuit with matching jacket and pants. Full colour-block customisation, woven labels, and branded packaging.",
    image: "/images/product-tracksuits.png",
    features: ["7-panel construction", "280gsm French Terry", "Custom colourway"],
  },
  {
    id: "track-jackets",
    name: "Track Jackets",
    tagline: "Standalone jacket. Retro panel construction.",
    desc: "The signature jacket from our tracksuit range, available as a standalone piece. Full customisation options — same quality, single garment.",
    image: "/images/product-jacket.png",
    features: ["Zip-through or snap button", "Contrast panel stripe", "Woven label ready"],
  },
  {
    id: "track-pants",
    name: "Track Pants",
    tagline: "Matching or standalone. Custom waistband.",
    desc: "Retro panel track pants with custom waistband and leg panel. Perfect complement to our jacket range or ordered as a standalone piece.",
    image: "/images/product-pants.png",
    features: ["Elasticated waistband", "Side stripe panel", "Draw cord + side pockets"],
  },
];

/* ─── Comparison table data (editable / CMS-ready) ─── */
const comparisonRows: { label: string; values: string[] }[] = [
  { label: "Available Customization", values: ["Full panel customisation", "Panel-only customisation", "Pant customisation"] },
  { label: "Panels", values: ["7-panel", "5-panel", "3-panel"] },
  { label: "Colors", values: ["Multiple plus accents", "Multiple", "Multiple"] },
  { label: "Zippers", values: ["Optional", "Optional", "Optional"] },
  { label: "Ribbing", values: ["Custom rib options", "Custom rib options", "Standard"] },
  { label: "Labels", values: ["Woven & printed", "Woven & printed", "Woven"] },
  { label: "Packaging", values: ["Branded packaging options", "Branded packaging options", "Standard packaging"] },
  { label: "Branding", values: ["Embroidery, print, badges", "Embroidery, print", "Embroidery, print"] },
  { label: "MOQ", values: ["From 50 units", "From 50 units", "From 50 units"] },
];

const brandingOptions: { label: string; values: string[] }[] = [
  { label: "Embroidery", values: ["✓", "✓", "✓"] },
  { label: "Screen Print", values: ["✓", "✓", "✓"] },
  { label: "Heat Transfer", values: ["✓", "✓", "✓"] },
  { label: "Woven Label", values: ["✓", "✓", "✓"] },
  { label: "Rubber Patch", values: ["✓", "✓", "—"] },
  { label: "Silicone Badge", values: ["✓", "✓", "—"] },
];

const recommendedFabrics: { label: string; values: string[] }[] = [
  { label: "280gsm French Terry", values: ["✓", "✓", "✓"] },
  { label: "320gsm Brushed Fleece", values: ["✓", "✓", "✓"] },
  { label: "Ribbed Cuff & Hem", values: ["✓", "✓", "✓"] },
  { label: "Mesh Lining", values: ["✓", "✓", "—"] },
];

const fitOptions: { label: string; values: string[] }[] = [
  { label: "Regular Fit", values: ["✓", "✓", "✓"] },
  { label: "Slim Fit", values: ["✓", "✓", "✓"] },
  { label: "Oversized Fit", values: ["✓", "✓", "✓"] },
  { label: "Relaxed Fit", values: ["✓", "✓", "✓"] },
];

const productionTime: { label: string; values: string[] }[] = [
  { label: "Sampling", values: ["7–10 days", "7–10 days", "7–10 days"] },
  { label: "Bulk Production", values: ["25–35 days", "25–35 days", "25–35 days"] },
];

/* Product Card with tilt on hover */
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [hov, setHov] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      data-product-card=""
      id={`product-${product.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "#221E19",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        cursor: "pointer",
        opacity: 0,
        transition: "border-color 0.3s ease",
        borderColor: hov ? "rgba(201,145,58,0.2)" : "rgba(255,255,255,0.06)",
      }}
    >
      {/* Gold bottom border — scale in on hover */}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: G, transformOrigin: "left", zIndex: 10 }}
      />

      {/* Top corner accent */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, zIndex: 10, pointerEvents: "none" }}
      >
        <span style={{ position: "absolute", top: 0, right: 0, width: 24, height: 2, background: G }} />
        <span style={{ position: "absolute", top: 0, right: 0, width: 2, height: 24, background: G }} />
      </motion.div>

      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 288, background: "#2A2520" }}>
        <motion.div
          animate={{ scale: hov ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Image
            src={product.image}
            alt={`${product.name} — RayoRise B2B custom tracksuit`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        {/* Number badge */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          width: 32, height: 32,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid rgba(201,145,58,0.4)`,
          background: "rgba(10,10,10,0.7)",
          backdropFilter: "blur(8px)",
          color: G,
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: 14,
          fontWeight: 700,
        }}>
          0{index + 1}
        </div>

        {/* Hover gradient overlay */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)", pointerEvents: "none" }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: 28, margin: 0 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: 13, fontWeight: 600, color: G, fontFamily: "var(--font-dm-sans)", margin: 0 }}>
          {product.tagline}
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
          {product.desc}
        </p>

        {/* Feature tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          {product.features.map((f) => (
            <span
              key={f}
              style={{
                padding: "5px 12px",
                fontSize: 11,
                background: "#2A2520",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#8A7E70",
                fontFamily: "var(--font-dm-sans)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,145,58,0.3)"; e.currentTarget.style.color = "#C8BFA8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#8A7E70"; }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link
            href={`/products/${product.id}`}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: hov ? 14 : 8,
              fontSize: 13,
              fontWeight: 600,
              color: G,
              fontFamily: "var(--font-dm-sans)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "gap 0.25s ease",
            }}
          >
            View product details
            <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Comparison table section ─── */
function ComparisonTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const sectionLabel = (label: string, isSub?: boolean) => (
    <td
      style={{
        padding: "10px 14px",
        color: isSub ? "#8A7E70" : "#C8BFA8",
        fontWeight: isSub ? 500 : 700,
        fontSize: isSub ? 12 : 13,
        fontFamily: "var(--font-dm-sans)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        whiteSpace: "nowrap",
        background: "#15130f",
        position: "sticky",
        left: 0,
        zIndex: 2,
      }}
    >
      {label}
    </td>
  );

  const cellValue = (val: string, idx: number) => (
    <td
      key={idx}
      style={{
        padding: "10px 14px",
        color: val === "✓" ? G : val === "—" ? "#5A5044" : "#8A7E70",
        fontSize: 13,
        fontFamily: "var(--font-dm-sans)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        textAlign: "center",
        whiteSpace: "nowrap",
        fontWeight: val === "✓" ? 600 : 400,
      }}
    >
      {val}
    </td>
  );

  const renderRow = (row: { label: string; values: string[] }, i: number, isSub?: boolean) => (
    <tr
      key={`${isSub ? "sub-" : ""}${row.label}`}
      onMouseEnter={() => setHoveredRow(i)}
      onMouseLeave={() => setHoveredRow(null)}
      style={{
        transition: "background 0.2s ease",
        background: hoveredRow === i ? "rgba(201,145,58,0.03)" : "transparent",
      }}
    >
      {sectionLabel(row.label, isSub)}
      {row.values.map((v, vi) => cellValue(v, vi))}
    </tr>
  );

  return (
    <div style={{ marginTop: 48 }}>
      <h3
        data-table-heading=""
        style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontWeight: 900,
          color: "#F0E8D8",
          fontSize: "clamp(24px, 3vw, 36px)",
          margin: 0,
          opacity: 0,
        }}
      >
        Compare Our Products
      </h3>
      <p
        data-table-intro=""
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "#8A7E70",
          fontFamily: "var(--font-dm-sans)",
          margin: "8px 0 0",
          opacity: 0,
        }}
      >
        A quick overview to help you choose the right product for your collection. All values are editable for future updates.
      </p>

      <div
        data-table-wrapper=""
        style={{
          overflowX: "auto",
          marginTop: 20,
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 6,
          opacity: 0,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(201,145,58,0.15)" }}>
              <th
                style={{
                  padding: "12px 14px",
                  textAlign: "left",
                  color: "#F0E8D8",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: "#15130f",
                  position: "sticky",
                  left: 0,
                  zIndex: 3,
                  width: 180,
                }}
              >
                Feature
              </th>
              {products.map((p) => (
                <th
                  key={p.id}
                  style={{
                    padding: "12px 14px",
                    textAlign: "center",
                    color: G,
                    fontFamily: "var(--font-barlow-condensed)",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Main comparison rows */}
            {comparisonRows.map((row, i) => renderRow(row, i))}

            {/* Branding Options sub-section */}
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: "10px 14px",
                  color: G,
                  fontWeight: 700,
                  fontSize: 12,
                  fontFamily: "var(--font-dm-sans)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid rgba(201,145,58,0.1)",
                  background: "rgba(201,145,58,0.04)",
                }}
              >
                Branding Options
              </td>
            </tr>
            {brandingOptions.map((row, i) => renderRow(row, i, true))}

            {/* Recommended Fabrics sub-section */}
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: "10px 14px",
                  color: G,
                  fontWeight: 700,
                  fontSize: 12,
                  fontFamily: "var(--font-dm-sans)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid rgba(201,145,58,0.1)",
                  background: "rgba(201,145,58,0.04)",
                }}
              >
                Recommended Fabrics
              </td>
            </tr>
            {recommendedFabrics.map((row, i) => renderRow(row, i, true))}

            {/* Fit Options sub-section */}
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: "10px 14px",
                  color: G,
                  fontWeight: 700,
                  fontSize: 12,
                  fontFamily: "var(--font-dm-sans)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid rgba(201,145,58,0.1)",
                  background: "rgba(201,145,58,0.04)",
                }}
              >
                Fit Options
              </td>
            </tr>
            {fitOptions.map((row, i) => renderRow(row, i, true))}

            {/* Production Time sub-section */}
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: "10px 14px",
                  color: G,
                  fontWeight: 700,
                  fontSize: 12,
                  fontFamily: "var(--font-dm-sans)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid rgba(201,145,58,0.1)",
                  background: "rgba(201,145,58,0.04)",
                }}
              >
                Production Time
              </td>
            </tr>
            {productionTime.map((row, i) => renderRow(row, i, true))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* GSAP: cards stagger reveal + heading + table */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-product-card]");
    const heading = sectionRef.current.querySelector<HTMLElement>("[data-section-heading]");
    const goldLine = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");
    const tableHeading = sectionRef.current.querySelector<HTMLElement>("[data-table-heading]");
    const tableIntro = sectionRef.current.querySelector<HTMLElement>("[data-table-intro]");
    const tableWrapper = sectionRef.current.querySelector<HTMLElement>("[data-table-wrapper]");

    if (goldLine) {
      gsap.fromTo(goldLine, { scaleX: 0 }, {
        scaleX: 1, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }

    if (heading) {
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" } }
      );
    }

    /* Cards: staggered scale + fade */
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8, ease: "power3.out", delay: i * 0.15,
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });

    /* Table heading */
    if (tableHeading) {
      gsap.fromTo(tableHeading,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: tableHeading, start: "top 88%", toggleActions: "play none none none" } }
      );
    }

    /* Table intro */
    if (tableIntro) {
      gsap.fromTo(tableIntro,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1,
          scrollTrigger: { trigger: tableIntro, start: "top 90%", toggleActions: "play none none none" } }
      );
    }

    /* Table wrapper */
    if (tableWrapper) {
      gsap.fromTo(tableWrapper,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.2,
          scrollTrigger: { trigger: tableWrapper, start: "top 90%", toggleActions: "play none none none" } }
      );
    }

    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger && sectionRef.current?.contains(st.vars.trigger as Element)) st.kill();
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="products"
      style={{ width: "100%", background: "#1A1612", padding: "96px 0 112px", position: "relative" }}
    >
      {/* Gold top line */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div data-section-heading="" style={{ marginBottom: 64, opacity: 0 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", marginBottom: 16, fontWeight: 600 }}>
            WHAT WE MAKE
          </p>
          <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: "clamp(32px, 5vw, 56px)", margin: 0, lineHeight: 1.05 }}>
            Specialists in tracksuit,<br />jacket & pant manufacturing
          </h2>
        </div>

        {/* Introduction */}
        <p
          data-intro=""
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
            margin: "-40px 0 48px",
            maxWidth: 720,
            opacity: 0,
          }}
        >
          RayoRise specialises in three core product categories — tracksuits, track jackets, and track pants — all designed for private-label manufacturing and fully customisable to meet different brand requirements. Each product is built using the same precision pattern development, quality materials, and production standards.
        </p>

        {/* Cards grid */}
        <style>{`@media(min-width:768px){.products-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Comparison table */}
        <ComparisonTable />
      </div>
    </section>
  );
}