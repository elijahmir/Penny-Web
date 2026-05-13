"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye } from "lucide-react";

const badges = [
  {
    icon: Shield,
    label: "Bot protection",
    description: "Every form secured with Turnstile verification.",
  },
  {
    icon: Lock,
    label: "Row-level security",
    description: "Your data stays isolated, always.",
  },
  {
    icon: Eye,
    label: "Privacy-first",
    description: "No tracking pixels, no third-party analytics.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function SecurityTrust() {
  return (
    <section className="section">
      <div className="section-inner px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h3 mb-3">Built with privacy and security in mind</h2>
          <p className="text-body max-w-[440px] mx-auto">
            Your data doesn&apos;t go anywhere it shouldn&apos;t.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                className="text-center"
                variants={itemVariants}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(201,129,96,0.1)" }}
                >
                  <Icon size={20} strokeWidth={1.8} style={{ color: "var(--copper)" }} />
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--ink)" }}>
                  {badge.label}
                </p>
                <p className="text-caption">{badge.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
