"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutTemplate,
  Globe,
  CheckCircle2,
  ChevronRight,
  Building2,
  Zap,
  Headphones,
} from "lucide-react";
import styles from "./PennyEmbed.module.css";

type EmbedMode = "tab" | "widget";

const MODES = [
  {
    id: "tab" as EmbedMode,
    icon: LayoutTemplate,
    label: "Embedded Tab",
    desc: "Penny sits neatly in a fixed tab on the corner of every page. Visitors click to open a full chat window without leaving the page.",
  },
  {
    id: "widget" as EmbedMode,
    icon: Globe,
    label: "Floating Widget",
    desc: "Penny proactively greets visitors with a floating bubble. Ideal for high-intent pages like pricing and availability.",
  },
];

const BUSINESS_POINTS = [
  {
    icon: Building2,
    title: "Built for storage facilities",
    desc: "Penny knows your industry. Unit types, move-in processes, insurance, access codes — she handles it all without needing configuration.",
  },
  {
    icon: Zap,
    title: "Deployed by our team",
    desc: "We handle the integration for you. No developer required. Our onboarding team configures Penny to match your brand and workflows.",
  },
  {
    icon: Headphones,
    title: "Ongoing support included",
    desc: "Penny is not a plugin you install and forget. Our team monitors performance and updates her as your business changes.",
  },
];

// ─── Animated browser preview ─────────────────────────────────────────────────

function EmbedPreview({ mode }: { mode: EmbedMode }) {
  return (
    <div className={styles.browserFrame}>
      <div className={styles.browserBar}>
        <span className={styles.dot} style={{ background: "#FF5F57" }} />
        <span className={styles.dot} style={{ background: "#FEBC2E" }} />
        <span className={styles.dot} style={{ background: "#28C840" }} />
        <div className={styles.urlBar}>yourstorage.com.au</div>
      </div>

      <div className={styles.pageContent}>
        <div className={styles.pageLine} style={{ width: "60%" }} />
        <div className={styles.pageLine} style={{ width: "40%" }} />
        <div className={styles.pageLine} style={{ width: "80%" }} />
        <div className={styles.pageLine} style={{ width: "55%" }} />
        <div className={styles.pageLine} style={{ width: "70%" }} />
        <div className={styles.pageLine} style={{ width: "35%" }} />

        <AnimatePresence mode="wait">
          {mode === "tab" ? (
            <motion.div
              key="tab-mode"
              className={styles.pennyTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className={styles.tabBubble}>
                <span className={styles.tabDot} />
                <span className={styles.tabLabel}>Chat with us</span>
              </div>
              <div className={styles.tabPanel}>
                <div className={styles.miniHeader}>
                  <span className={styles.miniDot} />
                  <span className={styles.miniName}>Penny</span>
                </div>
                <div className={styles.miniMsg} style={{ alignSelf: "flex-start" }}>
                  Hi! I can help with pricing, availability, or book a tour.
                </div>
                <div className={styles.miniMsg} style={{ alignSelf: "flex-end", background: "#242321", color: "#F7F7F2" }}>
                  What sizes do you have?
                </div>
                <div className={styles.miniInput}>
                  <span style={{ flex: 1, color: "#aba9a4", fontSize: "10px" }}>Type a message...</span>
                  <ChevronRight size={12} color="#C98160" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="widget-mode"
              className={styles.pennyWidget}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35, type: "spring", bounce: 0.3 }}
            >
              <div className={styles.widgetFab}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div className={styles.widgetBadge}>1</div>
              <motion.div
                className={styles.widgetTooltip}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                Hi there! Need help finding a unit?
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function PennyEmbed() {
  const [activeMode, setActiveMode] = useState<EmbedMode>("tab");

  // Auto-toggle to show both modes
  useEffect(() => {
    const id = setInterval(() => {
      setActiveMode((m) => (m === "tab" ? "widget" : "tab"));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const activeModeData = MODES.find((m) => m.id === activeMode)!;

  return (
    <section
      className="section"
      id="penny-embed"
      style={{ background: "var(--bg-elevated)" }}
      aria-labelledby="embed-heading"
    >
      <div className="section-inner px-6">
        <div className={styles.grid}>
          {/* Left: copy */}
          <motion.div
            className={styles.copyCol}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.eyebrow}>Penny on your website</span>
            <h2 id="embed-heading" className="text-h2 mb-4">
              Your website, with{" "}
              <span style={{ color: "var(--copper)" }}>an AI that works</span>
            </h2>
            <p className="text-body mb-8">
              Penny can live on your storage facility website as a chat assistant.
              She handles enquiries, qualifies visitors, and books tours around the
              clock, so your team does not have to be online to capture every lead.
            </p>

            {/* Mode toggle */}
            <div className={styles.modeToggle} role="group" aria-label="Choose embed style">
              {MODES.map((m) => {
                const MIcon = m.icon;
                return (
                  <button
                    key={m.id}
                    className={`${styles.modeBtn} ${activeMode === m.id ? styles.modeBtnActive : ""}`}
                    onClick={() => setActiveMode(m.id)}
                  >
                    <MIcon size={14} strokeWidth={1.75} />
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Mode description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeMode}
                className={styles.modeDesc}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeModeData.desc}
              </motion.p>
            </AnimatePresence>

            {/* Business points */}
            <div className={styles.businessPoints}>
              {BUSINESS_POINTS.map((pt) => {
                const PIcon = pt.icon;
                return (
                  <div key={pt.title} className={styles.bpRow}>
                    <div className={styles.bpIcon}>
                      <PIcon size={16} color="#C98160" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className={styles.bpTitle}>{pt.title}</p>
                      <p className={styles.bpDesc}>{pt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className={styles.embedCta}>
              <CheckCircle2 size={14} color="#7B9E8A" strokeWidth={2} />
              <span>Discuss which option suits your facility</span>
              <a href="#contact" className={styles.embedCtaLink}>
                Talk to us &#8594;
              </a>
            </div>
          </motion.div>

          {/* Right: animated preview */}
          <motion.div
            className={styles.previewCol}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <EmbedPreview mode={activeMode} />

            <AnimatePresence mode="wait">
              <motion.p
                key={activeMode}
                className={styles.previewLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeMode === "tab"
                  ? "Embedded tab: sits neatly in the corner, always available"
                  : "Floating widget: greets visitors at the right moment"}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
