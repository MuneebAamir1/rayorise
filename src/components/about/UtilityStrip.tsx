"use client";

import { motion } from "framer-motion";

const G = "#C9913A";

const items = [
  "UK B2B TRACKSUIT MANUFACTURER",
  "MOQ 50",
  "SAMPLING 7–10 DAYS",
  "PRODUCTION 3–5 WEEKS",
];

export default function UtilityStrip() {
  return (
    <div
      style={{
        position: "fixed",
        top: 72,
        left: 0,
        right: 0,
        zIndex: 45,
        height: 28,
        background: "rgba(26,22,18,0.95)",
        borderBottom: "1px solid rgba(201,145,58,0.08)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
        }}
      >
        {items.map((item, i) => (
          <span
            key={item}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0,
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: i === 0 ? "rgba(212,255,43,0.7)" : "#8A7E70",
              fontFamily: "var(--font-dm-sans)",
              whiteSpace: "nowrap",
            }}
          >
            {i > 0 && (
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: G,
                  margin: "0 14px",
                  opacity: 0.5,
                }}
              />
            )}
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
