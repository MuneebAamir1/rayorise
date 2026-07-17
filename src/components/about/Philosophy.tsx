"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";

export default function Philosophy() {
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

      const revealEls = sectionRef.current!.querySelectorAll<HTMLElement>("[data-phil]");
      gsap.fromTo(revealEls, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: revealEls[0], start: "top 80%", toggleActions: "play none none none" },
      });

      const imageEl = sectionRef.current!.querySelector<HTMLElement>("[data-phil-img]");
      if (imageEl) {
        gsap.fromTo(imageEl, { clipPath: "inset(100% 0 0 0)", opacity: 0 }, {
          clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: imageEl, start: "top 85%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      style={{
        width: "100%",
        background: "#1A1612",
        padding: "128px 0",
        position: "relative",
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

      <style>{`
        .phil-grid { grid-template-columns: 1fr; gap: 48px; }
        @media(min-width: 768px) {
          .phil-grid { grid-template-columns: 1fr 0.6fr !important; gap: 80px !important; }
        }
      `}</style>

      <div
        className="phil-grid"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          alignItems: "center",
        }}
      >
        {/* Left — content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <p
            data-phil=""
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#6A5F54",
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 600,
              margin: 0,
              opacity: 0,
            }}
          >
            Why RayoRise Exists
          </p>

          <h2
            data-phil=""
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 800,
              fontSize: "clamp(36px, 5.5vw, 68px)",
              lineHeight: 1.05,
              color: "#F0E8D8",
              margin: 0,
              opacity: 0,
            }}
          >
            Because &lsquo;custom&rsquo; should mean more than{" "}
            <span style={{ color: G }}>adding a logo.</span>
          </h2>

          <div data-phil="" style={{ opacity: 0 }}>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "#8A7E70",
                fontFamily: "var(--font-dm-sans)",
                margin: "0 0 20px",
                maxWidth: 520,
              }}
            >
              RayoRise is built for brands that care about silhouette, panel
              balance, material weight, construction, and repeatable production.
              Not for brands that just want their logo on a blank.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "#8A7E70",
                fontFamily: "var(--font-dm-sans)",
                margin: 0,
                maxWidth: 520,
              }}
            >
              We exist because too many manufacturers treat &ldquo;custom&rdquo; as a
              print-on-demand add-on. We treat it as the entire point.
            </p>
          </div>

          <p
            data-phil=""
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: G,
              fontFamily: "var(--font-dm-sans)",
              borderLeft: `3px solid ${G}`,
              paddingLeft: 20,
              margin: "8px 0 0",
              lineHeight: 1.6,
              opacity: 0,
            }}
          >
            Built for the brand you are becoming — not just the drop you are
            making.
          </p>
        </div>

        {/* Right — abstract visual */}
        <div
          data-phil-img=""
          style={{
            position: "relative",
            overflow: "hidden",
            height: "clamp(300px, 40vw, 480px)",
            opacity: 0,
            clipPath: "inset(100% 0 0 0)",
          }}
        >
          <Image
            src="/images/stitching-detail.png"
            alt="Close-up of overlock stitch construction detail"
            fill
            style={{
              objectFit: "cover",
              filter: "saturate(0.4) brightness(0.6)",
            }}
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(26,22,18,0.9) 0%, transparent 50%)",
            }}
          />
          {/* Gold corner accent */}
          <span
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              width: 28,
              height: 2,
              background: G,
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              width: 2,
              height: 28,
              background: G,
            }}
          />
          {/* Gold left bar */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 3,
              height: "100%",
              background: G,
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    </section>
  );
}
