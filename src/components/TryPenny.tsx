"use client";

import { motion } from "framer-motion";
import { Phone, Construction } from "lucide-react";

export function TryPenny() {
  return (
    <section
      className="section"
      id="try-penny"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="section-inner px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-h2 mb-3">
              Hear Penny in{" "}
              <span style={{ color: "var(--copper)" }}>30 seconds</span>
            </h2>
            <p className="text-body">
              Pick a scenario, drop your name and number, and Penny will give
              you a call right now.
            </p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="text-center py-12">
              {/* Animated icon */}
              <motion.div
                className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{ background: "rgba(201,129,96,0.1)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Phone size={28} strokeWidth={1.8} style={{ color: "var(--copper)" }} />
              </motion.div>

              {/* Status badge */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
                style={{
                  background: "rgba(201,129,96,0.08)",
                  color: "var(--copper-deep)",
                }}
              >
                <Construction size={12} />
                In development
              </span>

              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--ink)" }}
              >
                Live demo calling is coming soon
              </h3>
              <p className="text-body text-[15px] max-w-[380px] mx-auto mb-6">
                We&apos;re still polishing this feature. Once ready, you&apos;ll
                be able to receive a live call from Penny right here.
              </p>

              {/* CTA to contact instead */}
              <a
                href="#contact"
                className="btn btn-primary text-base px-7 py-4"
              >
                Get in touch instead
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
