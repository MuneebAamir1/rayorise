"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ProductHighlightCard } from "@/components/ui/product-card";
import { Shirt, Wind, Scissors, ArrowRight, Sparkles, Shield, Truck } from "lucide-react";

const G = "#C9913A";
const GL = "#DBAA55";

/* ── Product data ── */
const PRODUCTS = [
  {
    id: "tracksuits",
    category: "Full Set",
    title: "Tracksuits",
    description: "Complete two-piece sets with matching jacket and pants. Custom panelling, embroidery placement, and full colour matching.",
    icon: <Shirt className="h-5 w-5" style={{ color: G }} />,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    features: ["Full panel customisation", "Matching jacket & pants", "Custom zippers & hardware", "Label & tag printing"],
    moq: "50 units",
    sampling: "7–10 days",
  },
  {
    id: "jackets",
    category: "Outerwear",
    title: "Track Jackets",
    description: "Retro-cut standalone jackets with precision-engineered panels, premium zippers, and vintage silhouette detailing.",
    icon: <Wind className="h-5 w-5" style={{ color: G }} />,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    features: ["Retro collar options", "Side-panel stripe variations", "Custom inner lining", "Ribbed cuff & hem"],
    moq: "50 units",
    sampling: "5–7 days",
  },
  {
    id: "pants",
    category: "Bottoms",
    title: "Track Pants",
    description: "Custom panel track pants with bespoke waistband, tapered or straight leg options, and side-stripe detailing.",
    icon: <Scissors className="h-5 w-5" style={{ color: G }} />,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    features: ["Tapered & straight cuts", "Custom waistband", "Zip ankle options", "Side-panel detailing"],
    moq: "50 units",
    sampling: "5–7 days",
  },
];

const TRUST_POINTS = [
  { icon: <Sparkles className="h-5 w-5" />, label: "Premium Fabrics", desc: "Sourced polyester & nylon" },
  { icon: <Shield className="h-5 w-5" />, label: "Quality Guaranteed", desc: "Sample before production" },
  { icon: <Truck className="h-5 w-5" />, label: "UK Delivery", desc: "Tracked dispatch included" },
];

/* ── Feature row ── */
function FeatureRow({ features }: { features: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
      {features.map((f) => (
        <span key={f} style={{
          fontSize: 11, padding: "6px 12px", background: "rgba(201,145,58,0.08)",
          border: "1px solid rgba(201,145,58,0.15)", color: "#ccc",
          fontFamily: "var(--font-dm-sans)", letterSpacing: "0.02em",
        }}>
          {f}
        </span>
      ))}
    </div>
  );
}

/* ── Product detail section ── */
function ProductDetail({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      id={product.id}
      style={{ scrollMarginTop: 80 }}
    >
      <style>{`
        .prod-detail-${index} { flex-direction: column; }
        @media(min-width:768px) { .prod-detail-${index} { flex-direction: ${reversed ? "row-reverse" : "row"} !important; } }
      `}</style>
      <div
        className={`prod-detail-${index}`}
        style={{
          display: "flex", gap: 48, alignItems: "center",
          padding: "64px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Image side */}
        <div style={{ flex: "1 1 45%", position: "relative", overflow: "hidden" }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)" }} />
            {/* Gold corner */}
            <span style={{ position: "absolute", bottom: 16, right: 16, width: 24, height: 2, background: G }} />
            <span style={{ position: "absolute", bottom: 16, right: 16, width: 2, height: 24, background: G }} />
          </motion.div>
        </div>

        {/* Content side */}
        <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {product.icon}
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600 }}>
              {product.category}
            </span>
          </div>

          <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(32px, 4vw, 48px)", color: "#F0E8D8", lineHeight: 1.1, margin: 0 }}>
            {product.title}
          </h2>

          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", maxWidth: 480, margin: 0 }}>
            {product.description}
          </p>

          <FeatureRow features={product.features} />

          {/* Specs */}
          <div style={{ display: "flex", gap: 32, marginTop: 8 }}>
            <div>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#666", fontFamily: "var(--font-dm-sans)", margin: "0 0 4px" }}>MOQ</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#F0E8D8", fontFamily: "var(--font-barlow-condensed)", margin: 0 }}>{product.moq}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#666", fontFamily: "var(--font-dm-sans)", margin: "0 0 4px" }}>Sampling</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#F0E8D8", fontFamily: "var(--font-barlow-condensed)", margin: 0 }}>{product.sampling}</p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
            <Link
              href="/customize"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
                background: G, color: "#1A1612", fontSize: 13, fontWeight: 700,
                fontFamily: "var(--font-dm-sans)", textDecoration: "none", letterSpacing: "0.04em",
                transition: "background 0.2s",
              }}
            >
              Customise Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
                background: "none", border: `1.5px solid rgba(201,145,58,0.4)`, color: G,
                fontSize: 13, fontWeight: 600, fontFamily: "var(--font-dm-sans)", textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              Request Sample
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════
   MAIN PRODUCTS SHOWCASE
   ══════════════════════════════════ */
export default function ProductsShowcase() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  return (
    <div style={{ minHeight: "100vh", background: "#1A1612", color: "#F0E8D8" }}>
      {/* ── Top bar ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: 20, background: `linear-gradient(130deg, ${G}, ${GL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              RayoRise
            </span>
            <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: 12, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.06em" }}>PRODUCTS</span>
          </Link>
          <Link href="/" style={{ fontSize: 12, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* ── Hero section with 3D cards ── */}
      <section ref={heroRef} style={{ padding: "80px 0 64px", position: "relative", overflow: "hidden" }}>
        {/* BG pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 38px, rgba(255,255,255,0.025) 38px, rgba(255,255,255,0.025) 40px)" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 10 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", marginBottom: 16, fontWeight: 600 }}>
              Our Product Range
            </p>
            <h1 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05, margin: "0 0 16px" }}>
              Engineered for<br />streetwear excellence.
            </h1>
            <p style={{ fontSize: 15, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", maxWidth: 520, margin: "0 auto" }}>
              Three product categories. Infinite customisation. Every piece built to your exact specification.
            </p>
          </motion.div>

          {/* 3D Product Cards */}
          <style>{`
            .cards-row { flex-direction: column; align-items: center; }
            @media(min-width: 1100px) { .cards-row { flex-direction: row !important; justify-content: center !important; } }
          `}</style>
          <div className="cards-row" style={{ display: "flex", gap: 32, perspective: 1200 }}>
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              >
                <a href={`#${p.id}`} style={{ textDecoration: "none" }}>
                  <ProductHighlightCard
                    category={p.category}
                    categoryIcon={p.icon}
                    title={p.title}
                    description={p.description}
                    imageSrc={p.image}
                    imageAlt={p.title}
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {TRUST_POINTS.map((t) => (
            <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ color: G }}>{t.icon}</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{t.label}</p>
                <p style={{ fontSize: 11, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Product details ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {PRODUCTS.map((p, i) => (
          <ProductDetail key={p.id} product={p} index={i} />
        ))}
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ padding: "96px 32px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", margin: "0 0 16px" }}>
            Ready to build your line?
          </h2>
          <p style={{ fontSize: 14, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", maxWidth: 420, margin: "0 auto 32px" }}>
            From concept to delivery — we handle every detail so you can focus on your brand.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/customize"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
                background: G, color: "#1A1612", fontSize: 14, fontWeight: 700,
                fontFamily: "var(--font-dm-sans)", textDecoration: "none",
              }}
            >
              Open Customiser <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
                background: "none", border: `1.5px solid ${G}`, color: G,
                fontSize: 14, fontWeight: 600, fontFamily: "var(--font-dm-sans)", textDecoration: "none",
              }}
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "20px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#6A5F54", fontFamily: "var(--font-dm-sans)" }}>
          © {new Date().getFullYear()} RayoRise · Specialist B2B Tracksuit Manufacturer · United Kingdom
        </p>
      </div>
    </div>
  );
}
