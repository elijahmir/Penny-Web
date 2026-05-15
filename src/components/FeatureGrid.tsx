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
      "Every after-hours enquiry is a real conversation, not a voicemail. The first facility to answer almost always gets the move-in - that's now you, every time.",
    span: "featured", // large card
  },
  {
    icon: ListChecks,
    title: "Rings the waitlist the moment a unit opens",
    description:
      "No more working down the list by hand. The minute a unit clears, Penny rings every name in order, presents the unit, and locks in the first taker. Usually the same day.",
    span: "normal",
  },
  {
    icon: CalendarCheck,
    title: "Books tours and confirms move-ins",
    description:
      "Penny offers real times against your calendar, locks in the tour on the call, and sends the confirmation by email or text. The customer arrives expected and ready.",
    span: "normal",
  },
  {
    icon: CreditCard,
    title: "Chases overdue accounts - politely, persistently",
    description:
      "The phone call no one wants to make. Penny does it on day one, day three, day seven - warmly, never accusatory, always clear about what's owed and what happens next.",
    span: "normal",
  },
  {
    icon: KeyRound,
    title: "Welcomes new customers and explains access",
    description:
      "Gate codes, access hours, after-hours contact, agreement signing. Penny walks every new customer through it so they don't ring you on Saturday asking how to get in.",
    span: "normal",
  },
  {
    icon: ClipboardList,
    title: "Logs every conversation in one place",
    description:
      "Names, sizes asked about, move-in dates, payment commitments, complaints - every call written down in a dashboard you can search. No more \"did anyone follow up with Mark from Wynyard?\"",
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
            Built for the way a storage facility{" "}
            <span style={{ color: "var(--copper)" }}>actually runs</span>
          </h2>
          <p className="text-body">
            Six things Penny does at your facility every day - without a
            single missed call, late arrival, or unfilled unit.
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
          {features.map((feature) => {
            const Icon = feature.icon;
            const isFeatured = feature.span === "featured";
            return (
              <motion.div
                key={feature.title}
                className={`group cursor-default interactive-card ${
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
