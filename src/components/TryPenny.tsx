"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { TryPennyForm } from "@/features/demo/TryPennyForm";
import { PennyChatDemo } from "@/features/chat/PennyChatDemo";

type Tab = "phone" | "chat";

type Props = {
  /** Allows parent (page.tsx) to pre-select a tab via PennyOptions CTA */
  defaultTab?: Tab;
};

export function TryPenny({ defaultTab = "phone" }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  const tabContent = {
    phone: {
      heading: (
        <>
          Hear Penny in{" "}
          <span style={{ color: "var(--copper)" }}>2 minutes</span>
        </>
      ),
      body: "Pick a scenario, drop your name and number, and Penny will give you a call right now.",
    },
    chat: {
      heading: (
        <>
          Chat with Penny{" "}
          <span style={{ color: "#7B9E8A" }}>right now</span>
        </>
      ),
      body: "See how Penny guides website visitors. She can scroll the page, highlight features, and capture your details automatically.",
    },
  };

  const current = tabContent[activeTab];

  return (
    <section
      className="section-xl"
      id="try-penny"
      style={{ background: "var(--bg-elevated)" }}
      aria-labelledby="try-penny-heading"
    >
      <div className="section-inner px-6">
        <div className="max-w-xl mx-auto">
          {/* Section header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + "-heading"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <h2 id="try-penny-heading" className="text-h2 mb-3">
                  {current.heading}
                </h2>
                <p className="text-body">{current.body}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            style={{
              display: "flex",
              background: "var(--bg)",
              border: "1px solid rgba(201,129,96,0.2)",
              marginBottom: "24px",
              position: "relative",
            }}
            role="tablist"
            aria-label="Penny demo mode"
          >
            {(["phone", "chat"] as Tab[]).map((tab) => {
              const isActive = activeTab === tab;
              const Icon = tab === "phone" ? Phone : MessageCircle;
              const accentColor = tab === "phone" ? "var(--copper)" : "#7B9E8A";
              const label = tab === "phone" ? "Phone Demo" : "Chat Demo";

              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab}`}
                  id={`tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "13px 16px",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.03em",
                    border: "none",
                    borderBottom: isActive
                      ? `2px solid ${accentColor}`
                      : "2px solid transparent",
                    background: isActive ? "var(--bg-elevated)" : "transparent",
                    color: isActive ? (tab === "phone" ? "var(--copper)" : "#7B9E8A") : "var(--ink-muted)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    position: "relative",
                  }}
                >
                  <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
                  {label}
                </button>
              );
            })}
          </motion.div>

          {/* Tab panel */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "phone" ? (
                <motion.div
                  key="phone-panel"
                  id="tabpanel-phone"
                  role="tabpanel"
                  aria-labelledby="tab-phone"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                >
                  <TryPennyForm />
                </motion.div>
              ) : (
                <motion.div
                  key="chat-panel"
                  id="tabpanel-chat"
                  role="tabpanel"
                  aria-labelledby="tab-chat"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <PennyChatDemo onSwitchToPhone={() => setActiveTab("phone")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cross-promote the other mode */}
          <motion.p
            className="text-center"
            style={{
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "16px",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {activeTab === "phone" ? (
              <>
                Want to see the website experience?{" "}
                <button
                  onClick={() => setActiveTab("chat")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#7B9E8A",
                    cursor: "pointer",
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    padding: 0,
                    borderBottom: "1px solid rgba(123,158,138,0.4)",
                  }}
                >
                  Try the chat demo
                </button>
              </>
            ) : (
              <>
                Rather hear Penny&apos;s voice?{" "}
                <button
                  onClick={() => setActiveTab("phone")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--copper)",
                    cursor: "pointer",
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    padding: 0,
                    borderBottom: "1px solid rgba(201,129,96,0.4)",
                  }}
                >
                  Try the phone demo
                </button>
              </>
            )}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
