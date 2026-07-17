"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { expandedData, type FAQItem } from "@/data/productExpandedData";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Section Wrapper ── */
function ContentSection({
  id,
  title,
  icon,
  children,
  index,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
      style={{
        background: "#221E19",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: `2px solid rgba(201,145,58,0.25)`,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {icon}
        <h3
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(20px, 2.5vw, 26px)",
            color: "#F0E8D8",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

/* ── Bullet List ── */
function BulletList({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: G,
              flexShrink: 0,
              marginTop: 7,
              opacity: 0.7,
            }}
          />
          <span
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── FAQ Accordion ── */
function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {items.map((faq, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            aria-expanded={openIdx === i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "16px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: openIdx === i ? "#F0E8D8" : "#8A7E70",
                fontFamily: "var(--font-dm-sans)",
                transition: "color 0.2s",
                flex: 1,
              }}
            >
              {faq.q}
            </span>
            <motion.span
              animate={{ rotate: openIdx === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 11,
                color: openIdx === i ? G : "#6A5F54",
                flexShrink: 0,
              }}
            >
              ▼
            </motion.span>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ overflow: "hidden" }}
              >
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "#8A7E70",
                    fontFamily: "var(--font-dm-sans)",
                    margin: 0,
                    padding: "0 0 16px 20px",
                    borderLeft: `2px solid rgba(201,145,58,0.2)`,
                  }}
                >
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ── Stage Timeline ── */
function StageTimeline({ stages }: { stages: { stage: string; duration: string; detail: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {stages.map((s, i) => (
        <div
          key={s.stage}
          style={{
            display: "flex",
            gap: 16,
            padding: "14px 0",
            borderBottom: i < stages.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: `1.5px solid rgba(201,145,58,0.4)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontWeight: 800,
                fontSize: 11,
                color: G,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#F0E8D8",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {s.stage}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: G,
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 600,
                  padding: "3px 10px",
                  border: "1px solid rgba(201,145,58,0.15)",
                  background: "rgba(201,145,58,0.04)",
                  whiteSpace: "nowrap",
                }}
              >
                {s.duration}
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: "#6A5F54",
                fontFamily: "var(--font-dm-sans)",
                margin: "4px 0 0",
              }}
            >
              {s.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Gold CTA ── */
function GoldCTA({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = React.useState(false);
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: hov ? GL : G,
        scale: hov ? 1.03 : 1,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.22 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 32px",
        textDecoration: "none",
        cursor: "pointer",
        color: "#1A1612",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.04em",
        fontFamily: "var(--font-dm-sans)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.span
        animate={{ x: hov ? "350%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "35%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          transform: "skewX(-20deg)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </motion.a>
  );
}

/* ══════════ MAIN COMPONENT ══════════ */
export default function ProductExpandedContent({ productId }: { productId: string }) {
  const data = expandedData[productId];
  if (!data) return null;

  /* SVG icons for each section */
  const icons = {
    design: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
    fabric: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeOpacity="0.5" />
      </svg>
    ),
    branding: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    privateLabel: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    packaging: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
    moq: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    leadTime: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
    sample: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" /><path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    faq: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" strokeLinecap="round" /><line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <div style={{ marginTop: 80 }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ marginBottom: 32 }}
      >
        <div style={{ width: 48, height: 2, background: G, marginBottom: 16 }} />
        <h2
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 900,
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "#F0E8D8",
            margin: "0 0 8px",
          }}
        >
          Complete Product Details
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
            margin: 0,
          }}
        >
          Everything you need to know before starting your project.
        </p>
      </motion.div>

      {/* Grid of content sections */}
      <style>{`
        .pec-grid { grid-template-columns: 1fr; gap: 16px; }
        @media(min-width: 768px) { .pec-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>

      <div className="pec-grid" style={{ display: "grid" }}>
        {/* Design Options */}
        <ContentSection id="design-options" title={data.designOptions.title} icon={icons.design} index={0}>
          <BulletList items={data.designOptions.items} />
        </ContentSection>

        {/* Fabric Options */}
        <ContentSection id="fabric-options" title={data.fabricOptions.title} icon={icons.fabric} index={1}>
          <BulletList items={data.fabricOptions.items} />
        </ContentSection>

        {/* Branding Methods */}
        <ContentSection id="branding-methods" title={data.brandingMethods.title} icon={icons.branding} index={2}>
          <BulletList items={data.brandingMethods.items} />
        </ContentSection>

        {/* Private Label */}
        <ContentSection id="private-label" title={data.privateLabel.title} icon={icons.privateLabel} index={3}>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
              margin: 0,
              borderLeft: `2px solid rgba(201,145,58,0.2)`,
              paddingLeft: 16,
            }}
          >
            {data.privateLabel.description}
          </p>
          <BulletList items={data.privateLabel.features} />
        </ContentSection>

        {/* Packaging */}
        <ContentSection id="packaging" title={data.packaging.title} icon={icons.packaging} index={4}>
          <BulletList items={data.packaging.items} />
        </ContentSection>

        {/* MOQ Details */}
        <ContentSection id="moq-details" title={data.moqDetails.title} icon={icons.moq} index={5}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {data.moqDetails.tiers.map((tier) => (
              <div
                key={tier.range}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: G,
                    fontFamily: "var(--font-barlow-condensed)",
                    whiteSpace: "nowrap",
                    minWidth: 100,
                  }}
                >
                  {tier.range}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "#8A7E70",
                    fontFamily: "var(--font-dm-sans)",
                    textAlign: "right",
                  }}
                >
                  {tier.note}
                </span>
              </div>
            ))}
          </div>
        </ContentSection>
      </div>

      {/* Full-width sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
        {/* Lead Time */}
        <ContentSection id="lead-time" title="Lead Time" icon={icons.leadTime} index={6}>
          <StageTimeline stages={data.leadTime.stages} />
        </ContentSection>

        {/* Sample Process */}
        <ContentSection id="sample-process" title={data.sampleProcess.title} icon={icons.sample} index={7}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.sampleProcess.steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: G,
                    fontFamily: "var(--font-barlow-condensed)",
                    width: 20,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "#8A7E70",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 12,
              color: G,
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 600,
              padding: "10px 16px",
              background: "rgba(201,145,58,0.04)",
              border: "1px solid rgba(201,145,58,0.12)",
              margin: "8px 0 0",
            }}
          >
            {data.sampleProcess.note}
          </p>
        </ContentSection>

        {/* FAQ */}
        <ContentSection id="faq" title="Frequently Asked Questions" icon={icons.faq} index={8}>
          <FAQAccordion items={data.faq} />
        </ContentSection>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          marginTop: 40,
          padding: "32px 28px",
          background: "#221E19",
          border: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(20px, 3vw, 28px)",
            color: "#F0E8D8",
            margin: 0,
          }}
        >
          Ready to discuss your project?
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
            margin: 0,
            maxWidth: 440,
          }}
        >
          Share your brief and we&apos;ll return a production-ready specification
          within 48 hours.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <GoldCTA href="/contact" label="Request a Sample" />
          <GoldCTA href="/customize" label="Open Customiser →" />
        </div>
      </motion.div>
    </div>
  );
}
