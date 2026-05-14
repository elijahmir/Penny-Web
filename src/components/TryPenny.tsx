"use client";

import { motion } from "framer-motion";
import { TryPennyForm } from "@/features/demo/TryPennyForm";

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
              <span style={{ color: "var(--copper)" }}>2 minutes</span>
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
            <TryPennyForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
