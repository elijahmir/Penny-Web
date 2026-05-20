"use client";

import { motion } from "framer-motion";
import {
  Phone,
  ListChecks,
  CalendarCheck,
  CreditCard,
  KeyRound,
  ClipboardList,
} from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Picks up at 2am, 6pm, weekends, public holidays",
    description:
      "Every after-hours enquiry is a real conversation, not a voicemail. The first facility to answer almost always gets the move-in.",
    layout: "hero" as const,
    colSpan: "md:col-span-4",       // Row 1: 4 + 2 = 6
  },
  {
    icon: ListChecks,
    title: "Rings the waitlist the moment a unit opens",
    description:
      "No more working down the list by hand. The minute a unit clears, Penny rings every name in order and locks in the first taker.",
    layout: "standard" as const,
    colSpan: "md:col-span-2",       // Row 1: 4 + 2 = 6
  },
  {
    icon: CalendarCheck,
    title: "Books tours and confirms move-ins",
    description:
      "Penny offers real times, locks in the tour on the call, and sends the confirmation by email or text.",
    layout: "standard" as const,
    colSpan: "md:col-span-3",       // Row 2: 3 + 3 = 6
  },
  {
    icon: CreditCard,
    title: "Chases overdue accounts",
    description:
      "The phone call no one wants to make. Penny does it on day one, day three, day seven. Warmly, never accusatory, always clear.",
    layout: "standard" as const,
    colSpan: "md:col-span-3",       // Row 2: 3 + 3 = 6
  },
  {
    icon: KeyRound,
    title: "Welcomes new customers and explains access",
    description:
      "Gate codes, access hours, after-hours contact. Penny walks every new customer through it so they don't ring you on Saturday.",
    layout: "standard" as const,
    colSpan: "md:col-span-2",       // Row 3: 2 + 4 = 6
  },
  {
    icon: ClipboardList,
    title: "Logs every conversation in one place",
    description:
      "Names, sizes asked about, move-in dates, payment commitments. Every call written down in a searchable dashboard. No more guessing.",
    layout: "wide" as const,
    colSpan: "md:col-span-4",       // Row 3: 2 + 4 = 6
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
  hidden: (custom: number) => ({
    opacity: 0,
    y: 20,
    x: custom % 2 === 0 ? -12 : 12,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function FeatureGrid() {
  return (
    <section className="section-xl" id="features">
      <div className="section-inner-wide px-6">
        <motion.div
          className="mb-12 md:mb-16 max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2 mb-4">
            Built for the way a storage facility{" "}
            <span style={{ color: "var(--copper)" }}>actually runs</span>
          </h2>
          <p className="text-body">
            Six things Penny does at your facility every day - without a single
            missed call, late arrival, or unfilled unit.
          </p>
        </motion.div>

        {/* Bento grid — asymmetric layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-6 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature, featureIndex) => {
            const Icon = feature.icon;
            const isHero = feature.layout === "hero";
            const isWide = feature.layout === "wide";

            return (
              <motion.div
                key={feature.title}
                className={`group cursor-default interactive-card ${feature.colSpan} ${
                  isHero
                    ? "card-featured shimmer-on-hover"
                    : isWide
                      ? "card-featured shimmer-on-hover"
                      : "card"
                }`}
                custom={featureIndex}
                variants={itemVariants}
                style={
                  isHero
                    ? {
                        background:
                          "linear-gradient(135deg, var(--bg-elevated) 0%, oklch(0.65 0.11 55 / 0.03) 100%)",
                      }
                    : isWide
                      ? {
                          background:
                            "linear-gradient(90deg, var(--bg-elevated) 0%, oklch(0.65 0.11 55 / 0.02) 100%)",
                        }
                      : undefined
                }
              >
                <div
                  className={`flex ${isWide ? "flex-col sm:flex-row" : ""} items-start gap-4`}
                >
                  <div
                    className={`shrink-0 rounded-lg flex items-center justify-center ${
                      isHero || isWide ? "w-12 h-12" : "w-10 h-10"
                    }`}
                    style={{
                      background: "oklch(0.65 0.11 55 / 0.1)",
                      transition: "transform 0.3s var(--ease-spring)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform =
                        "scale(1.12) rotate(-8deg)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform =
                        "scale(1) rotate(0deg)")
                    }
                  >
                    <Icon
                      size={isHero || isWide ? 22 : 20}
                      strokeWidth={1.8}
                      style={{ color: "var(--copper)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`font-semibold mb-2 ${
                        isHero ? "text-xl" : isWide ? "text-lg" : "text-base"
                      }`}
                      style={{ color: "var(--ink)" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`text-body ${
                        isHero
                          ? "text-base max-w-[520px]"
                          : isWide
                            ? "text-[15px] max-w-[640px]"
                            : "text-[15px]"
                      }`}
                    >
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
