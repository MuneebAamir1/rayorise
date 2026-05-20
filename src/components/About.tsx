"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const EASE = [0.16, 1, 0.3, 1] as const;

const credentials = [
  {
    title: "Specialism",
    body: "Tracksuits only — jacket, pants, and sets. Nothing else. That focus means deeper expertise in every detail.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Who we serve",
    body: "UK streetwear brands, 90s football culture labels, and independent designers with serious production requirements.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Why reliable",
    body: "Consistent lead times, clear communication, and samples before production — every time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const bodyLines = [
  "RayoRise is a specialist tracksuit manufacturer serving UK streetwear brands",
  "and football culture labels. We don't make hoodies, jerseys, or anything else —",
  "only tracksuits. That focus means every stitch, every panel, every delivery",
  "reflects years of refinement.",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  /* GSAP ScrollTrigger animations */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const goldLine = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");
    const image = sectionRef.current.querySelector<HTMLElement>("[data-about-image]");
    const goldBar = sectionRef.current.querySelector<HTMLElement>("[data-gold-bar]");
    const heading = sectionRef.current.querySelector<HTMLElement>("[data-heading]");
    const lines = sectionRef.current.querySelectorAll<HTMLElement>("[data-body-line]");
    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-cred-card]");

    /* Gold top line wipe */
    if (goldLine) {
      gsap.fromTo(goldLine, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }

    /* Image parallax */
    if (image) {
      gsap.fromTo(image, { y: 40, scale: 0.96, opacity: 0 }, {
        y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: image, start: "top 85%", toggleActions: "play none none none" },
      });
    }

    /* Gold left bar grow */
    if (goldBar) {
      gsap.fromTo(goldBar, { scaleY: 0 }, {
        scaleY: 1, duration: 0.8, ease: "power2.out", delay: 0.3,
        scrollTrigger: { trigger: goldBar, start: "top 85%", toggleActions: "play none none none" },
      });
    }

    /* Heading */
    if (heading) {
      gsap.fromTo(heading, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      });
    }

    /* Body lines clip reveal */
    lines.forEach((line, i) => {
      gsap.fromTo(line,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1,
          duration: 0.7, ease: "power2.out", delay: i * 0.07,
          scrollTrigger: { trigger: line, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    });

    /* Credential cards stagger */
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.65, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
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
      id="about"
      style={{ width: "100%", background: "#221E19", padding: "96px 0 112px", position: "relative" }}
    >
      {/* Animated gold top line */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      <style>{`@media(min-width:768px){.about-grid{grid-template-columns:1fr 1fr!important}} @media(min-width:640px){.cred-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
      <div className="about-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr", gap: 64, alignItems: "start" }}>

        {/* LEFT — Image */}
        <div data-about-image="" style={{ position: "relative", opacity: 0 }}>
          {/* Gold left bar — animates from top */}
          <div
            data-gold-bar=""
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: G, zIndex: 10, transformOrigin: "top", transform: "scaleY(0)" }}
          />
          <div style={{ paddingLeft: 16, position: "relative", overflow: "hidden", height: "clamp(400px, 50vw, 580px)" }}>
            <Image
              src="/images/about-factory.png"
              alt="RayoRise manufacturing facility — specialist tracksuit production"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,17,17,0.4) 0%, transparent 50%)", pointerEvents: "none" }} />
            {/* Gold corner accents */}
            <span style={{ position: "absolute", bottom: 16, right: 16, width: 28, height: 2, background: G }} />
            <span style={{ position: "absolute", bottom: 16, right: 16, width: 2, height: 28, background: G }} />
          </div>
        </div>

        {/* RIGHT — Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div data-heading="" style={{ display: "flex", flexDirection: "column", gap: 16, opacity: 0 }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600, margin: 0 }}>
              Who we are
            </p>
            <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", lineHeight: 1.05, fontSize: "clamp(32px, 4vw, 52px)", margin: 0 }}>
              We make one thing.<br />We make it well.
            </h2>
          </div>

          {/* Body text - line by line clip reveal */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {bodyLines.map((line, i) => (
              <span
                key={i}
                data-body-line=""
                style={{
                  display: "block",
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#8A7E70",
                  fontFamily: "var(--font-dm-sans)",
                  opacity: 0,
                  clipPath: "inset(0 100% 0 0)",
                }}
              >
                {line}
              </span>
            ))}
          </div>

          {/* Credential cards */}
          <div className="cred-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 8 }}>
            {credentials.map((cred, i) => (
              <CredCard key={cred.title} cred={cred} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Interactive credential card */
function CredCard({ cred }: { cred: typeof credentials[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-cred-card=""
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#2A2520",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: `2px solid ${G}`,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "default",
        opacity: 0,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        borderColor: hov ? "rgba(201,145,58,0.15)" : "rgba(255,255,255,0.06)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Hover glow */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(201,145,58,0.06) 0%, transparent 70%)", pointerEvents: "none" }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {cred.icon}
        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#F0E8D8", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
          {cred.title}
        </h4>
      </div>
      <p style={{ fontSize: 12, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
        {cred.body}
      </p>
    </div>
  );
}
