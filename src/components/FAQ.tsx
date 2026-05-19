"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What facilities is Penny built for?",
    a: "Penny is built specifically for self-storage. Single-site operators, multi-site groups, family-owned facilities, owner-operated yards - anywhere from 50 to several hundred units. If you take calls about storage, Penny is for you.",
  },
  {
    q: "Will my customers know they're talking to a virtual assistant?",
    a: "Penny will say so if they ask directly - but she sounds and acts like a real person, and most callers don't ask. We never pretend Penny is a specific staff member.",
  },
  {
    q: "What if someone needs to speak to me?",
    a: "Penny transfers the call to you (or whoever you nominate) straight away, with full context. No \"press 1 for service\" menus - just a warm hand-off where your team already knows the situation.",
  },
  {
    q: "How quickly can you get Penny live at my facility?",
    a: "Most facilities are live within 5–10 business days. We'll need a list of your unit sizes and rates, your gate codes, calendar access, and a chat about how you run a typical day.",
  },
  {
    q: "What does Penny cost?",
    a: "Pricing scales with the volume of calls Penny handles. We quote based on your facility size and the workflows you want her to run. For most facilities, the math works out to less than one filled unit per month - get in touch and we'll show you the numbers for your operation.",
  },
  {
    q: "What if Penny gets a question she can't answer?",
    a: "She tells the caller she'll have someone get back to them, captures the question, and notifies you. Over time, she learns the unusual stuff specific to your facility - local landmarks, trailer access, after-hours skip lockouts.",
  },
  {
    q: "Is my customers' data safe?",
    a: "Every call is encrypted in transit and at rest. Recordings and transcripts live in your private dashboard. We comply with Australian privacy law and the Privacy Act.",
  },
  {
    q: "Can I hear Penny in action before I commit?",
    a: "Yes - use the \"Try Penny\" form above. Pick a scenario, drop your number, and Penny will call you within a minute. The whole demo takes about three minutes.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section" id="faq">
      <div className="section-inner px-6">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2 mb-3">Frequently asked questions</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto divide-y" style={{ borderColor: "var(--border)" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderLeft: isOpen ? "2px solid var(--copper)" : "2px solid transparent",
                  transition: "border-color 0.3s ease",
                  paddingLeft: "12px",
                  marginLeft: "-12px",
                }}
              >
                <button
                  className="w-full flex items-center justify-between py-5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--copper)] focus-visible:ring-offset-2 rounded-sm"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span
                    className="text-base font-semibold pr-4"
                    style={{ color: "var(--ink)" }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      size={18}
                      style={{ color: isOpen ? "var(--copper)" : "var(--ink-subtle)" }}
                    />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-body pb-5 text-[15px]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
