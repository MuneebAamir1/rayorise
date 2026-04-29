"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

/* ─── tokens ─── */
const G = "#C8102E";
const GL = "#E63946";
const GD = "rgba(200,16,46,0.22)";

const NAV = [
  { l: "Home", h: "#hero" },
  { l: "About", h: "#about" },
  { l: "Contact", h: "#contact" },
];
const PRODS = [
  { l: "Tracksuits", h: "#products", d: "Full two-piece sets" },
  { l: "Track Jackets", h: "#products", d: "Retro-cut standalone jacket" },
  { l: "Track Pants", h: "#products", d: "Custom panel & waistband" },
];

/* ─── responsive hook: true = desktop ─── */
function useIsDesktop(bp = 1024) {
  const [desk, setDesk] = useState(true);
  useEffect(() => {
    const check = () => setDesk(window.innerWidth >= bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return desk;
}

/* ─── NavLink ─── */
function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: hov ? "#F0EEE8" : "#5A5A5A",
        textDecoration: "none",
        padding: "6px 0",
        fontFamily: "var(--font-dm-sans)",
        cursor: "pointer",
        transition: "color 0.2s ease",
      }}
    >
      {label}
      <motion.span
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 1,
          background: G,
          transformOrigin: "left",
          pointerEvents: "none",
        }}
      />
    </a>
  );
}

/* ─── GoldButton CTA ─── */
function GoldButton({ href, label = "Request Sample", full = false }: { href: string; label?: string; full?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: hov ? G : "transparent",
        borderColor: hov ? G : "rgba(200,16,46,0.5)",
        scale: hov ? 1.03 : 1,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.22 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "10px 24px",
        border: "1.5px solid",
        borderRadius: 2,
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        width: full ? "100%" : "auto",
      }}
    >
      {/* shimmer sweep */}
      <motion.span
        animate={{ x: hov ? "300%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", transform: "skewX(-20deg)", pointerEvents: "none" }}
      />
      <motion.span
        animate={{ backgroundColor: hov ? "#0D0D0D" : G, boxShadow: hov ? "none" : `0 0 8px ${GD}` }}
        style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0 }}
      />
      <motion.span
        animate={{ color: hov ? "#0D0D0D" : G }}
        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, fontFamily: "var(--font-dm-sans)", whiteSpace: "nowrap" as const }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

/* ─── Dropdown ─── */
function ProductsDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: 12,
            width: 250,
            zIndex: 100,
            background: "#0C0C0C",
            border: "1px solid rgba(200,16,46,0.2)",
            borderTop: `2px solid ${G}`,
            boxShadow: "0 24px 80px rgba(0,0,0,0.9)",
          }}
        >
          {PRODS.map((p, i) => (
            <motion.a
              key={p.l}
              href={p.h}
              onClick={onClose}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "14px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                textDecoration: "none",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(200,16,46,0.06)";
                const bar = e.currentTarget.querySelector<HTMLElement>("[data-bar]");
                if (bar) bar.style.transform = "scaleY(1)";
                const lbl = e.currentTarget.querySelector<HTMLElement>("[data-lbl]");
                if (lbl) lbl.style.color = G;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                const bar = e.currentTarget.querySelector<HTMLElement>("[data-bar]");
                if (bar) bar.style.transform = "scaleY(0)";
                const lbl = e.currentTarget.querySelector<HTMLElement>("[data-lbl]");
                if (lbl) lbl.style.color = "#E0DDD6";
              }}
            >
              <span data-bar="" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: G, transform: "scaleY(0)", transformOrigin: "top", transition: "transform 0.2s ease" }} />
              <span data-lbl="" style={{ fontSize: 13, fontWeight: 600, color: "#E0DDD6", fontFamily: "var(--font-dm-sans)", transition: "color 0.15s" }}>{p.l}</span>
              <span style={{ fontSize: 11, marginTop: 2, color: "#5C5C56", fontFamily: "var(--font-dm-sans)" }}>{p.d}</span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════ NAVBAR ═══════════════════════ */
export default function Navbar() {
  const isDesktop = useIsDesktop(1024);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ddTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (isDesktop) setMobOpen(false); }, [isDesktop]);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  const openDD = useCallback(() => { if (ddTimer.current) clearTimeout(ddTimer.current); setDdOpen(true); }, []);
  const closeDD = useCallback(() => { ddTimer.current = setTimeout(() => setDdOpen(false), 200); }, []);

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 72 }}
    >
      {/* glass backdrop */}
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(5,5,5,0.95)" : "rgba(5,5,5,0)",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
        }}
        transition={{ duration: 0.35 }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />
      {/* gold line */}
      <motion.div
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 5%, ${G} 35%, ${GL} 50%, ${G} 65%, transparent 95%)`, pointerEvents: "none" }}
      />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* LOGO */}
        <a href="#hero" onClick={() => setMobOpen(false)} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
          <motion.div whileHover={{ scale: 1.08, rotate: 3 }} transition={{ type: "spring", stiffness: 400, damping: 16 }} style={{ position: "relative", width: 42, height: 42 }}>
            <Image src="/images/ray-logo.png" alt="RayoRise" fill style={{ objectFit: "contain" }} sizes="42px" priority />
          </motion.div>
          <span style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: 24, background: `linear-gradient(130deg, ${G}, ${GL}, #A00D24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>RayoRise</span>
        </a>

        {/* DESKTOP NAV — only render when isDesktop */}
        {isDesktop && (
          <nav style={{ display: "flex", alignItems: "center", gap: 32, flex: 1, justifyContent: "center" }}>
            {NAV.map((n) => <NavLink key={n.l} href={n.h} label={n.l} />)}
            <div style={{ position: "relative" }} onMouseEnter={openDD} onMouseLeave={closeDD}>
              <button
                onClick={() => setDdOpen((o) => !o)}
                style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: "6px 0", cursor: "pointer", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", color: ddOpen ? "#F0EEE8" : "#5A5A5A", fontFamily: "var(--font-dm-sans)", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#F0EEE8"; }}
                onMouseLeave={(e) => { if (!ddOpen) e.currentTarget.style.color = "#5A5A5A"; }}
              >
                Products
                <motion.svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" animate={{ rotate: ddOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 10, height: 10 }}>
                  <path d="M2 3.5l3 3 3-3" />
                </motion.svg>
              </button>
              <ProductsDropdown open={ddOpen} onClose={() => setDdOpen(false)} />
            </div>
          </nav>
        )}

        {/* CTA (desktop) + Burger (mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          {isDesktop && <GoldButton href="#contact" />}
          {!isDesktop && (
            <button
              onClick={() => setMobOpen((o) => !o)}
              aria-label={mobOpen ? "Close" : "Menu"}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, width: 36, height: 36 }}
            >
              {[
                { rotate: mobOpen ? 45 : 0, y: mobOpen ? 6.5 : 0 },
                { opacity: mobOpen ? 0 : 1, scaleX: mobOpen ? 0 : 1 },
                { rotate: mobOpen ? -45 : 0, y: mobOpen ? -6.5 : 0 },
              ].map((a, i) => (
                <motion.span key={i} animate={a} transition={{ duration: 0.25 }} style={{ display: "block", height: 1.5, width: 22, backgroundColor: "#E0DDD6", borderRadius: 2, transformOrigin: "center" }} />
              ))}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU — smooth slide */}
      <AnimatePresence>
        {mobOpen && !isDesktop && (
          <motion.div
            key="mob"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden", background: "rgba(5,5,5,0.98)", backdropFilter: "blur(24px)", borderBottom: `1px solid rgba(200,16,46,0.2)` }}
          >
            <div style={{ padding: "20px 28px 28px" }}>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: G, marginBottom: 12, fontFamily: "var(--font-dm-sans)", fontWeight: 700 }}>Products</p>
              {PRODS.map((p, i) => (
                <motion.a key={p.l} href={p.h} onClick={() => setMobOpen(false)} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} style={{ display: "block", padding: "10px 16px", fontSize: 14, color: "#4A4A4A", borderLeft: `2px solid rgba(200,16,46,0.2)`, marginBottom: 4, textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}>{p.l}</motion.a>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "16px 0" }} />
              {NAV.map((n, i) => (
                <motion.a key={n.l} href={n.h} onClick={() => setMobOpen(false)} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }} style={{ display: "block", padding: "12px 0", fontSize: 15, color: "#4A4A4A", borderBottom: "1px solid rgba(255,255,255,0.04)", textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}>{n.l}</motion.a>
              ))}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: 20 }}>
                <GoldButton href="#contact" label="Request Sample" full />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
