"use client";

import { motion } from "framer-motion";
import { PhoneScene } from "./3d/PhoneScene";

const words = ["Phone calls,", "handled."];

export function Hero() {
  return (
    <section
      className="section min-h-[100dvh] flex items-center pt-24 relative overflow-hidden"
      id="hero"
    >
      {/* Ambient copper glow */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,129,96,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-30%] left-[-15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,129,96,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="section-inner w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy side */}
          <div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="text-display">
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
              className="text-body text-lg md:text-xl max-w-[540px] mb-8"
              style={{ lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              Penny answers, calls back, books appointments, and sends
              follow-ups. Your team stops being a switchboard and starts
              doing the work that actually grows the business.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            >
              <a href="#try-penny" className="btn btn-primary text-base px-7 py-4">
                Hear Penny in action
              </a>
              <a href="#features" className="btn btn-secondary text-base px-7 py-4">
                See how it works
              </a>
            </motion.div>
          </div>

          {/* Visual side */}
          <motion.div
            className="hidden lg:flex items-center justify-center w-full relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--copper)]/10 to-transparent blur-3xl rounded-full scale-150 pointer-events-none" />
            <PhoneScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
