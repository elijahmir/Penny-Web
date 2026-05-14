"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquareText,
    title: "Tell us how your facility runs.",
    description:
      "We sit down with you for an hour and map out the calls you wish you didn't have to make. The waitlist. The tours. The chasers. The new-customer welcomes.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "We set Penny up with your facility's details.",
    description:
      "Your unit sizes and rates, your gate codes, your access hours, your calendar, your billing. Penny learns the facility and the way you talk about your customers. Usually live within a week.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "She picks up and starts calling.",
    description:
      "Every conversation lands in a dashboard you can read, search, and listen back to. You see what worked, you tweak what didn't, and Penny gets better every week.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="section-inner px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2 mb-4">
            Live at your facility in{" "}
            <span style={{ color: "var(--copper)" }}>days, not months</span>
          </h2>
          <p className="text-body max-w-[480px] mx-auto">
            Three steps. No jargon. No IT project. No new system for your team to learn.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-8 left-[16.7%] right-[16.7%] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--border) 15%, var(--border) 85%, transparent)",
            }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="text-center relative"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span
                    className="text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: "var(--ink)",
                      color: "var(--bg)",
                    }}
                  >
                    {step.number}
                  </span>
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    style={{ color: "var(--copper)" }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--ink)" }}
                >
                  {step.title}
                </h3>
                <p className="text-body text-[15px] max-w-[320px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
