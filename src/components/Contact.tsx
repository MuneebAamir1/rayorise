"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";

const G = "#C9913A";
const GL = "#DBAA55";
const EASE = [0.16, 1, 0.3, 1] as const;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* Floating label input */
function FormField({ label, name, type = "text", value, onChange, placeholder, required = true }: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: "relative" }}>
      <label style={{
        position: "absolute", left: 16, top: active ? 6 : 16,
        fontSize: active ? 9 : 11, textTransform: "uppercase", letterSpacing: "0.14em",
        color: focused ? G : "#6A5F54", fontFamily: "var(--font-dm-sans)",
        transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", pointerEvents: "none", zIndex: 2,
      }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        style={{
          width: "100%", padding: active ? "22px 16px 10px" : "16px",
          background: "#2A2520", border: "1px solid", fontSize: 14, color: "#F0E8D8",
          fontFamily: "var(--font-dm-sans)", outline: "none",
          borderColor: focused ? G : "rgba(255,255,255,0.06)",
          transition: "border-color 0.25s, padding 0.2s, box-shadow 0.25s",
          boxShadow: focused ? `0 0 0 1px rgba(201,145,58,0.15), 0 4px 16px rgba(201,145,58,0.05)` : "none",
        }}
      />
    </div>
  );
}

/* WhatsApp button */
function WhatsAppCTA() {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="https://wa.me/447700000000"
      target="_blank"
      rel="noopener noreferrer"
      id="contact-whatsapp"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: hov ? "#20BD5A" : "#25D366",
        scale: hov ? 1.03 : 1,
        boxShadow: hov ? "0 8px 24px rgba(37,211,102,0.25)" : "0 2px 8px rgba(37,211,102,0.1)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px",
        textDecoration: "none", cursor: "pointer", color: "#fff", fontSize: 14,
        fontWeight: 600, fontFamily: "var(--font-dm-sans)", position: "relative", overflow: "hidden",
      }}
    >
      <motion.span
        animate={{ x: hov ? "300%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", transform: "skewX(-20deg)", pointerEvents: "none" }}
      />
      <WhatsAppIcon />
      <span style={{ position: "relative", zIndex: 1 }}>Chat on WhatsApp</span>
    </motion.a>
  );
}

/* Submit button */
function SubmitButton({ submitting }: { submitting: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      type="submit"
      disabled={submitting}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        backgroundColor: submitting ? "rgba(201,145,58,0.5)" : hov ? GL : G,
        scale: hov && !submitting ? 1.02 : 1,
        boxShadow: hov && !submitting ? `0 8px 32px rgba(201,145,58,0.25)` : `0 2px 8px rgba(201,145,58,0.1)`,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      style={{
        width: "100%", padding: "16px 0", border: "none", cursor: submitting ? "not-allowed" : "pointer",
        fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", color: "#1A1612",
        fontFamily: "var(--font-dm-sans)", position: "relative", overflow: "hidden",
        opacity: submitting ? 0.7 : 1,
      }}
    >
      <motion.span
        animate={{ x: hov && !submitting ? "350%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", top: 0, left: 0, width: "35%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", transform: "skewX(-20deg)", pointerEvents: "none" }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>
        {submitting ? "Sending..." : "Send Inquiry"}
      </span>
    </motion.button>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [form, setForm] = useState({ name: "", brand: "", product: "", quantity: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);
  const [textareaFocused, setTextareaFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  /* GSAP ScrollTrigger */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const goldLine = sectionRef.current.querySelector<HTMLElement>("[data-gold-line]");
    const leftCol = sectionRef.current.querySelector<HTMLElement>("[data-left-col]");
    const rightCol = sectionRef.current.querySelector<HTMLElement>("[data-right-col]");
    const specItems = sectionRef.current.querySelectorAll<HTMLElement>("[data-spec-item]");

    if (goldLine) {
      gsap.fromTo(goldLine, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }

    if (leftCol) {
      gsap.fromTo(leftCol, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: leftCol, start: "top 85%", toggleActions: "play none none none" },
      });
    }

    if (rightCol) {
      gsap.fromTo(rightCol, { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1,
        scrollTrigger: { trigger: rightCol, start: "top 85%", toggleActions: "play none none none" },
      });
    }

    specItems.forEach((item, i) => {
      gsap.fromTo(item, { x: -20, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.3 + i * 0.1,
        scrollTrigger: { trigger: item, start: "top 92%", toggleActions: "play none none none" },
      });
    });

    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger && sectionRef.current?.contains(st.vars.trigger as Element)) st.kill();
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ width: "100%", background: "#1A1612", padding: "96px 0 112px", position: "relative" }}
    >
      {/* Gold top line */}
      <div data-gold-line="" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(201,145,58,0.15) 30%, rgba(201,145,58,0.15) 70%, transparent)`, transformOrigin: "left", transform: "scaleX(0)" }} />

      <style>{`@media(min-width:768px){.contact-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr", gap: 64, alignItems: "start" }}>

        {/* LEFT — CTA Content */}
        <div data-left-col="" style={{ display: "flex", flexDirection: "column", gap: 32, opacity: 0 }}>
          <div>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: G, fontFamily: "var(--font-dm-sans)", marginBottom: 16, fontWeight: 600 }}>
              Start your order
            </p>
            <h2 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", lineHeight: 1.05, fontSize: "clamp(32px, 5vw, 56px)", margin: "0 0 28px" }}>
              Ready to build your brand&apos;s tracksuit?
            </h2>

            {/* Spec items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "MOQ", value: "50 units minimum per colourway" },
                { label: "Sampling", value: "7–10 working days" },
                { label: "Production", value: "3–5 weeks from approval" },
              ].map((item) => (
                <div
                  key={item.label}
                  data-spec-item=""
                  style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0 }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: G, flexShrink: 0, boxShadow: `0 0 8px rgba(201,145,58,0.3)` }} />
                  <span style={{ fontSize: 14, color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>
                    <strong style={{ color: "#F0E8D8" }}>{item.label}:</strong>{" "}{item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: "#8A7E70", marginBottom: 12, fontFamily: "var(--font-dm-sans)" }}>
              Or chat directly
            </p>
            <WhatsAppCTA />
            <p style={{ fontSize: 11, marginTop: 12, color: "#6A5F54", fontFamily: "var(--font-dm-sans)" }}>
              Typically responds within 2 hours during business hours
            </p>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div data-right-col="" style={{ opacity: 0 }}>
          <div style={{
            background: "#221E19", border: "1px solid rgba(255,255,255,0.06)", padding: 32,
            position: "relative", overflow: "hidden",
          }}>
            {/* Gold top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G}, ${GL}, ${G})` }} />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <h3 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: 24, margin: "0 0 4px" }}>
                    Send Inquiry
                  </h3>

                  <FormField label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                  <FormField label="Brand Name" name="brand" value={form.brand} onChange={handleChange} placeholder="Your brand or label name" />

                  {/* Product select */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      position: "absolute", left: 16, top: selectFocused || form.product ? 6 : 16,
                      fontSize: selectFocused || form.product ? 9 : 11, textTransform: "uppercase", letterSpacing: "0.14em",
                      color: selectFocused ? G : "#6A5F54", fontFamily: "var(--font-dm-sans)",
                      transition: "all 0.2s", pointerEvents: "none", zIndex: 2,
                    }}>
                      Product Interest
                    </label>
                    <select
                      name="product"
                      required
                      value={form.product}
                      onChange={handleChange}
                      onFocus={() => setSelectFocused(true)}
                      onBlur={() => setSelectFocused(false)}
                      style={{
                        width: "100%", padding: selectFocused || form.product ? "22px 16px 10px" : "16px",
                        background: "#2A2520", border: "1px solid", fontSize: 14, color: form.product ? "#F0E8D8" : "#6A5F54",
                        fontFamily: "var(--font-dm-sans)", outline: "none", cursor: "pointer",
                        borderColor: selectFocused ? G : "rgba(255,255,255,0.06)",
                        transition: "border-color 0.25s, padding 0.2s, box-shadow 0.25s",
                        boxShadow: selectFocused ? `0 0 0 1px rgba(201,145,58,0.15)` : "none",
                        WebkitAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5l3 3 3-3' stroke='%23888880' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                      }}
                    >
                      <option value="" disabled>Select a product</option>
                      <option value="tracksuits">Tracksuits (Full Set)</option>
                      <option value="jackets">Track Jackets</option>
                      <option value="pants">Track Pants</option>
                    </select>
                  </div>

                  <FormField label="Estimated Quantity" name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 100 units" />

                  {/* Textarea */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      position: "absolute", left: 16, top: textareaFocused || form.description ? 6 : 16,
                      fontSize: textareaFocused || form.description ? 9 : 11, textTransform: "uppercase", letterSpacing: "0.14em",
                      color: textareaFocused ? G : "#6A5F54", fontFamily: "var(--font-dm-sans)",
                      transition: "all 0.2s", pointerEvents: "none", zIndex: 2,
                    }}>
                      Brief Design Description
                    </label>
                    <textarea
                      name="description"
                      required
                      value={form.description}
                      onChange={handleChange}
                      onFocus={() => setTextareaFocused(true)}
                      onBlur={() => setTextareaFocused(false)}
                      placeholder={textareaFocused ? "Describe your colour palette, panel layout, any references..." : ""}
                      rows={4}
                      style={{
                        width: "100%", padding: textareaFocused || form.description ? "22px 16px 10px" : "16px",
                        background: "#2A2520", border: "1px solid", fontSize: 14, color: "#F0E8D8",
                        fontFamily: "var(--font-dm-sans)", outline: "none", resize: "none",
                        borderColor: textareaFocused ? G : "rgba(255,255,255,0.06)",
                        transition: "border-color 0.25s, padding 0.2s, box-shadow 0.25s",
                        boxShadow: textareaFocused ? `0 0 0 1px rgba(201,145,58,0.15)` : "none",
                      }}
                    />
                  </div>

                  <SubmitButton submitting={submitting} />

                  {/* Response time */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg style={{ width: 14, height: 14, color: G }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                      <path d="M12 7v5l3 3" strokeLinecap="round" strokeWidth="1.5" />
                    </svg>
                    <span style={{ fontSize: 12, color: "#8A7E70", fontFamily: "var(--font-dm-sans)" }}>
                      We respond within 24 hours
                    </span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 24, padding: "64px 0" }}
                >
                  {/* Animated check */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    style={{ width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${G}`, position: "relative" }}
                  >
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `1px solid rgba(201,145,58,0.2)` }}
                    />
                    <svg style={{ width: 32, height: 32 }} fill="none" viewBox="0 0 24 24" stroke={G} strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 900, color: "#F0E8D8", fontSize: 32, margin: "0 0 8px" }}>
                      Inquiry Sent
                    </h3>
                    <p style={{ fontSize: 14, color: "#8A7E70", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
                      We&apos;ll review your brief and respond within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
