"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const G = "#C9913A";
const EASE = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "What products does RayoRise manufacture?",
    a: "We specialise in private-label football-inspired tracksuits — including panel tracksuits, retro jackets, track pants and full two-piece sets. We also manufacture custom sportswear such as training tops, shorts and base layers for brands that want consistent quality across their full apparel range.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "Our MOQ starts from 50 units per design. This makes us a practical partner for startups launching their first collection as well as established brands scaling production. We can also discuss lower quantities for sampling or colour-test runs.",
  },
  {
    q: "Can I manufacture under my own brand?",
    a: "Yes — private label manufacturing is our core service. We produce finished goods with your brand labels, custom packaging and branded trims. You retain full control over your brand identity while we handle the production.",
  },
  {
    q: "Do you provide samples before bulk production?",
    a: "Absolutely. Sampling is a standard part of our process. After design approval, we produce proto samples for fit and finish review, then sealed samples that become the benchmark for bulk production. Sampling typically takes 7–10 days.",
  },
  {
    q: "Which branding methods are available?",
    a: "We offer several professional branding methods — woven labels, silicone and rubber badges, screen-printed logos, embroidered crests, heat-transfer branding and custom hang tags. Each method is suited to different fabric types and budget requirements.",
  },
  {
    q: "Which fabrics can I choose from?",
    a: "Our standard range includes polyester-cotton blends, performance knit fabrics, double-knit jersey, brushed fleece, mesh linings and ribbed cuffs. We can also source specific custom fabrics for larger production runs if your collection requires a unique hand feel or technical property.",
  },
  {
    q: "What customisation options are available?",
    a: "Full-panel customisation — including custom colours, pattern engineering, contrast piping, vintage-style appliqué patches, custom zippers and drawcords, interior pocket configurations and bespoke labelling. You control every detail of the design.",
  },
  {
    q: "How long does production take?",
    a: "Sampling takes 7–10 days. Once samples are approved, bulk production takes 3–5 weeks depending on order volume and complexity. We provide a confirmed production schedule before any order begins.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we export worldwide. Our logistics team handles all shipping documentation, customs clearance and door-to-door delivery. We ship via air freight for smaller orders and sea freight for bulk shipments to keep costs efficient.",
  },
  {
    q: "How do you maintain product quality?",
    a: "We follow a multi-stage quality control process — inline inspection during production, final random inspection before packing, and a pre-shipment quality check. Each garment is checked for stitching, fit, colour accuracy, branding placement and overall finish.",
  },
  {
    q: "What is the difference between OEM and private label?",
    a: "OEM (Original Equipment Manufacturing) means you provide the technical specs and we manufacture to your exact requirements. Private label means we handle design development based on your brief and produce finished goods under your brand. Both models are available depending on your level of design involvement.",
  },
  {
    q: "What information is required before requesting a quote?",
    a: "To provide an accurate quote, we need — product type and quantity, fabric preference or colour reference, any branding requirements, your target delivery timeline and reference images or sketches if available. Our team will guide you through the rest.",
  },
];

const staggerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Split FAQs into two columns
  const mid = Math.ceil(faqs.length / 2);
  const leftCol = faqs.slice(0, mid);
  const rightCol = faqs.slice(mid);

  return (
    <section
      id="faq"
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
          background: "radial-gradient(circle at right, rgba(201,145,58,0.07) 0%, transparent 40%), radial-gradient(circle at bottom left, rgba(255,255,255,0.03) 0%, transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 26%)",
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
      <div style={{ position: "absolute", top: 100, left: 10, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,145,58,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 40, right: 60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,145,58,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        {/* ── Section Header ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{ marginBottom: 56, maxWidth: 640 }}
        >
          <motion.p variants={fadeUp} style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: G, fontFamily: "var(--font-dm-sans)" }}>
            FAQ
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ margin: 0, fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 0.92, color: "#F0E8D8" }}>
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={fadeUp} style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.75, color: "#C8BFA8", fontFamily: "var(--font-dm-sans)" }}>
            Common questions about private-label sportswear manufacturing, customisation, product development, sampling and bulk production.
          </motion.p>
        </motion.div>

        {/* ── Two-Column Accordion ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "0 32px",
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {leftCol.map((faq, i) => (
              <FaqItem
                key={i}
                id={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openId === i}
                onToggle={toggle}
              />
            ))}
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rightCol.map((faq, i) => {
              const id = mid + i;
              return (
                <FaqItem
                  key={id}
                  id={id}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openId === id}
                  onToggle={toggle}
                />
              );
            })}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{
            marginTop: 56,
            textAlign: "center",
          }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: "inline-block",
              padding: "32px 48px",
              borderRadius: 24,
              border: "1px solid rgba(201,145,58,0.12)",
              background: "rgba(34,30,25,0.5)",
              maxWidth: 600,
            }}
          >
            <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", color: "#C8BFA8", fontFamily: "var(--font-dm-sans)" }}>
              Still have questions?
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>
              Our team can answer specific questions about your collection, MOQ, pricing and timeline.
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 18,
                padding: "12px 32px",
                borderRadius: 100,
                border: "1px solid rgba(201,145,58,0.25)",
                background: "linear-gradient(180deg, rgba(201,145,58,0.15) 0%, rgba(201,145,58,0.06) 100%)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#F4D08E",
                fontFamily: "var(--font-dm-sans)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              className="faq-cta"
            >
              Contact our team
              <span style={{ fontSize: 16 }}>→</span>
            </a>
          </motion.div>

          <style>{`
            .faq-cta:hover { background: linear-gradient(180deg, rgba(201,145,58,0.22) 0%, rgba(201,145,58,0.1) 100%); border-color: rgba(201,145,58,0.4); transform: translateY(-2px); }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (id: number) => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
      }}
      style={{
        borderRadius: 16,
        border: `1px solid ${isOpen ? "rgba(201,145,58,0.25)" : "rgba(255,255,255,0.05)"}`,
        background: isOpen ? "rgba(34,30,25,0.8)" : "rgba(34,30,25,0.4)",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Question Button */}
      <button
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        id={`faq-trigger-${id}`}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px 22px",
          border: "none",
          background: "none",
          cursor: "pointer",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1.4,
          color: isOpen ? "#F0E8D8" : "#B9AB97",
          textAlign: "left",
          transition: "color 0.25s ease",
        }}
        className="faq-trigger"
      >
        <span>{question}</span>

        {/* Icon: plus / minus */}
        <span
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: 8,
            border: `1px solid ${isOpen ? "rgba(201,145,58,0.3)" : "rgba(255,255,255,0.08)"}`,
            background: isOpen ? "rgba(201,145,58,0.08)" : "transparent",
            fontSize: 14,
            fontWeight: 400,
            color: isOpen ? G : "#6A5E50",
            transition: "all 0.3s ease",
          }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            +
          </motion.span>
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`answer-${id}`}
            id={`faq-answer-${id}`}
            role="region"
            aria-labelledby={`faq-trigger-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 22px 20px",
                fontSize: 14,
                lineHeight: 1.75,
                color: "#8A7E70",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .faq-trigger:hover { color: #F0E8D8; }
        .faq-trigger:focus-visible { outline: 2px solid ${G}; outline-offset: -2px; border-radius: 16px; }
      `}</style>
    </motion.div>
  );
}