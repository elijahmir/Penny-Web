"use client";

import { motion } from "framer-motion";
import { Marquee } from "./Marquee";

export function SocialProof() {
  return (
    <section className="relative" aria-label="Social proof">
      {/* Top border accent */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border) 20%, var(--copper) 50%, var(--border) 80%, transparent)",
        }}
      />

      {/* Trust line */}
      <motion.div
        className="py-4 md:py-5 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <p
          className="text-center text-sm md:text-base font-medium tracking-wide"
          style={{ color: "var(--ink-subtle)" }}
        >
          Already filling units at{" "}
          <span style={{ color: "var(--ink-muted)" }} className="font-semibold">
            Harcourts Ulverstone &amp; Penguin Storage
          </span>
          {" - Tasmania."}
        </p>
      </motion.div>

      {/* Marquee ticker */}
      <Marquee speed={40} className="py-4 md:py-5" />

      {/* Bottom border accent */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border) 20%, var(--copper) 50%, var(--border) 80%, transparent)",
        }}
      />
    </section>
  );
}
