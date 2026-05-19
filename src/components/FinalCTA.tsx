"use client";

import { motion } from "framer-motion";
import { Marquee } from "./Marquee";

export function FinalCTA() {
  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Ambient glow - breathing */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none animate-breathe"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,129,96,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="section-inner px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-h2 mb-4"
            style={{ color: "var(--bg)" }}
          >
            Ready to stop missing calls?
          </h2>
          <p
            className="text-body text-lg max-w-[480px] mx-auto mb-8"
            style={{ color: "rgba(247,247,242,0.65)" }}
          >
            Hear Penny handle a real scenario in 2 minutes, or get in touch
            and tell us what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#try-penny"
              className="btn text-base px-7 py-4"
              style={{
                background: "var(--copper)",
                color: "var(--bg)",
                transition: "transform 0.25s var(--ease-out-expo)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Hear Penny in action
            </a>
            <a
              href="#contact"
              className="btn text-base px-7 py-4"
              style={{
                background: "transparent",
                color: "var(--bg)",
                border: "1px solid rgba(247,247,242,0.2)",
                transition: "transform 0.25s var(--ease-out-expo), border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.borderColor = "rgba(201,129,96,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(247,247,242,0.2)";
              }}
            >
              Talk to us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee strip on dark bg */}
      <div className="mt-16 opacity-30">
        <Marquee speed={50} reverse />
      </div>
    </section>
  );
}
