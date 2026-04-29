"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C8102E";
const GL = "#E63946";
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
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        cursor: "pointer",
        opacity: 0,
        transition: "border-color 0.3s ease",
        borderColor: hov ? "rgba(200,16,46,0.2)" : "rgba(255,255,255,0.06)",
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
      <div style={{ position: "relative", overflow: "hidden", height: 288, background: "#161616" }}>
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
          border: `1px solid rgba(200,16,46,0.4)`,
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
        <h3 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F5F0E8", fontSize: 28, margin: 0 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: 13, fontWeight: 600, color: G, fontFamily: "var(--font-dm-sans)", margin: 0 }}>
          {product.tagline}
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
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
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#4A4A4A",
                fontFamily: "var(--font-dm-sans)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,16,46,0.3)"; e.currentTarget.style.color = "#C8C5BC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#4A4A4A"; }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.a
            href="#contact"
            animate={{ gap: hov ? 14 : 8 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: G,
              fontFamily: "var(--font-dm-sans)",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Request a sample
            <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  /* GSAP: cards stagger reveal + heading */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-product-card]");
    const heading = sectionRef.current.querySelector<HTMLElement>("[data-section-heading]");
    const goldLine = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");

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

    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger && sectionRef.current?.contains(st.vars.trigger as Element)) st.kill();
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="products"
      style={{ width: "100%", background: "#0D0D0D", padding: "96px 0 112px", position: "relative" }}
    >
      {/* Gold top line */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(200,16,46,0.15) 30%, rgba(200,16,46,0.15) 70%, transparent)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div data-section-heading="" style={{ marginBottom: 64, opacity: 0 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", marginBottom: 16, fontWeight: 600 }}>
            What we make
          </p>
          <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F5F0E8", fontSize: "clamp(32px, 5vw, 56px)", margin: 0, lineHeight: 1.05 }}>
            Three products. Perfected.
          </h2>
        </div>

        {/* Cards grid */}
        <style>{`@media(min-width:768px){.products-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
