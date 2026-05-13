"use client";

import { motion } from "framer-motion";
import {
  Phone,
  CalendarCheck,
  Mail,
  ClipboardList,
  UserCheck,
  Plug,
} from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Always answering, always calling",
    description:
      "24/7 coverage means no missed calls and no after-hours bottleneck. Penny picks up at 2am, books at 6pm, and follows up while you're at lunch.",
    span: "featured", // large card
  },
  {
    icon: CalendarCheck,
    title: "Books and confirms appointments",
    description:
      "Penny checks your calendar, offers real times, and locks in the booking on the call. Confirmations go out by email or SMS automatically.",
    span: "normal",
  },
  {
    icon: Mail,
    title: "Sends emails and SMS",
    description:
      "The right message to the right person at the right time: receipts, reminders, paperwork links, follow-up notes. Already drafted, already sent.",
    span: "normal",
  },
  {
    icon: ClipboardList,
    title: "Captures the right details, every time",
    description:
      "Names, addresses, preferences, structured information. All recorded accurately and stored in one place you can search and review.",
    span: "normal",
  },
  {
    icon: UserCheck,
    title: "Hands off to a human when it matters",
    description:
      "If the call needs a real person, Penny transfers warmly with full context. Your team picks up already knowing the situation.",
    span: "normal",
  },
  {
    icon: Plug,
    title: "Plugs into the tools you already use",
    description:
      "Calendars, CRMs, inboxes, documents, payment links. Penny works with what you've got. No replatforming, no migration project.",
    span: "featured", // large card
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function FeatureGrid() {
  return (
    <section className="section" id="features">
      <div className="section-inner-wide px-6">
        <motion.div
          className="mb-12 md:mb-16 max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2 mb-4">
            Everything she does, done{" "}
            <span style={{ color: "var(--copper)" }}>well</span>
          </h2>
          <p className="text-body">
            Six things Penny handles every day, without a single complaint,
            sick day, or dropped call.
          </p>
        </motion.div>

        {/* Asymmetric bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isFeatured = feature.span === "featured";
            return (
              <motion.div
                key={feature.title}
                className={`group cursor-default ${
                  isFeatured
                    ? "card-featured lg:col-span-2"
                    : "card"
                }`}
                variants={itemVariants}
                style={
                  isFeatured
                    ? { background: "linear-gradient(135deg, var(--bg-elevated) 0%, rgba(201,129,96,0.03) 100%)" }
                    : undefined
                }
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 rounded-lg flex items-center justify-center ${
                      isFeatured ? "w-12 h-12" : "w-10 h-10"
                    }`}
                    style={{ background: "rgba(201,129,96,0.1)" }}
                  >
                    <Icon
                      size={isFeatured ? 22 : 20}
                      strokeWidth={1.8}
                      style={{ color: "var(--copper)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`font-semibold mb-2 ${
                        isFeatured ? "text-xl" : "text-lg"
                      }`}
                      style={{ color: "var(--ink)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className={`text-body ${isFeatured ? "text-base max-w-[520px]" : "text-[15px]"}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
