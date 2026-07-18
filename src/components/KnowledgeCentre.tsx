"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

const articles = [
  {
    title: "How Private Label Tracksuit Manufacturing Works",
    excerpt: "A practical guide to sampling, patterning, approvals and bulk production so buyers know exactly what happens after enquiry.",
    href: "/knowledge/how-private-label-tracksuit-manufacturing-works",
    tag: "Featured",
    readingTime: "8 min read",
    date: "Jan 2026",
  },
  {
    title: "OEM vs ODM Manufacturing",
    excerpt: "Understand the difference between Original Equipment and Original Design manufacturing before sourcing your next collection.",
    href: "/knowledge/oem-vs-odm-manufacturing",
    tag: "Manufacturing",
    readingTime: "5 min read",
    date: "Jan 2026",
  },
  {
    title: "Choosing the Right Fabric",
    excerpt: "Tips on performance, weight and finish for custom sportswear to help you select the best material for your apparel line.",
    href: "/knowledge/choosing-the-right-fabric",
    tag: "Fabric Guide",
    readingTime: "6 min read",
    date: "Dec 2025",
  },
  {
    title: "Sample Development Guide",
    excerpt: "What buyers should review and approve before bulk production starts, from proto samples to sealed approvals.",
    href: "/knowledge/sample-development-guide",
    tag: "Development",
    readingTime: "7 min read",
    date: "Dec 2025",
  },
  {
    title: "MOQ Explained",
    excerpt: "How minimum order quantities affect pricing and production planning for private-label sportswear.",
    href: "/knowledge/moq-explained",
    tag: "Sourcing",
    readingTime: "4 min read",
    date: "Nov 2025",
  },
  {
    title: "Pantone Colour Matching",
    excerpt: "Keep brand colours consistent across repeats and reorders with professional Pantone matching techniques.",
    href: "/knowledge/pantone-colour-matching",
    tag: "Branding",
    readingTime: "5 min read",
    date: "Nov 2025",
  },
  {
    title: "Quality Control in Bulk Production",
    excerpt: "The essential checks that protect fit, finish and branding accuracy from first article to final shipment.",
    href: "/knowledge/quality-control-bulk-production",
    tag: "Quality",
    readingTime: "6 min read",
    date: "Oct 2025",
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

export default function KnowledgeCentre() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section
      id="knowledge-centre"
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
          background: "radial-gradient(circle at left, rgba(201,145,58,0.07) 0%, transparent 40%), radial-gradient(circle at bottom right, rgba(255,255,255,0.03) 0%, transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 26%)",
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
      <div style={{ position: "absolute", top: 120, right: 20, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,145,58,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 80, left: 40, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,145,58,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        {/* ── Section Header ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{ marginBottom: 56 }}
        >
          <motion.p variants={fadeUp} style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: G, fontFamily: "var(--font-dm-sans)" }}>
            Knowledge Centre
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ margin: 0, fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 0.92, color: "#F0E8D8", maxWidth: 640 }}>
            Manufacturing Knowledge Centre
          </motion.h2>
          <motion.p variants={fadeUp} style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.75, color: "#C8BFA8", fontFamily: "var(--font-dm-sans)", maxWidth: 600 }}>
            Practical guides and technical articles to help buyers make informed sourcing and product-development decisions.
          </motion.p>
        </motion.div>

        {/* ── Featured Article ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerV}
          style={{ marginBottom: 48 }}
        >
          <Link href={featured.href} style={{ textDecoration: "none", display: "block" }} className="kc-featured">
            <motion.article
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                padding: 1,
              }}
            >
              {/* Visual placeholder */}
              <div
                style={{
                  flex: "1 1 320px",
                  minHeight: 260,
                  position: "relative",
                  overflow: "hidden",
                  background: "#17120E",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 30% 40%, rgba(201,145,58,0.2) 0%, transparent 45%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0%, transparent 40%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.05) 45%, transparent 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 16px",
                    borderRadius: 100,
                    border: "1px solid rgba(201,145,58,0.2)",
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E7C27E", fontFamily: "var(--font-dm-sans)" }}>
                    {featured.readingTime}
                  </span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(201,145,58,0.4)" }} />
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>
                    {featured.date}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  flex: "1 1 380px",
                  padding: "32px 36px",
                  background: "#221E19",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                {/* Tag badge */}
                <div
                  className="kc-featured-tag"
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    padding: "5px 14px",
                    borderRadius: 100,
                    border: "1px solid rgba(201,145,58,0.15)",
                    background: "rgba(23,18,14,0.6)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#E7C27E",
                    fontFamily: "var(--font-dm-sans)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {featured.tag}
                </div>

                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-barlow-condensed)",
                    fontWeight: 900,
                    fontSize: "clamp(24px, 2.8vw, 36px)",
                    lineHeight: 0.96,
                    color: "#F0E8D8",
                    maxWidth: 500,
                  }}
                >
                  {featured.title}
                </h3>

                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#B9AB97", fontFamily: "var(--font-dm-sans)" }}>
                  {featured.excerpt}
                </p>

                <div
                  className="kc-featured-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: G,
                    fontFamily: "var(--font-dm-sans)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  Read full guide
                  <span style={{ display: "inline-block", transition: "transform 0.3s ease", fontSize: 16 }} className="kc-featured-arrow">→</span>
                </div>
              </div>
            </motion.article>
          </Link>

          <style>{`
            .kc-featured:hover .kc-featured-tag { border-color: rgba(201,145,58,0.35); background: rgba(23,18,14,0.8); }
            .kc-featured:hover .kc-featured-cta { transform: translateX(4px); }
            .kc-featured:hover .kc-featured-arrow { transform: translateX(4px); }
            .kc-featured:focus-visible { outline: 2px solid ${G}; outline-offset: 4px; border-radius: 24px; }
          `}</style>
        </motion.div>

        {/* ── Article Grid ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {rest.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Article Card ─── */
function ArticleCard({
  title,
  excerpt,
  href,
  tag,
  readingTime,
  date,
}: {
  title: string;
  excerpt: string;
  href: string;
  tag: string;
  readingTime: string;
  date: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }} className="kc-card">
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: EASE }}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          padding: 1,
          height: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 19,
            background: "#221E19",
            padding: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Visual placeholder */}
          <div
            style={{
              position: "relative",
              height: 160,
              overflow: "hidden",
              background: "#17120E",
              borderRadius: "19px 19px 0 0",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 40% 30%, rgba(201,145,58,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 40%)",
                transition: "transform 0.5s ease",
              }}
              className="kc-card-img"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.04) 45%, transparent 60%)",
              }}
            />
            {/* Card meta */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                right: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 100,
                  border: "1px solid rgba(201,145,58,0.15)",
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(4px)",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#E7C27E",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {tag}
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 100,
                  background: "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(4px)",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "#8A7E70",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {readingTime}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              padding: "20px 22px 24px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6A5E50", fontFamily: "var(--font-dm-sans)" }}>
              {date}
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: "var(--font-barlow-condensed)",
                fontWeight: 900,
                fontSize: 20,
                lineHeight: 1.05,
                color: "#F0E8D8",
              }}
            >
              {title}
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.65,
                color: "#8A7E70",
                fontFamily: "var(--font-dm-sans)",
                flex: 1,
              }}
            >
              {excerpt}
            </p>

            <div
              className="kc-card-cta"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 4,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: G,
                fontFamily: "var(--font-dm-sans)",
                transition: "transform 0.3s ease",
              }}
            >
              Read article
              <span style={{ display: "inline-block", transition: "transform 0.3s ease" }} className="kc-card-arrow">→</span>
            </div>
          </div>
        </div>
      </motion.article>

      <style>{`
        .kc-card:hover .kc-card-img { transform: scale(1.05); }
        .kc-card:hover .kc-card-cta { transform: translateX(4px); }
        .kc-card:hover .kc-card-arrow { transform: translateX(3px); }
        .kc-card:focus-visible { outline: 2px solid ${G}; outline-offset: 4px; border-radius: 20px; }
      `}</style>
    </Link>
  );
}