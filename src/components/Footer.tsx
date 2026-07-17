"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Manufacturing", href: "/#manufacturing" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

/* Footer link with underline reveal */
function FooterLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: 13, color: hov ? "#F0E8D8" : "#8A7E70", fontFamily: "var(--font-dm-sans)",
        textDecoration: "none", position: "relative", display: "inline-block",
        transition: "color 0.2s", cursor: "pointer", width: "fit-content",
      }}
    >
      {label}
      <motion.span
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: 1, background: G, transformOrigin: "left" }}
      />
    </Link>
  );
}

/* CTA button */
function FooterCTA() {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="/#contact"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: hov ? G : "transparent",
        borderColor: hov ? G : "rgba(201,145,58,0.5)",
        scale: hov ? 1.03 : 1,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "10px 20px", border: "1.5px solid", textDecoration: "none", cursor: "pointer",
        position: "relative", overflow: "hidden", marginTop: 8,
      }}
    >
      <motion.span
        animate={{ x: hov ? "300%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)", transform: "skewX(-20deg)", pointerEvents: "none" }}
      />
      <motion.span
        animate={{ backgroundColor: hov ? "#1A1612" : G, boxShadow: hov ? "none" : `0 0 6px rgba(201,145,58,0.2)` }}
        style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0 }}
      />
      <motion.span
        animate={{ color: hov ? "#1A1612" : G }}
        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-dm-sans)" }}
      >
        Request Sample
      </motion.span>
    </motion.a>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!footerRef.current) return;

    const goldLine = footerRef.current.querySelector<HTMLElement>("[data-gold-line]");
    const cols = footerRef.current.querySelectorAll<HTMLElement>("[data-col]");
    const bottomBar = footerRef.current.querySelector<HTMLElement>("[data-bottom]");

    if (goldLine) {
      gsap.fromTo(goldLine, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%", toggleActions: "play none none none" },
      });
    }

    cols.forEach((col, i) => {
      gsap.fromTo(col, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.12,
        scrollTrigger: { trigger: col, start: "top 92%", toggleActions: "play none none none" },
      });
    });

    if (bottomBar) {
      gsap.fromTo(bottomBar, { opacity: 0 }, {
        opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: bottomBar, start: "top 96%", toggleActions: "play none none none" },
      });
    }

    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger && footerRef.current?.contains(st.vars.trigger as Element)) st.kill();
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} style={{ width: "100%", background: "#221E19", position: "relative" }}>
      {/* Gold top border — animated */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 5%, ${G} 35%, ${GL} 50%, ${G} 65%, transparent 95%)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      {/* Main grid */}
      <style>{`@media(min-width:768px){.footer-grid{grid-template-columns:1.2fr 0.8fr 1fr!important}}`}</style>
      <div className="footer-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 32px", display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>

        {/* Col 1 — Logo + descriptor */}
        <div data-col="" style={{ display: "flex", flexDirection: "column", gap: 16, opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", width: 36, height: 36 }}>
              <Image src="/images/ray-logo.png" alt="RayoRise" fill style={{ objectFit: "contain" }} sizes="36px" />
            </div>
            <span style={{
              fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: 22,
              background: `linear-gradient(130deg, ${G}, ${GL}, #A00D24)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              RayoRise
            </span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", maxWidth: 260, margin: 0 }}>
            Specialist B2B tracksuit manufacturer. Serving UK streetwear brands since day one.
          </p>
          {/* Social hint */}
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            {["Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#" style={{ fontSize: 12, color: "#6A5F54", fontFamily: "var(--font-dm-sans)", textDecoration: "none", transition: "color 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = G; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#6A5F54"; }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Nav */}
        <div data-col="" style={{ display: "flex", flexDirection: "column", gap: 16, opacity: 0 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600, margin: 0 }}>
            Navigation
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {navLinks.map((link) => (
              <FooterLink key={link.label} href={link.href} label={link.label} />
            ))}
          </div>
        </div>

        {/* Col 3 — Contact */}
        <div data-col="" style={{ display: "flex", flexDirection: "column", gap: 16, opacity: 0 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: G, fontFamily: "var(--font-dm-sans)", fontWeight: 600, margin: 0 }}>
            Get in touch
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { text: "hello@rayorise.co.uk", href: "mailto:hello@rayorise.co.uk", icon: "✉" },
              { text: "WhatsApp: +44 7700 000000", href: "https://wa.me/447700000000", icon: "💬" },
            ].map((item) => (
              <a
                key={item.text}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#F0E8D8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#8A7E70"; }}
              >
                <span style={{ fontSize: 12 }}>{item.icon}</span>
                {item.text}
              </a>
            ))}
            <p style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
              <span style={{ fontSize: 12 }}>📍</span>
              United Kingdom
            </p>
          </div>
          <FooterCTA />
        </div>
      </div>

      {/* Bottom bar */}
      <div data-bottom="" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", opacity: 0 }}>
        <style>{`@media(min-width:768px){.footer-bottom{flex-direction:row!important}}`}</style>
        <div className="footer-bottom" style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <p style={{ fontSize: 12, color: "#6A5F54", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
            © {new Date().getFullYear()} RayoRise. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "#6A5F54", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
            Specialist B2B tracksuit manufacturer · United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
