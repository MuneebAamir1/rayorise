"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const outerRef = useRef<HTMLDivElement>(null);
  
  // Horizontal scroll setup
  const { scrollYProgress } = useScroll({ target: outerRef });
  const xOffset = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  // 3D Tilt Setup for Form Panel Left Column
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], ["15deg", "-15deg"]), springConfig);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], ["-15deg", "15deg"]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(xPct);
    tiltY.set(yPct);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // 3D Tilt Setup for Form Panel Right Column
  const formTiltX = useMotionValue(0);
  const formTiltY = useMotionValue(0);
  const formRotateX = useSpring(useTransform(formTiltY, [-0.5, 0.5], ["6deg", "-6deg"]), springConfig);
  const formRotateY = useSpring(useTransform(formTiltX, [-0.5, 0.5], ["-6deg", "6deg"]), springConfig);

  const handleFormMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    formTiltX.set(xPct);
    formTiltY.set(yPct);
  };

  const handleFormMouseLeave = () => {
    formTiltX.set(0);
    formTiltY.set(0);
  };

  // Form State
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 2000); // simulate network request
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />

      {/* SECTION 1 — HERO ROW */}
      <section 
        className="w-full min-h-screen flex flex-col min-[900px]:flex-row items-stretch pt-[100px] pb-8 px-8 gap-6"
      >
        {/* Child A: CONNECT WITH US CARD */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col justify-center overflow-hidden"
          style={{
            flex: "0 0 auto",
            width: "100%",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "64px 56px",
          }}
        >
          {/* Glowing dot in top-right */}
          <motion.div 
            animate={{ scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            style={{
              position: "absolute", top: -50, right: -50, width: 300, height: 300, borderRadius: "50%",
              background: "color-mix(in srgb, var(--accent) 25%, transparent)",
              filter: "blur(80px)", pointerEvents: "none"
            }}
          />
          
          <span style={{ textTransform: "uppercase", fontSize: "11px", letterSpacing: "3px", color: "var(--accent)" }}>
            GET IN TOUCH
          </span>
          <h1 style={{
            fontSize: "clamp(42px, 5vw, 72px)", fontWeight: 700, lineHeight: 1.1, marginTop: "16px",
            background: "linear-gradient(135deg, var(--text-primary) 40%, var(--accent-secondary) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Connect With Us.
          </h1>
          <p style={{
            fontSize: "16px", color: "var(--text-muted)", maxWidth: "480px", lineHeight: 1.75, marginTop: "20px"
          }}>
            We don't do boring emails. Drop us a line, send a meme, pitch a wild idea — we're all ears. Let's build something the internet hasn't seen yet.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "36px" }}>
            {["48hr Response", "Zero Spam", "Real Humans"].map(label => (
              <div 
                key={label}
                className="group cursor-default"
                style={{
                  backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "999px",
                  padding: "8px 18px", fontSize: "13px", color: "var(--text-muted)", transition: "all 0.25s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              document.getElementById("form-panel")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              marginTop: "48px", alignSelf: "flex-start", fontSize: "15px", fontWeight: 600,
              color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px",
              background: "none", border: "none", cursor: "pointer"
            }}
          >
            Start a Project <span style={{ color: "var(--accent)" }}>→</span>
          </button>
        </motion.div>

        {/* Child B: VERTICAL DIVIDER LINE */}
        <div className="hidden min-[900px]:flex flex-col items-center justify-center relative" style={{ width: "2%" }}>
          <div style={{
            width: "1px", height: "100%",
            background: "linear-gradient(to bottom, transparent, var(--accent), transparent)"
          }} />
          <motion.div 
            animate={{ y: ["0%", "60%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", width: "10px", height: "10px", borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 16px color-mix(in srgb, var(--accent) 60%, transparent)"
            }}
          />
        </div>

        {/* Child C: INSTAGRAM / SOCIAL CARD */}
        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
          style={{
            flex: "1 1 auto",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "64px 56px",
          }}
        >
          <div style={{
            width: "56px", height: "56px", borderRadius: "16px",
            background: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginTop: "20px" }}>
            Find Us On Insta
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "12px", lineHeight: 1.7 }}>
            Behind-the-scenes chaos, work-in-progress drops, and the occasional dumb meme.
          </p>
          <a 
            href="#"
            className="group"
            style={{
              marginTop: "28px", fontSize: "20px", fontWeight: 600, color: "var(--accent-secondary)",
              display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none"
            }}
          >
            @rayorise
            <span style={{ transition: "transform 0.25s" }} className="group-hover:translate-x-1">→</span>
          </a>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%", height: "48px", borderRadius: "14px", fontWeight: 600, fontSize: "15px",
              background: "linear-gradient(135deg, var(--accent-secondary), var(--accent))",
              color: "white", border: "none", cursor: "pointer", marginTop: "32px"
            }}
          >
            Follow Us
          </motion.button>
        </motion.div>
      </section>

      {/* SECTION 2 — HORIZONTAL SCROLL SEQUENCE */}
      <div ref={outerRef} style={{ height: "300vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <motion.div 
            style={{ 
              x: xOffset, 
              display: "flex", 
              flexDirection: "row", 
              width: "300vw",
              height: "100%",
              willChange: "transform"
            }}
          >
            {/* Panel 1: TEASER */}
            <div className="w-[100vw] h-full flex flex-col items-center justify-center relative shrink-0">
              <motion.h2 
                style={{
                  fontSize: "clamp(64px, 10vw, 150px)", fontWeight: 800, textAlign: "center", lineHeight: 1,
                  background: "linear-gradient(180deg, var(--text-primary) 0%, var(--text-muted) 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}
              >
                Ready to<br />Make Moves?
              </motion.h2>
              <div className="mt-12 flex flex-col items-center gap-4 text-[var(--text-muted)] animate-pulse">
                <span className="text-sm font-semibold tracking-widest uppercase">Scroll Right</span>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            {/* Panel 2: FORM PANEL */}
            <div id="form-panel" className="w-[100vw] h-full flex items-center justify-center p-8 shrink-0">
              <div className="w-full max-w-6xl h-[85vh] flex flex-col lg:flex-row gap-8">
                
                {/* Left Column: 3D Tilt Card */}
                <div 
                  className="hidden lg:flex w-1/2 h-full perspective-[1000px]"
                  style={{ perspective: 1000 }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div
                    style={{
                      rotateX, rotateY, transformStyle: "preserve-3d",
                      width: "100%", height: "100%", borderRadius: "32px",
                      background: "linear-gradient(145deg, var(--surface), var(--bg))",
                      border: "1px solid var(--border)", position: "relative", overflow: "hidden"
                    }}
                    className="flex flex-col p-12 justify-between"
                  >
                    <div style={{ transform: "translateZ(50px)" }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <h3 className="text-4xl font-bold text-[var(--text-primary)] mt-8">
                        Let's Talk Business.
                      </h3>
                      <p className="text-[var(--text-muted)] text-lg mt-4 max-w-sm">
                        Direct line to our production team. Expect straight answers and rapid turnarounds.
                      </p>
                    </div>

                    <div style={{ transform: "translateZ(30px)" }} className="flex flex-col gap-6">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Email Us</p>
                        <a href="mailto:hello@rayorise.com" className="text-xl font-medium text-[var(--accent-secondary)] mt-1 inline-block">hello@rayorise.com</a>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Call Us</p>
                        <p className="text-xl font-medium text-[var(--text-primary)] mt-1">+44 (0) 123 456 7890</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Location</p>
                        <p className="text-xl font-medium text-[var(--text-primary)] mt-1">Manchester, UK</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column: Form Container */}
                <div 
                  className="w-full lg:w-1/2 h-full perspective-[1200px]"
                  style={{ perspective: 1200 }}
                  onMouseMove={handleFormMouseMove}
                  onMouseLeave={handleFormMouseLeave}
                >
                  <motion.div
                    style={{
                      rotateX: formRotateX, 
                      rotateY: formRotateY, 
                      transformStyle: "preserve-3d",
                      width: "100%", height: "100%",
                      backgroundColor: "color-mix(in srgb, var(--surface) 90%, transparent)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: "1px solid color-mix(in srgb, var(--border) 50%, transparent)", 
                      borderRadius: "32px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    }}
                    className="relative p-8 md:p-12 overflow-hidden"
                  >
                    {/* Glowing background blob behind form */}
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                      style={{
                        position: "absolute", top: "10%", right: "10%", width: "200px", height: "200px", borderRadius: "50%",
                        background: "color-mix(in srgb, var(--accent) 30%, transparent)",
                        filter: "blur(60px)", pointerEvents: "none", transform: "translateZ(-10px)"
                      }}
                    />

                    <AnimatePresence mode="wait">
                      {formStatus === "idle" && (
                        <motion.form 
                          key="form"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          onSubmit={handleSubmit}
                          className="flex flex-col h-full gap-6 relative"
                          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                        >
                          <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4" style={{ transform: "translateZ(20px)" }}>Send a Message</h3>
                          
                          <div className="flex gap-4" style={{ transform: "translateZ(10px)" }}>
                            <div className="w-1/2 group relative">
                              <input required type="text" placeholder="First Name" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_30%,transparent)] focus:-translate-y-1 hover:border-gray-400 peer cursor-text" />
                            </div>
                            <div className="w-1/2 group relative">
                              <input required type="text" placeholder="Last Name" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_30%,transparent)] focus:-translate-y-1 hover:border-gray-400 peer cursor-text" />
                            </div>
                          </div>

                          <div className="group relative" style={{ transform: "translateZ(15px)" }}>
                            <input required type="email" placeholder="Email Address" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_30%,transparent)] focus:-translate-y-1 hover:border-gray-400 peer cursor-text" />
                          </div>

                          <div className="group relative flex-grow" style={{ transform: "translateZ(20px)" }}>
                            <textarea required placeholder="Tell us about your project..." className="w-full h-full min-h-[150px] bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_30%,transparent)] focus:-translate-y-1 hover:border-gray-400 resize-none peer cursor-text"></textarea>
                          </div>

                          <motion.button 
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="w-full bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent)] text-white font-bold text-lg py-4 rounded-xl shadow-[0_10px_20px_color-mix(in_srgb,var(--accent)_30%,transparent)] mt-auto cursor-pointer border border-white/10"
                            style={{ transform: "translateZ(30px)" }}
                          >
                            Send Message
                          </motion.button>
                        </motion.form>
                      )}

                      {formStatus === "submitting" && (
                        <motion.div 
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--surface)]/50 backdrop-blur-sm z-10 rounded-[32px]"
                          style={{ transform: "translateZ(40px)" }}
                        >
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-[var(--bg)] border-t-[var(--accent)] rounded-full mb-6"
                          />
                          <p className="text-[var(--text-primary)] font-medium text-lg">Encrypting & Sending...</p>
                        </motion.div>
                      )}

                      {formStatus === "success" && (
                        <motion.div 
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[var(--surface)] z-10 rounded-[32px]"
                          style={{ transform: "translateZ(50px)" }}
                        >
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            className="w-24 h-24 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full flex items-center justify-center mb-6 border border-[var(--accent)]/20"
                          >
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </motion.div>
                          <h3 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Message Sent!</h3>
                          <p className="text-[var(--text-muted)] text-lg mb-8 max-w-sm">We've received your request and our team will be in touch within 48 hours.</p>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormStatus("idle")}
                            className="px-8 py-4 bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] font-semibold rounded-xl hover:border-[var(--accent)] hover:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_20%,transparent)] transition-all cursor-pointer"
                          >
                            Start a New Message
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Panel 3: CLOSING PANEL */}
            <div className="w-[100vw] h-full flex flex-col items-center justify-center shrink-0">
              <motion.h2 
                style={{
                  fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 800, textAlign: "center", lineHeight: 1,
                  background: "linear-gradient(180deg, var(--text-primary) 0%, var(--text-muted) 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}
              >
                Let's Build.
              </motion.h2>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
