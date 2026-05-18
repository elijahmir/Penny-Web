"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Clock,
  Globe,
  TrendingUp,
  CalendarCheck,
  DollarSign,
  Users,
} from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const options = [
  {
    icon: Phone,
    badge: "Voice AI",
    badgeColor: "#C98160",
    title: "Penny on the Phone",
    subtitle: "Inbound and outbound calls",
    description:
      "Penny answers every call instantly, qualifies leads, books tours, chases overdue accounts, and works through your waitlist with a warm natural voice. Your team focuses on closings while Penny handles the volume.",
    features: [
      { icon: Clock, label: "Answers calls 24/7, zero hold time" },
      { icon: CalendarCheck, label: "Books tours and confirms appointments" },
      { icon: TrendingUp, label: "Outbound waitlist and collections calls" },
    ],
    stat: { value: "100%", label: "of calls answered" },
    cta: "Hear the demo",
    ctaHref: "#try-penny",
    ctaAction: "phone",
    highlight: true,
  },
  {
    icon: MessageCircle,
    badge: "Chat AI",
    badgeColor: "#7B9E8A",
    title: "Penny on Your Website",
    subtitle: "Embedded chat assistant",
    description:
      "Drop Penny into any storage facility website. She guides visitors, answers pricing and availability questions, fills enquiry forms automatically, and captures leads while your team sleeps.",
    features: [
      { icon: Globe, label: "Embeds on any page of your website" },
      { icon: Users, label: "Guides visitors and fills forms automatically" },
      { icon: DollarSign, label: "Converts browsers into paying tenants" },
    ],
    stat: { value: "Setup", label: "by our onboarding team" },
    cta: "Chat with Penny",
    ctaHref: "#try-penny",
    ctaAction: "chat",
    highlight: false,
  },
];

type Props = {
  onSelectTab?: (tab: "phone" | "chat") => void;
};

export function PennyOptions({ onSelectTab }: Props) {
  return (
    <section
      className="section"
      id="penny-options"
      style={{ background: "var(--bg)" }}
      aria-labelledby="penny-options-heading"
    >
      <div className="section-inner px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={FADE_UP}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--copper)",
              borderBottom: "1px solid rgba(201,129,96,0.35)",
              paddingBottom: "4px",
              marginBottom: "16px",
            }}
          >
            Two ways to deploy Penny
          </span>
          <h2 id="penny-options-heading" className="text-h2 mb-4">
            One AI. Phone calls{" "}
            <span style={{ color: "var(--copper)" }}>and</span> your website.
          </h2>
          <p className="text-body" style={{ maxWidth: 520, margin: "0 auto" }}>
            Penny works where your tenants are, whether they are calling your facility
            or browsing your website at midnight.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "28px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {options.map((opt, i) => {
            const Icon = opt.icon;

            return (
              <motion.div
                key={opt.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0 }}
                variants={FADE_UP}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: opt.highlight ? "#242321" : "var(--bg-elevated)",
                  border: `1px solid ${opt.highlight ? "transparent" : "rgba(201,129,96,0.15)"}`,
                  padding: "36px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Corner accent */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle at 100% 0%, ${opt.badgeColor}28 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Badge */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: opt.badgeColor,
                    border: `1px solid ${opt.badgeColor}55`,
                    padding: "3px 10px",
                    marginBottom: "20px",
                    alignSelf: "flex-start",
                  }}
                >
                  {opt.badge}
                </span>

                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `${opt.badgeColor}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color={opt.badgeColor} strokeWidth={1.5} />
                </div>

                {/* Title block */}
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 500,
                    color: opt.highlight ? "#F7F7F2" : "#242321",
                    margin: "0 0 4px 0",
                    lineHeight: 1.2,
                  }}
                >
                  {opt.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: opt.badgeColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    margin: "0 0 16px 0",
                  }}
                >
                  {opt.subtitle}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: opt.highlight ? "rgba(247,247,242,0.85)" : "var(--ink-muted)",
                    margin: "0 0 24px 0",
                  }}
                >
                  {opt.description}
                </p>

                {/* Feature list */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 24px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flex: 1,
                  }}
                >
                  {opt.features.map((f) => {
                    const FIcon = f.icon;
                    return (
                      <li
                        key={f.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          fontSize: "14px",
                          color: opt.highlight ? "rgba(247,247,242,0.88)" : "var(--ink-muted)",
                        }}
                      >
                        <FIcon size={14} color={opt.badgeColor} strokeWidth={2} style={{ flexShrink: 0 }} />
                        {f.label}
                      </li>
                    );
                  })}
                </ul>

                {/* Stat pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: "6px",
                    background: `${opt.badgeColor}14`,
                    border: `1px solid ${opt.badgeColor}30`,
                    padding: "8px 14px",
                    marginBottom: "24px",
                    alignSelf: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: opt.badgeColor,
                      lineHeight: 1,
                    }}
                  >
                    {opt.stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: opt.highlight ? "rgba(247,247,242,0.65)" : "var(--ink-muted)",
                    }}
                  >
                    {opt.stat.label}
                  </span>
                </div>

                {/* CTA */}
                <a
                  href={opt.ctaHref}
                  onClick={(e) => {
                    if (onSelectTab && (opt.ctaAction === "phone" || opt.ctaAction === "chat")) {
                      e.preventDefault();
                      onSelectTab(opt.ctaAction as "phone" | "chat");
                      setTimeout(() => {
                        document
                          .getElementById("try-penny")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                    }
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    alignSelf: "flex-start",
                    padding: "12px 24px",
                    fontSize: "14px",
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    background: opt.highlight ? opt.badgeColor : "#242321",
                    color: "#F7F7F2",
                    transition: "opacity 0.2s, transform 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  {opt.cta}
                  <span style={{ opacity: 0.7 }}>&#8594;</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
