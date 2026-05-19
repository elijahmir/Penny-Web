"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Phone,
  CalendarCheck,
  DollarSign,
  Activity,
  BarChart3,
  Search,
  ClipboardList,
  Settings,
} from "lucide-react";

/* ─── Count-up hook (self-triggering via IntersectionObserver) ──────────────
 *  - Ease-out-expo for a satisfying deceleration curve
 *  - Fires once, on first intersection (threshold 0.3)
 *  - Returns formatted string with locale-aware comma separators
 *  - `done` flag enables a subtle scale pulse on completion
 *  - Snaps to final value immediately when reduced motion is preferred
 *────────────────────────────────────────────────────────────────────────── */

function formatValue(prefix: string, n: number, suffix: string) {
  return `${prefix}${n.toLocaleString()}${suffix}`;
}

function useCountUp(
  target: number,
  opts: { duration?: number; prefix?: string; suffix?: string } = {},
) {
  const { duration = 1800, prefix = "", suffix = "" } = opts;
  const prefersReducedMotion = useReducedMotion();

  // Eagerly resolve to final value when reduced motion is on
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion
      ? formatValue(prefix, target, suffix)
      : formatValue(prefix, 0, suffix),
  );
  const [done, setDone] = useState(() => !!prefersReducedMotion);

  const startedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Callback ref - sets up the IntersectionObserver when the DOM node mounts
  const countRef = useCallback(
    (el: HTMLSpanElement | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!el || prefersReducedMotion || startedRef.current) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || startedRef.current) return;
          startedRef.current = true;

          const t0 = performance.now();
          function tick(now: number) {
            const elapsed = now - t0;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out-expo: fast start, gentle settle
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.round(eased * target);
            setDisplay(formatValue(prefix, current, suffix));
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDone(true);
            }
          }
          requestAnimationFrame(tick);
        },
        { threshold: 0.3 },
      );

      observerRef.current.observe(el);
    },
    [target, duration, prefix, suffix, prefersReducedMotion],
  );

  return { countRef, display, done };
}

/* ─── Mini dashboard sub-components ────────────────────────────────────────── */

function StatCard({
  icon: Icon,
  display,
  done,
  countRef,
  label,
  color,
  delay = 0,
}: {
  icon: React.ComponentType<{ size: number; strokeWidth: number; style: React.CSSProperties }>;
  display: string;
  done: boolean;
  countRef: (el: HTMLSpanElement | null) => void;
  label: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "10px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Icon size={16} strokeWidth={1.8} style={{ color, flexShrink: 0 }} />
      <span
        ref={countRef}
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#F7F7F2",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: done ? "scale(1)" : "scale(0.92)",
        }}
      >
        {display}
      </span>
      <span style={{ fontSize: "11px", color: "rgba(247,247,242,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </span>
    </motion.div>
  );
}

function ActivityFeed() {
  const items = [
    { time: "2 min ago", text: "Tour booked - Unit 14B, Wednesday 10am", color: "#7B9E8A" },
    { time: "8 min ago", text: "Waitlist call completed - Sarah T. confirmed", color: "#C98160" },
    { time: "15 min ago", text: "Overdue reminder sent - Account #1847", color: "#E8A87C" },
    { time: "22 min ago", text: "New enquiry captured - 3×3 unit, Devonport", color: "#7B9E8A" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Feed header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Activity size={12} strokeWidth={2} style={{ color: "#7B9E8A" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(247,247,242,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Live Activity
          </span>
        </div>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#7B9E8A",
            display: "inline-block",
          }}
          className="animate-glow-pulse"
        />
      </div>

      {/* Feed items */}
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.35 }}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "10px 14px",
            borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: item.color,
              marginTop: "5px",
              flexShrink: 0,
            }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: "12px", color: "rgba(247,247,242,0.8)", margin: 0, lineHeight: 1.4 }}>
              {item.text}
            </p>
            <span style={{ fontSize: "10px", color: "rgba(247,247,242,0.35)" }}>
              {item.time}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MiniBarChart() {
  const bars = [35, 52, 44, 68, 55, 72, 60];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "10px",
        padding: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "12px",
        }}
      >
        <BarChart3 size={12} strokeWidth={2} style={{ color: "var(--copper)" }} />
        <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(247,247,242,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Weekly Calls
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "48px" }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: 1,
              background: `linear-gradient(to top, var(--copper), rgba(201,129,96,0.4))`,
              borderRadius: "3px 3px 0 0",
              minHeight: "4px",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
        {days.map((d) => (
          <span
            key={d}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "9px",
              color: "rgba(247,247,242,0.35)",
            }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature list ─────────────────────────────────────────────────────────── */

const features = [
  {
    icon: Search,
    title: "Searchable transcripts",
    desc: "Every call recorded, transcribed, and searchable. Find any conversation in seconds.",
  },
  {
    icon: ClipboardList,
    title: "Task management",
    desc: "Follow-ups, callbacks, and to-dos generated automatically from Penny's calls.",
  },
  {
    icon: BarChart3,
    title: "Performance analytics",
    desc: "Track call volume, conversion rates, and facility occupancy trends over time.",
  },
  {
    icon: Settings,
    title: "Configurable workflows",
    desc: "Customise how Penny responds, who gets notified, and which workflows she runs.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ─── Main section ─────────────────────────────────────────────────────────── */

export function CRMShowcase() {
  // Each counter self-triggers via its own IntersectionObserver
  const callsUp = useCountUp(847, { duration: 1600 });
  const toursUp = useCountUp(124, { duration: 1400 });
  const collectedUp = useCountUp(38, { duration: 1200, prefix: "$", suffix: "k" });

  return (
    <section
      className="section"
      id="crm"
      style={{ background: "var(--bg)" }}
      aria-labelledby="crm-heading"
    >
      <div className="section-inner-wide px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="lg:!grid-cols-[1fr_1.15fr]"
        >
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--copper)",
                borderBottom: "1px solid rgba(201,129,96,0.35)",
                paddingBottom: "4px",
                marginBottom: "16px",
              }}
            >
              Penny Dashboard
            </span>
            <h2 id="crm-heading" className="text-h2 mb-4">
              Your command centre for{" "}
              <span style={{ color: "var(--copper)" }}>every conversation</span>
            </h2>
            <p className="text-body mb-8" style={{ maxWidth: 460 }}>
              Every call, chat, and action logged in one place. Search transcripts,
              track performance, and configure Penny&apos;s workflows - no phone
              tag required.
            </p>

            {/* Feature list */}
            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    variants={featureItemVariants}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "8px",
                        background: "rgba(201,129,96,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                        style={{ color: "var(--copper)" }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--ink)",
                          margin: "0 0 2px 0",
                        }}
                      >
                        {f.title}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.5,
                          color: "var(--ink-muted)",
                          margin: 0,
                        }}
                      >
                        {f.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div
              style={{
                background: "#242321",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              }}
            >
              {/* Dashboard header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "6px",
                      background: "var(--copper)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>P</span>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(247,247,242,0.9)" }}>
                    Penny Dashboard
                  </span>
                </div>
                <span style={{ fontSize: "10px", color: "rgba(247,247,242,0.35)" }}>
                  Harcourts Ulverstone & Penguin
                </span>
              </div>

              {/* Stat cards row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <StatCard
                  icon={Phone}
                  display={callsUp.display}
                  done={callsUp.done}
                  countRef={callsUp.countRef}
                  label="Calls handled"
                  color="#C98160"
                  delay={0.1}
                />
                <StatCard
                  icon={CalendarCheck}
                  display={toursUp.display}
                  done={toursUp.done}
                  countRef={toursUp.countRef}
                  label="Tours booked"
                  color="#7B9E8A"
                  delay={0.2}
                />
                <StatCard
                  icon={DollarSign}
                  display={collectedUp.display}
                  done={collectedUp.done}
                  countRef={collectedUp.countRef}
                  label="Overdue collected"
                  color="#E8A87C"
                  delay={0.3}
                />
              </div>

              {/* Bottom: Activity feed + Chart */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "10px",
                }}
                className="md:!grid-cols-2"
              >
                <ActivityFeed />
                <MiniBarChart />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
