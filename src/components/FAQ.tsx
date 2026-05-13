"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is she an AI or a real person?",
    a: "Penny is a virtual phone assistant powered by voice AI. She sounds natural, follows your script, and handles calls exactly the way you've trained her. She's not a person, but she gets the job done like one.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are up and running inside a week. The setup call takes about an hour; the rest is us building the script and connecting your systems.",
  },
  {
    q: "What happens if Penny can't handle a call?",
    a: "She transfers to your team with full context: what was said, what was asked, what was tried. Your people pick up already in the loop.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on volume and complexity. We'll give you a transparent quote after the discovery call. No lock-in contracts.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Row-level security keeps your data isolated. We don't sell or share anything. Full audit trail on every call.",
  },
  {
    q: "Can I change the script later?",
    a: "Absolutely. Change it anytime through your dashboard. Most tweaks go live immediately.",
  },
  {
    q: "Does she work outside Australia?",
    a: "Penny can call Australian numbers today. International is on the roadmap. Let us know if you need it and we'll prioritise.",
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
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
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
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
