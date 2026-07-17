"use client";

import * as React from "react";
import { ChevronRight, Star, Tag, Ruler, Users, Info, Heart, Share2, ShoppingCart, Send, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductExpandedContent from "@/components/ui/ProductExpandedContent";

/* ─── tokens ─── */
const G = "#C9913A";
const GL = "#DBAA55";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Types ─── */
export interface ProductSpec {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface ProductReview {
  name: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductDetailProps {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  images: ProductImage[];
  specs: ProductSpec[];
  features: string[];
  moq: string;
  sampling: string;
  reviews: ProductReview[];
  relatedProducts?: { id: string; title: string; image: string; category: string }[];
}

/* ═══════ STAR RATING ═══════ */
function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="h-4 w-4"
          style={{
            color: s <= rating ? G : "rgba(255,255,255,0.1)",
            fill: s <= rating ? G : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════ IMAGE GALLERY ═══════ */
function ImageGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = React.useState(0);
  const [hov, setHov] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Main image */}
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/5",
          overflow: "hidden",
          background: "#221E19",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: hov ? 1.04 : 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={images[active]?.src || "/images/hero-tracksuit-1.png"}
              alt={images[active]?.alt || "Product"}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gold corner accents */}
        <span style={{ position: "absolute", top: 16, left: 16, width: 24, height: 2, background: G, zIndex: 5 }} />
        <span style={{ position: "absolute", top: 16, left: 16, width: 2, height: 24, background: G, zIndex: 5 }} />
        <span style={{ position: "absolute", bottom: 16, right: 16, width: 24, height: 2, background: G, zIndex: 5 }} />
        <span style={{ position: "absolute", bottom: 16, right: 16, width: 2, height: 24, background: G, zIndex: 5 }} />

        {/* Zoom icon */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0 }}
          style={{
            position: "absolute", bottom: 16, left: 16, zIndex: 10,
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
            padding: "8px 12px", display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <Camera className="h-4 w-4" style={{ color: G }} />
          <span style={{ fontSize: 11, color: "#ccc", fontFamily: "var(--font-dm-sans)" }}>
            {active + 1} / {images.length}
          </span>
        </motion.div>
      </motion.div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              width: 72,
              height: 72,
              flexShrink: 0,
              overflow: "hidden",
              border: active === i ? `2px solid ${G}` : "1px solid rgba(255,255,255,0.08)",
              background: "#221E19",
              cursor: "pointer",
              padding: 0,
              opacity: active === i ? 1 : 0.6,
              transition: "opacity 0.2s, border-color 0.2s",
            }}
          >
            <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="72px" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ═══════ SPEC TABLE ═══════ */
function SpecTable({ specs }: { specs: ProductSpec[] }) {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {specs.map((spec, i) => (
        <motion.div
          key={spec.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>
            {spec.icon}
            {spec.label}
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", textAlign: "right" }}>
            {spec.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════ REVIEW CARD ═══════ */
function ReviewCard({ review, index }: { review: ProductReview; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        padding: 24,
        background: "#221E19",
        border: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: `linear-gradient(135deg, ${G}, ${GL})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#1A1612", fontFamily: "var(--font-dm-sans)",
          }}>
            {review.initials}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{review.name}</p>
            <p style={{ fontSize: 11, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
        {review.text}
      </p>
    </motion.div>
  );
}

/* ═══════ CTA BUTTON ═══════ */
function GoldCTA({ href, label, primary = true }: { href: string; label: string; primary?: boolean }) {
  const [hov, setHov] = React.useState(false);
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: primary ? (hov ? GL : G) : (hov ? "rgba(201,145,58,0.1)" : "transparent"),
        borderColor: primary ? (hov ? GL : G) : (hov ? G : "rgba(201,145,58,0.5)"),
        scale: hov ? 1.03 : 1,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.22 }}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: 8, padding: "14px 28px", border: "1.5px solid", textDecoration: "none",
        cursor: "pointer", position: "relative", overflow: "hidden",
        fontSize: 13, fontWeight: 700, letterSpacing: "0.04em",
        fontFamily: "var(--font-dm-sans)", color: primary ? "#1A1612" : G,
      }}
    >
      <motion.span
        animate={{ x: hov ? "350%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", top: 0, left: 0, width: "35%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", transform: "skewX(-20deg)", pointerEvents: "none" }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </motion.a>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export default function ProductDetailPage({ product }: { product: ProductDetailProps }) {
  const [activeTab, setActiveTab] = React.useState<"specs" | "reviews">("specs");

  return (
    <div style={{ minHeight: "100vh", background: "#1A1612", color: "#F0E8D8" }}>
      {/* ── Breadcrumb nav ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/" style={{ textDecoration: "none", fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: 20, background: `linear-gradient(130deg, ${G}, ${GL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              RayoRise
            </Link>
            <ChevronRight className="h-4 w-4" style={{ color: "#8A7E70" }} />
            <Link href="/products" style={{ fontSize: 12, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", textDecoration: "none" }}>
              Products
            </Link>
            <ChevronRight className="h-4 w-4" style={{ color: "#8A7E70" }} />
            <span style={{ fontSize: 12, color: G, fontFamily: "var(--font-dm-sans)" }}>{product.title}</span>
          </div>
          <Link href="/" style={{ fontSize: 12, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* ── Main content ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 96px" }}>
        <style>{`
          .pdp-grid { grid-template-columns: 1fr; gap: 40px; }
          @media(min-width:768px) { .pdp-grid { grid-template-columns: 1fr 1fr !important; gap: 56px !important; } }
        `}</style>
        <div className="pdp-grid" style={{ display: "grid", alignItems: "start" }}>
          {/* Left — Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ImageGallery images={product.images} />
          </motion.div>

          {/* Right — Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {/* Category badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Badge variant="outline" className="border-[rgba(201,145,58,0.3)] text-xs" style={{ color: G, fontFamily: "var(--font-dm-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {product.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05, color: "#F0E8D8", margin: 0 }}>
              {product.title}
            </h1>

            {/* Tagline */}
            <p style={{ fontSize: 16, fontWeight: 500, color: G, fontFamily: "var(--font-dm-sans)", margin: 0 }}>
              {product.tagline}
            </p>

            {/* Description */}
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
              {product.description}
            </p>

            {/* Feature tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {product.features.map((f) => (
                <span key={f} style={{
                  padding: "6px 14px", fontSize: 11, background: "rgba(201,145,58,0.06)",
                  border: "1px solid rgba(201,145,58,0.15)", color: "#ccc",
                  fontFamily: "var(--font-dm-sans)", letterSpacing: "0.02em",
                }}>
                  {f}
                </span>
              ))}
            </div>

            {/* MOQ + Sampling */}
            <div style={{ display: "flex", gap: 32 }}>
              <div>
                <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#666", fontFamily: "var(--font-dm-sans)", margin: "0 0 4px" }}>MOQ</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: G, fontFamily: "var(--font-barlow-condensed)", margin: 0 }}>{product.moq}</p>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.06)" }} />
              <div>
                <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#666", fontFamily: "var(--font-dm-sans)", margin: "0 0 4px" }}>Sampling</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: G, fontFamily: "var(--font-barlow-condensed)", margin: 0 }}>{product.sampling}</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 8 }}>
              <GoldCTA href="/customize" label="Open Customiser →" primary />
              <GoldCTA href="/#contact" label="Request Sample" primary={false} />
            </div>

            {/* Share + Wishlist */}
            <div style={{ display: "flex", gap: 16, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#8A7E70", fontSize: 12, fontFamily: "var(--font-dm-sans)", cursor: "pointer" }}>
                <Heart className="h-4 w-4" /> Save
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#8A7E70", fontSize: 12, fontFamily: "var(--font-dm-sans)", cursor: "pointer" }}>
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#8A7E70", fontSize: 12, fontFamily: "var(--font-dm-sans)", cursor: "pointer" }}>
                <Send className="h-4 w-4" /> Enquire via WhatsApp
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs: Specs / Reviews ── */}
        <div style={{ marginTop: 80 }}>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 32 }}>
            {(["specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "14px 28px", background: "none", border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                  fontFamily: "var(--font-dm-sans)",
                  color: activeTab === tab ? G : "#8A7E70",
                  borderBottom: activeTab === tab ? `2px solid ${G}` : "2px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {tab === "specs" ? "Specifications" : `Reviews (${product.reviews.length})`}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "specs" ? (
              <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <style>{`
                  .specs-grid { grid-template-columns: 1fr; }
                  @media(min-width:768px) { .specs-grid { grid-template-columns: 1fr 1fr !important; gap: 48px !important; } }
                `}</style>
                <div className="specs-grid" style={{ display: "grid", gap: 32 }}>
                  <SpecTable specs={product.specs} />
                  <div style={{ padding: 32, background: "#221E19", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 16 }}>
                    <Info className="h-5 w-5" style={{ color: G }} />
                    <h3 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: 24, color: "#F0E8D8", margin: 0 }}>
                      Need a custom spec?
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
                      Every specification listed can be customised to your exact requirements. Contact us to discuss your unique needs.
                    </p>
                    <GoldCTA href="/#contact" label="Discuss Requirements" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <style>{`
                  .reviews-grid { grid-template-columns: 1fr; }
                  @media(min-width:768px) { .reviews-grid { grid-template-columns: 1fr 1fr !important; } }
                `}</style>
                <div className="reviews-grid" style={{ display: "grid", gap: 16 }}>
                  {product.reviews.map((r, i) => (
                    <ReviewCard key={i} review={r} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Related Products ── */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(24px, 3vw, 36px)", color: "#F0E8D8", marginBottom: 32 }}>
              You may also like
            </h2>
            <style>{`
              .related-grid { grid-template-columns: 1fr; }
              @media(min-width:768px) { .related-grid { grid-template-columns: repeat(3, 1fr) !important; } }
            `}</style>
            <div className="related-grid" style={{ display: "grid", gap: 20 }}>
              {product.relatedProducts.map((rp) => (
                <RelatedProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}

        {/* ── Expanded Product Details ── */}
        <ProductExpandedContent productId={product.id} />
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

/* ═══════ RELATED PRODUCT CARD ═══════ */
function RelatedProductCard({ product }: { product: { id: string; title: string; image: string; category: string } }) {
  const [hov, setHov] = React.useState(false);
  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "#221E19",
          border: hov ? "1px solid rgba(201,145,58,0.2)" : "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          cursor: "pointer",
          transition: "border-color 0.3s",
        }}
      >
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <motion.div animate={{ scale: hov ? 1.06 : 1 }} transition={{ duration: 0.4 }} style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src={product.image} alt={product.title} fill style={{ objectFit: "cover" }} sizes="33vw" />
          </motion.div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)" }} />
        </div>
        <div style={{ padding: "16px 20px" }}>
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: G, fontFamily: "var(--font-dm-sans)", margin: "0 0 6px" }}>{product.category}</p>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: "#F0E8D8", fontFamily: "var(--font-barlow-condensed)", margin: 0 }}>{product.title}</h3>
        </div>
        <motion.div animate={{ scaleX: hov ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ height: 2, background: G, transformOrigin: "left" }} />
      </motion.div>
    </Link>
  );
}
