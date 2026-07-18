"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Share Your Requirements",
    summary: "Send your product type, design references, logo files and fabric preferences.",
    detail:
      "You provide product type, reference images, branding assets, colour specifications, fabric preferences, target quantity and any special requirements. This information helps our team evaluate the project and recommend the best manufacturing solution before any commitment.",
    outcome: "Project scope defined. Ready for technical consultation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M4 4h16v12H8l-4 4V4Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 9h8M8 13h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Consultation & Quotation",
    summary: "Our team reviews your requirements and provides a detailed production quote.",
    detail:
      "We review your requirements, conduct a technical feasibility assessment, recommend suitable materials and construction methods, discuss MOQ and pricing, and provide a detailed quotation with estimated production timeline. This stage ensures complete alignment before any work begins.",
    outcome: "Quotation confirmed. Materials and methods agreed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M9 12h6M12 9v6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Sample Development",
    summary: "We create physical samples for fit, finish and material approval.",
    detail:
      "Our development team creates patterns, sources approved materials, produces proto samples and conducts fit testing. You review branding placement, material quality and overall construction. Any revisions are completed here — bulk production starts only after you approve the sealed sample.",
    outcome: "Sealed sample approved. Bulk production authorised.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15h6M9 11h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Production Approval",
    summary: "You confirm all specifications before bulk manufacturing begins.",
    detail:
      "Before production starts, you sign off on sample approval, colour confirmation, branding placement, size specifications, packaging format and final quantity. We lock in the production schedule and provide a confirmed delivery window based on your order volume.",
    outcome: "All specs locked. Production scheduled.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Bulk Manufacturing",
    summary: "Full-scale production with in-process quality checks at every stage.",
    detail:
      "Fabric inspection, precision cutting, panel construction, expert sewing, branding application and garment assembly are managed as one controlled workflow. In-process quality checks monitor stitching, fit consistency and construction standards to maintain accuracy across the entire run.",
    outcome: "Production completed. Moving to quality assurance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8h6M9 12h6M9 16h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Quality Assurance",
    summary: "Every garment is inspected before packing and dispatch.",
    detail:
      "We conduct measurement verification, stitch inspection, fabric quality checks, branding accuracy verification, construction review and final finishing assessment. Only approved products move to packing. This multi-stage QC process ensures every shipment meets your specifications.",
    outcome: "QC passed. Ready for packing and export.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4 12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "07",
    title: "Packing & Worldwide Delivery",
    summary: "Orders are packed, documented and shipped to your destination.",
    detail:
      "Individual garment packing, carton packing with proper labelling, shipping marks according to your requirements, export documentation preparation and shipment coordination are handled end-to-end. We work with trusted freight partners to deliver your order on time, anywhere in the world.",
    outcome: "Shipped. Tracking provided. Order complete.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" strokeLinecap="round" strokeLinejoin="round" />
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

export default function Process() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <section
      id="process"
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
          background: "radial-gradient(circle at top, rgba(201,145,58,0.08) 0%, transparent 35%), radial-gradient(circle at bottom left, rgba(255,255,255,0.03) 0%, transparent 25%), linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 26%)",
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
      <div style={{ position: "absolute", top: 60, left: 60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,145,58,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 120, right: 30, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,145,58,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
        {/* ── Section Header ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{ marginBottom: 56, textAlign: "center" }}
        >
          <motion.p variants={fadeUp} style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: G, fontFamily: "var(--font-dm-sans)" }}>
            How it works
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ margin: 0, fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 0.92, color: "#F0E8D8" }}>
            From brief to delivery
          </motion.h2>
          <motion.p variants={fadeUp} style={{ margin: "20px auto 0", fontSize: 16, lineHeight: 1.75, color: "#C8BFA8", fontFamily: "var(--font-dm-sans)", maxWidth: 600 }}>
            Every order follows a structured workflow to keep communication clear, approvals explicit and quality consistent from enquiry to shipment.
          </motion.p>
        </motion.div>

        {/* ── Steps Accordion ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          {steps.map((step, i) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={i}
              isOpen={openStep === i}
              onToggle={() => setOpenStep(openStep === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* ── Bottom Stats ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{
            marginTop: 48,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {[
            { label: "Total Steps", value: "7" },
            { label: "Avg. Timeline", value: "4–6 Weeks" },
            { label: "Approval Gates", value: "3" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              style={{
                padding: "14px 28px",
                borderRadius: 16,
                border: "1px solid rgba(201,145,58,0.08)",
                background: "rgba(34,30,25,0.5)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 900, color: "#F0E8D8", fontFamily: "var(--font-barlow-condensed)", lineHeight: 1.2 }}>{s.value}</div>
              <div style={{ marginTop: 2, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Accordion Step ─── */
function ProcessStep({
  step,
  index,
  isOpen,
  onToggle,
}: {
  step: (typeof steps)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
      style={{
        borderRadius: 20,
        border: `1px solid ${isOpen ? "rgba(201,145,58,0.25)" : "rgba(255,255,255,0.05)"}`,
        background: isOpen
          ? "linear-gradient(180deg, rgba(34,30,25,0.95) 0%, rgba(34,30,25,0.85) 100%)"
          : "rgba(34,30,25,0.4)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: isOpen ? "0 0 0 1px rgba(201,145,58,0.12), 0 12px 40px rgba(0,0,0,0.2)" : "none",
      }}
    >
      {/* Header / Trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`process-step-${index}`}
        id={`process-trigger-${index}`}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "22px 26px",
          border: "none",
          background: "none",
          cursor: "pointer",
          fontFamily: "var(--font-dm-sans)",
          textAlign: "left",
          color: isOpen ? "#F0E8D8" : "#B9AB97",
          transition: "color 0.25s ease",
        }}
        className="process-trigger"
      >
        {/* Step Number */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: 14,
            border: `1px solid ${isOpen ? "rgba(201,145,58,0.3)" : "rgba(255,255,255,0.06)"}`,
            background: isOpen ? "rgba(201,145,58,0.1)" : "rgba(23,18,14,0.5)",
            flexShrink: 0,
            transition: "all 0.3s ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 900,
              fontSize: 16,
              color: isOpen ? G : "#6A5E50",
              transition: "color 0.3s ease",
            }}
          >
            {step.number}
          </span>
        </div>

        {/* Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 12,
            background: isOpen ? "rgba(201,145,58,0.08)" : "rgba(23,18,14,0.5)",
            color: isOpen ? G : "#6A5E50",
            flexShrink: 0,
            transition: "all 0.3s ease",
          }}
        >
          {step.icon}
        </div>

        {/* Title + Summary */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 900,
              fontSize: 20,
              lineHeight: 1.15,
              color: isOpen ? "#F0E8D8" : "#D5C7B3",
              transition: "color 0.3s ease",
            }}
          >
            {step.title}
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 13,
              lineHeight: 1.5,
              color: "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
              display: isOpen ? "none" : "block",
            }}
          >
            {step.summary}
          </div>
        </div>

        {/* Expand Icon */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 8,
            border: `1px solid ${isOpen ? "rgba(201,145,58,0.25)" : "rgba(255,255,255,0.06)"}`,
            background: isOpen ? "rgba(201,145,58,0.06)" : "transparent",
            fontSize: 16,
            fontWeight: 300,
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
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`content-${index}`}
            id={`process-step-${index}`}
            role="region"
            aria-labelledby={`process-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 26px 24px" }}>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {/* Detail */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: "#B9AB97",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {step.detail}
                </p>

                {/* Outcome */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 12,
                    border: "1px solid rgba(201,145,58,0.1)",
                    background: "rgba(23,18,14,0.6)",
                    alignSelf: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A5E50", fontFamily: "var(--font-dm-sans)" }}>
                    Outcome
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#E7C27E", fontFamily: "var(--font-dm-sans)" }}>
                    {step.outcome}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .process-trigger:hover { color: #F0E8D8; }
        .process-trigger:focus-visible { outline: 2px solid ${G}; outline-offset: -2px; border-radius: 20px; }
      `}</style>
    </motion.div>
  );
}