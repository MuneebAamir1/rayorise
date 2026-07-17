"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const EASE = [0.16, 1, 0.3, 1] as const;

interface Section {
  heading: string; 
  content: React.ReactNode;
}

function AccordionItem({ section, index }: { section: Section; index: number }) {
  const [open, setOpen] = useState(false);

  const pStyle: React.CSSProperties = {
    fontSize: 15,
    lineHeight: 1.8,
    color: "#8A7E70",
    fontFamily: "var(--font-dm-sans)",
    margin: "0 0 16px",
  };

  const linkStyle: React.CSSProperties = {
    color: G,
    textDecoration: "underline",
    textDecorationColor: "rgba(201,145,58,0.3)",
    textUnderlineOffset: "3px",
    transition: "text-decoration-color 0.2s",
  };

  return (
    <div
      data-seo-item=""
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: 0,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "24px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: G,
              fontFamily: "var(--font-barlow-condensed)",
              width: 28,
              flexShrink: 0,
            }}
          >
            0{index + 1}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 700,
              fontSize: "clamp(18px, 2.5vw, 24px)",
              color: open ? "#F0E8D8" : "#8A7E70",
              margin: 0,
              transition: "color 0.3s",
            }}
          >
            {section.heading}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontSize: 14,
            color: open ? G : "#6A5F54",
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingLeft: 44, paddingBottom: 32 }}>
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SEOContentBlock() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const goldLine = sectionRef.current!.querySelector<HTMLElement>("[data-gold-line]");
      if (goldLine) {
        gsap.fromTo(goldLine, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      const headEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-seo-head]");
      gsap.fromTo(headEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: headEls[0], start: "top 85%", toggleActions: "play none none none" },
      });

      const items = sectionRef.current!.querySelectorAll<HTMLElement>("[data-seo-item]");
      gsap.fromTo(items, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: items[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const pStyle: React.CSSProperties = {
    fontSize: 15,
    lineHeight: 1.8,
    color: "#8A7E70",
    fontFamily: "var(--font-dm-sans)",
    margin: "0 0 16px",
  };

  const linkStyle: React.CSSProperties = {
    color: G,
    textDecoration: "underline",
    textDecorationColor: "rgba(201,145,58,0.3)",
    textUnderlineOffset: "3px",
    transition: "text-decoration-color 0.2s",
  };

  const sections: Section[] = [
    {
      heading: "A Vertically Integrated Textile Ecosystem",
      content: (
        <>
          <p style={pStyle}>
            Unlike manufacturing hubs that rely on imported raw materials, Pakistan
            controls the full production chain — from cotton farming and spinning to
            weaving, dyeing, and garment construction. This vertical integration
            translates directly into shorter lead times, better quality control, and
            more competitive pricing for B2B buyers. When you source custom{" "}
            <Link href="/products/track-jackets" style={linkStyle}>track jackets</Link>{" "}
            or{" "}
            <Link href="/products/track-pants" style={linkStyle}>track pants</Link>{" "}
            from Pakistan, you benefit from an ecosystem where fabric, hardware, and
            construction expertise sit within the same supply corridor.
          </p>
          <p style={pStyle}>
            For RayoRise, this means we source premium French Terry, Tricot, and
            cotton-blend fleece fabrics directly from trusted mills — without the
            delays and markups of third-party fabric importers. The result is a faster,
            more transparent production pipeline from your approved sample through to
            final dispatch.
          </p>
        </>
      ),
    },
    {
      heading: "Fabric Expertise: French Terry, Tricot & Fleece",
      content: (
        <>
          <p style={pStyle}>
            Pakistan is globally recognised for its cotton production — the
            country is among the top five cotton producers worldwide. This heritage
            feeds directly into the quality of the knitted and woven fabrics used in
            tracksuit manufacturing. Premium heavyweight French Terry (280gsm–350gsm),
            classic polyester Tricot for retro panel styling, and brushed-back fleece
            for cold-weather collections are all readily available from established
            textile mills with decades of export experience.
          </p>
          <p style={pStyle}>
            At RayoRise, we work closely with a curated group of fabric suppliers who
            understand the weight, drape, and hand-feel requirements of UK streetwear
            and football-culture brands. Every fabric is tested for shrinkage,
            colourfastness, and pilling resistance before it enters production.
          </p>
        </>
      ),
    },
    {
      heading: "Export Readiness and Quality Compliance",
      content: (
        <>
          <p style={pStyle}>
            Pakistan&apos;s garment manufacturing sector has invested heavily in
            international quality certifications and compliance frameworks. Factories
            operating at the export level routinely hold certifications including
            OEKO-TEX Standard 100, BSCI, WRAP, and ISO 9001. These standards ensure
            that garments produced for international markets meet rigorous requirements
            for safety, ethical labour practices, and production consistency.
          </p>
          <p style={pStyle}>
            RayoRise operates within this export-ready infrastructure, ensuring that
            every{" "}
            <Link href="/products/tracksuits" style={linkStyle}>custom tracksuit set</Link>{" "}
            we produce is compliant with international quality and safety standards.
            Whether you&apos;re shipping to UK retail, European distributors, or US
            wholesale accounts, our production meets the documentation and labelling
            requirements your supply chain demands.
          </p>
        </>
      ),
    },
    {
      heading: "Cut-and-Sew Expertise for Custom Apparel",
      content: (
        <>
          <p style={pStyle}>
            Pakistan has a deep tradition of cut-and-sew manufacturing — the
            construction method used for all custom panel tracksuits. Unlike print-on-demand
            or decorated blanks, cut-and-sew production builds garments from individual
            fabric panels, allowing for fully custom silhouettes, contrast colour blocking,
            and unique construction details like panel stripes, piping, and custom hardware.
          </p>
          <p style={pStyle}>
            This is the manufacturing approach RayoRise specialises in. Every garment
            we produce is built from pattern to finished product — there are no blanks,
            no decorated basics, and no off-the-shelf templates. Your{" "}
            <Link href="/about" style={linkStyle}>design specification</Link>{" "}
            determines the panel geometry, the colour mapping, the fabric weight, and
            the branding placement. That level of customisation is only possible
            through genuine cut-and-sew manufacturing.
          </p>
        </>
      ),
    },
    {
      heading: "RayoRise: Your Manufacturing Partner in Pakistan",
      content: (
        <>
          <p style={pStyle}>
            RayoRise was founded to bridge the gap between Pakistan&apos;s world-class
            textile manufacturing capabilities and the specific needs of UK and
            international streetwear brands. We are not a marketplace or a trading
            company. We are a specialist tracksuit manufacturer — we own the
            production process, we manage quality control in-house, and we provide
            direct communication with a dedicated account manager throughout your
            project.
          </p>
          <p style={pStyle}>
            Our position within Pakistan&apos;s textile ecosystem means you get the
            production quality of a tier-one manufacturer with the personal service of
            a brand partner. From your initial brief to tracked dispatch, we manage
            every step — so you can focus on building your brand.
          </p>
          <p style={pStyle}>
            Ready to start your project?{" "}
            <Link href="/contact" style={linkStyle}>Request a sample</Link>{" "}
            and experience the quality firsthand. Samples are typically delivered
            within 7–10 working days.
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-pakistan"
      style={{
        width: "100%",
        background: "#1A1612",
        padding: "112px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        data-gold-line=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`,
          transformOrigin: "left",
          transform: "scaleX(0)",
        }}
      />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <p
          data-seo-head=""
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(212,255,43,0.5)",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 600,
            margin: "0 0 16px",
            opacity: 0,
          }}
        >
          05 — Our Manufacturing Heritage
        </p>
        <h2
          data-seo-head=""
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 800,
            fontSize: "clamp(28px, 4.5vw, 48px)",
            lineHeight: 1.1,
            color: "#F0E8D8",
            margin: "0 0 16px",
            opacity: 0,
          }}
        >
          Why Pakistan for Premium Custom{" "}
          <span style={{ color: G }}>Apparel Manufacturing</span>
        </h2>
        <p
          data-seo-head=""
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#8A7E70",
            fontFamily: "var(--font-dm-sans)",
            maxWidth: 600,
            margin: "0 0 40px",
            opacity: 0,
          }}
        >
          Pakistan is one of the world&apos;s largest textile-producing nations,
          responsible for supplying cotton, woven fabrics, and finished garments to
          global brands across Europe, North America, and the Middle East.
        </p>

        {/* Accordion sections */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {sections.map((section, i) => (
            <AccordionItem key={section.heading} section={section} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
