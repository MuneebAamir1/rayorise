"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import TrackSuitSVG from "./TrackSuitSVG";

const G = "#C8102E";
const GL = "#E63946";

/* ── Types ── */
interface LogoConfig {
  dataUrl: string | null;
  position: "chest" | "left-sleeve" | "right-sleeve" | "pants";
  scale: number;
}

interface Config {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
  goldDetails: boolean;
  design: "classic" | "retro" | "minimal" | "bold";
  fabric: "matte" | "gloss" | "nylon";
  size: string;
  logo: LogoConfig;
}

const defaultConfig: Config = {
  baseColor: "#0D0D0D",
  secondaryColor: "#F5F0E8",
  accentColor: "#1E4D8C",
  goldDetails: true,
  design: "classic",
  fabric: "matte",
  size: "M",
  logo: { dataUrl: null, position: "chest", scale: 1 },
};

const BASE_COLORS = [
  { label: "Black", hex: "#0D0D0D" },
  { label: "Navy", hex: "#1B2838" },
  { label: "Charcoal", hex: "#2D2D2D" },
  { label: "Forest", hex: "#1A2E1A" },
  { label: "Burgundy", hex: "#4A0E1E" },
  { label: "White", hex: "#F5F0E8" },
];
const SECONDARY_COLORS = [
  { label: "White", hex: "#F5F0E8" },
  { label: "Light Grey", hex: "#C0C0C0" },
  { label: "Cream", hex: "#E8E0D0" },
  { label: "Gold", hex: "#C8102E" },
  { label: "Black", hex: "#0D0D0D" },
];
const ACCENT_COLORS = [
  { label: "Blue", hex: "#1E4D8C" },
  { label: "Red", hex: "#C41E3A" },
  { label: "Gold", hex: "#C8102E" },
  { label: "White", hex: "#F5F0E8" },
  { label: "Emerald", hex: "#2E6B4A" },
];
const DESIGNS: { id: Config["design"]; label: string; desc: string }[] = [
  { id: "classic", label: "Classic", desc: "Standard side stripe" },
  { id: "retro", label: "Retro Triple", desc: "Triple-line detail" },
  { id: "minimal", label: "Minimal", desc: "No side panels" },
  { id: "bold", label: "Bold Panel", desc: "Wide panel stripe" },
];
const FABRICS: { id: Config["fabric"]; label: string; desc: string }[] = [
  { id: "matte", label: "Matte Polyester", desc: "Soft hand-feel, no sheen" },
  { id: "gloss", label: "Gloss Polyester", desc: "Subtle shine finish" },
  { id: "nylon", label: "Windbreaker Nylon", desc: "Lightweight, water-resistant" },
];
const SIZES = ["S", "M", "L", "XL"];
const LOGO_POSITIONS: { id: LogoConfig["position"]; label: string }[] = [
  { id: "chest", label: "Chest" },
  { id: "left-sleeve", label: "Left Sleeve" },
  { id: "right-sleeve", label: "Right Sleeve" },
  { id: "pants", label: "Pants" },
];

/* ── Collapsible Section ── */
function Section({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 0", background: "none", border: "none", cursor: "pointer", color: "#F5F0E8",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans)" }}>
          {title}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: G, fontSize: 14 }}>
          ▾
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: 20 }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Color Swatch ── */
function Swatch({ hex, label, active, onClick }: { hex: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        width: 36, height: 36, borderRadius: "50%", border: active ? `2px solid ${G}` : "2px solid rgba(255,255,255,0.1)",
        background: hex, cursor: "pointer", transition: "border-color 0.2s, transform 0.2s",
        transform: active ? "scale(1.15)" : "scale(1)",
        boxShadow: active ? `0 0 12px ${hex}44` : "none",
      }}
    />
  );
}

/* ── Logo position indicators on preview ── */
const LOGO_POS_MAP: Record<LogoConfig["position"], { top: string; left: string; w: number; h: number }> = {
  chest: { top: "17%", left: "40%", w: 70, h: 50 },
  "left-sleeve": { top: "16%", left: "10%", w: 45, h: 40 },
  "right-sleeve": { top: "16%", left: "78%", w: 45, h: 40 },
  pants: { top: "58%", left: "40%", w: 65, h: 50 },
};

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
export default function CustomizerPage() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [cartAdded, setCartAdded] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = useCallback(<K extends keyof Config>(key: K, val: Config[K]) => {
    setConfig((p) => ({ ...p, [key]: val }));
  }, []);

  const setLogo = useCallback(<K extends keyof LogoConfig>(key: K, val: LogoConfig[K]) => {
    setConfig((p) => ({ ...p, logo: { ...p.logo, [key]: val } }));
  }, []);

  const resetDesign = useCallback(() => {
    if (confirm("Reset all customizations?")) setConfig(defaultConfig);
  }, []);

  /* Logo upload */
  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogo("dataUrl", ev.target?.result as string);
    reader.readAsDataURL(file);
  }, [setLogo]);

  /* Download as PNG */
  const downloadPreview = useCallback(async () => {
    if (!previewRef.current) return;
    const svgEl = previewRef.current.querySelector("svg");
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1640;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#0D0D0D";
      ctx.fillRect(0, 0, 720, 1640);
      ctx.drawImage(img, 0, 0, 720, 1640);
      /* Draw logo if present */
      if (config.logo.dataUrl) {
        const logoImg = new Image();
        logoImg.onload = () => {
          const pos = LOGO_POS_MAP[config.logo.position];
          const lx = (parseFloat(pos.left) / 100) * 720;
          const ly = (parseFloat(pos.top) / 100) * 1640;
          const lw = pos.w * 2 * config.logo.scale;
          const lh = pos.h * 2 * config.logo.scale;
          ctx.drawImage(logoImg, lx, ly, lw, lh);
          triggerDownload(canvas);
        };
        logoImg.src = config.logo.dataUrl;
      } else {
        triggerDownload(canvas);
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }, [config.logo]);

  const triggerDownload = (canvas: HTMLCanvasElement) => {
    const a = document.createElement("a");
    a.download = "rayorise-custom-tracksuit.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  const addToCart = useCallback(() => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2500);
  }, []);

  const logoPos = LOGO_POS_MAP[config.logo.position];

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0D", color: "#F5F0E8" }}>
      {/* Top bar */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: 20, background: `linear-gradient(130deg, ${G}, ${GL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              RayoRise
            </span>
            <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: 12, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.06em" }}>CUSTOMIZER</span>
          </Link>
          <Link href="/" style={{ fontSize: 12, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", textDecoration: "none", transition: "color 0.2s" }}>
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main layout */}
      <style>{`
        .cust-layout { flex-direction: column; }
        @media(min-width: 900px) { .cust-layout { flex-direction: row !important; } }
      `}</style>
      <div className="cust-layout" style={{ maxWidth: 1440, margin: "0 auto", display: "flex", minHeight: "calc(100vh - 56px)" }}>

        {/* ── LEFT: Preview ── */}
        <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative" }}>
          {/* Checkerboard BG for transparency feel */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "repeating-conic-gradient(#888 0% 25%, transparent 0% 50%)", backgroundSize: "20px 20px" }} />

          <div ref={previewRef} style={{ position: "relative", width: "100%", maxWidth: 380, aspectRatio: "360/820" }}>
            <TrackSuitSVG
              baseColor={config.baseColor}
              secondaryColor={config.secondaryColor}
              accentColor={config.accentColor}
              goldDetails={config.goldDetails}
              design={config.design}
            />
            {/* Logo overlay */}
            {config.logo.dataUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  position: "absolute",
                  top: logoPos.top, left: logoPos.left,
                  width: logoPos.w * config.logo.scale,
                  height: logoPos.h * config.logo.scale,
                  pointerEvents: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={config.logo.dataUrl}
                  alt="Your logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}
                />
              </motion.div>
            )}
          </div>

          {/* Fabric indicator */}
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: G }} />
            <span style={{ fontSize: 11, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {FABRICS.find((f) => f.id === config.fabric)?.label} · Size {config.size}
            </span>
          </div>
        </div>

        {/* ── RIGHT: Configurator Panel ── */}
        <style>{`
          .cust-panel { width: 100%; border-top: 1px solid rgba(255,255,255,0.06); border-left: none; }
          @media(min-width: 900px) { .cust-panel { width: 420px !important; max-width: 420px !important; border-left: 1px solid rgba(255,255,255,0.06) !important; border-top: none !important; } }
        `}</style>
        <div className="cust-panel" style={{ background: "#111111", overflowY: "auto", padding: "0 28px" }}>
          <div style={{ padding: "28px 0 8px" }}>
            <h1 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: 28, margin: "0 0 4px", color: "#F5F0E8" }}>
              Design Your Tracksuit
            </h1>
            <p style={{ fontSize: 13, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
              90&apos;s vintage · Fully customisable
            </p>
          </div>

          {/* ─ Colors ─ */}
          <Section title="Colours" defaultOpen>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <p style={{ fontSize: 11, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Base Colour</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {BASE_COLORS.map((c) => <Swatch key={c.hex} hex={c.hex} label={c.label} active={config.baseColor === c.hex} onClick={() => set("baseColor", c.hex)} />)}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Panel / Stripe</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {SECONDARY_COLORS.map((c) => <Swatch key={c.hex} hex={c.hex} label={c.label} active={config.secondaryColor === c.hex} onClick={() => set("secondaryColor", c.hex)} />)}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Accent Line</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {ACCENT_COLORS.map((c) => <Swatch key={c.hex} hex={c.hex} label={c.label} active={config.accentColor === c.hex} onClick={() => set("accentColor", c.hex)} />)}
                </div>
              </div>
              {/* Gold toggle */}
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div
                  onClick={() => set("goldDetails", !config.goldDetails)}
                  style={{
                    width: 40, height: 22, borderRadius: 11, background: config.goldDetails ? G : "rgba(255,255,255,0.1)",
                    position: "relative", transition: "background 0.2s", cursor: "pointer",
                  }}
                >
                  <motion.div
                    animate={{ x: config.goldDetails ? 20 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2 }}
                  />
                </div>
                <span style={{ fontSize: 12, color: "#ccc", fontFamily: "var(--font-dm-sans)" }}>Gold micro-details</span>
              </label>
            </div>
          </Section>

          {/* ─ Design ─ */}
          <Section title="Design Pattern">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {DESIGNS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => set("design", d.id)}
                  style={{
                    padding: 14, background: config.design === d.id ? "rgba(200,16,46,0.1)" : "#1a1a1a",
                    border: `1.5px solid ${config.design === d.id ? G : "rgba(255,255,255,0.06)"}`,
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#F5F0E8", fontFamily: "var(--font-dm-sans)", margin: "0 0 4px" }}>{d.label}</p>
                  <p style={{ fontSize: 11, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{d.desc}</p>
                </button>
              ))}
            </div>
          </Section>

          {/* ─ Logo ─ */}
          <Section title="Logo Upload">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: "2px dashed rgba(255,255,255,0.1)", padding: 28, textAlign: "center", cursor: "pointer",
                  transition: "border-color 0.2s", background: "#1a1a1a",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = G; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                <input ref={fileInputRef} type="file" accept="image/png,image/svg+xml,image/jpeg" onChange={handleLogoUpload} style={{ display: "none" }} />
                <p style={{ fontSize: 13, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
                  {config.logo.dataUrl ? "✓ Logo uploaded — click to replace" : "Click or drag to upload PNG / SVG"}
                </p>
              </div>

              {config.logo.dataUrl && (
                <>
                  {/* Position */}
                  <div>
                    <p style={{ fontSize: 11, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Placement</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {LOGO_POSITIONS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setLogo("position", p.id)}
                          style={{
                            padding: "8px 14px", fontSize: 12, fontFamily: "var(--font-dm-sans)",
                            background: config.logo.position === p.id ? G : "#1a1a1a",
                            color: config.logo.position === p.id ? "#0D0D0D" : "#ccc",
                            border: `1px solid ${config.logo.position === p.id ? G : "rgba(255,255,255,0.08)"}`,
                            cursor: "pointer", fontWeight: 600, transition: "all 0.2s",
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Scale */}
                  <div>
                    <p style={{ fontSize: 11, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Scale: {Math.round(config.logo.scale * 100)}%
                    </p>
                    <input
                      type="range" min="0.5" max="2" step="0.05" value={config.logo.scale}
                      onChange={(e) => setLogo("scale", parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: G }}
                    />
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => setLogo("dataUrl", null)}
                    style={{ fontSize: 12, color: "#C41E3A", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans)", textAlign: "left", padding: 0 }}
                  >
                    ✕ Remove logo
                  </button>
                </>
              )}
            </div>
          </Section>

          {/* ─ Fabric ─ */}
          <Section title="Fabric / Finish">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FABRICS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => set("fabric", f.id)}
                  style={{
                    padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: config.fabric === f.id ? "rgba(200,16,46,0.08)" : "#1a1a1a",
                    border: `1.5px solid ${config.fabric === f.id ? G : "rgba(255,255,255,0.06)"}`,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F0E8", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{f.label}</p>
                    <p style={{ fontSize: 11, color: "#4A4A4A", fontFamily: "var(--font-dm-sans)", margin: 0 }}>{f.desc}</p>
                  </div>
                  {config.fabric === f.id && <span style={{ color: G, fontSize: 16 }}>✓</span>}
                </button>
              ))}
            </div>
          </Section>

          {/* ─ Size ─ */}
          <Section title="Size">
            <div style={{ display: "flex", gap: 10 }}>
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => set("size", s)}
                  style={{
                    width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, fontFamily: "var(--font-dm-sans)",
                    background: config.size === s ? G : "#1a1a1a",
                    color: config.size === s ? "#0D0D0D" : "#ccc",
                    border: `1.5px solid ${config.size === s ? G : "rgba(255,255,255,0.06)"}`,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </Section>

          {/* ─ Actions ─ */}
          <div style={{ padding: "28px 0 40px", display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Add to Cart */}
            <motion.button
              onClick={addToCart}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%", padding: "16px 0", background: cartAdded ? "#25D366" : G, border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", color: "#0D0D0D",
                fontFamily: "var(--font-dm-sans)", transition: "background 0.3s",
              }}
            >
              {cartAdded ? "✓ Added to Cart" : "Add to Cart"}
            </motion.button>

            {/* Download */}
            <button
              onClick={downloadPreview}
              style={{
                width: "100%", padding: "14px 0", background: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 600, color: G, fontFamily: "var(--font-dm-sans)",
                border: `1.5px solid ${G}`, transition: "all 0.2s",
              }}
            >
              ↓ Download Preview PNG
            </button>

            {/* Reset */}
            <button
              onClick={resetDesign}
              style={{
                width: "100%", padding: "12px 0", background: "none", border: "none", cursor: "pointer",
                fontSize: 12, color: "#3A3A3A", fontFamily: "var(--font-dm-sans)", textDecoration: "underline",
              }}
            >
              Reset all customizations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
