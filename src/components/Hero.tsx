"use client";

import { motion } from "framer-motion";
import { PhoneScene } from "./3d/PhoneScene";
import { PennyLogo } from "./PennyLogo";
import { Phone, Clock, Shield } from "lucide-react";

// Set this to true to enable the 3D phone interaction, or false to use the animated logo fallback.
const USE_3D_PHONE = true;

const words = ["Every enquiry answered.", "Every unit filled."];

const trustSignals = [
  { icon: Phone, label: "24/7 live answer" },
  { icon: Clock, label: "Setup in 48 hours" },
  { icon: Shield, label: "SOC 2 ready" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden flex items-center px-6 pt-20 lg:pt-24 pb-12 lg:pb-16"
      id="hero"
      style={{ minHeight: '100svh' }}
    >
      {/* Ambient copper glow */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none animate-breathe"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.11 55 / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-30%] left-[-15%] w-[500px] h-[500px] rounded-full pointer-events-none animate-breathe"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.11 55 / 0.04) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      <div className="section-inner w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Copy side */}
          <div>
            <motion.div
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div
                className="text-display"
                style={{ fontSize: "clamp(38px, 5.2vw, 64px)" }}
              >
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-3"
                    style={i === 1 ? { color: "var(--copper)" } : undefined}
                    initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }}
                    animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.p
              className="text-body text-base md:text-lg max-w-[520px] mb-6"
              style={{ lineHeight: 1.55 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              Penny is the phone teammate built for self-storage. She picks
              up when you can&apos;t, calls the waitlist the moment a unit
              opens, and books the tour while you&apos;re closing the gate.
              <motion.span
                className="inline-block align-middle ml-0.5"
                style={{ width: 2, height: 18, background: "var(--copper)", borderRadius: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span style={{ display: "block", width: "100%", height: "100%", animation: "blink-cursor 1s step-end infinite" }} />
              </motion.span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            >
              <a
                href="#try-penny"
                className="btn btn-primary text-base px-7 py-4"
                style={{ transition: "transform 0.25s var(--ease-out-expo)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Hear Penny in 2 minutes
              </a>
              <a
                href="#features"
                className="btn btn-secondary text-base px-7 py-4"
                style={{ transition: "transform 0.25s var(--ease-out-expo)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                See how she works
              </a>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              className="flex flex-wrap items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {trustSignals.map((signal, i) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                  >
                    <Icon
                      size={14}
                      strokeWidth={2}
                      style={{ color: "var(--copper)" }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--ink-subtle)", letterSpacing: "0.02em" }}
                    >
                      {signal.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Visual side */}
          <motion.div
            className="flex items-center justify-center w-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {USE_3D_PHONE ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--copper)]/10 to-transparent blur-3xl rounded-full scale-150 pointer-events-none" />
                <PhoneScene />
              </>
            ) : (
              <div className="relative w-[360px] h-[360px] flex items-center justify-center">
                {/* Spinning outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "1px solid oklch(0.65 0.11 55 / 0.12)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{ background: "var(--copper)" }}
                  />
                </motion.div>

                {/* Counter-spinning middle ring */}
                <motion.div
                  className="absolute inset-8 rounded-full"
                  style={{
                    border: "1px dashed oklch(0.65 0.11 55 / 0.08)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner glow */}
                <div
                  className="absolute inset-16 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.65 0.11 55 / 0.08) 0%, transparent 70%)",
                  }}
                />

                <PennyLogo size={180} color="var(--copper)" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
