"use client";

import { motion } from "framer-motion";

const useCases = [
  {
    tag: "Waitlist",
    title: "Fill empty units before they cost you a month's rent.",
    story:
      "A unit opens. Within the hour Penny has rung every name on your waitlist in order, presented the unit and the price, and booked the first taker. You wake up to a filled unit and a signed agreement waiting in your inbox.",
    tasks: [
      "Rings the waitlist",
      "Presents the unit and price",
      "Books on the call",
      "Sends the agreement link",
      "Logs every conversation",
    ],
  },
  {
    tag: "Inbound",
    title: "Every missed call is money your competitor just earned.",
    story:
      "Penny picks up every call you don't, day or night. She finds out what size they need, when they want to move in, and books them in for a tour - or signs them on the spot if a unit's free. You see the result before you've finished your coffee.",
    tasks: [
      "Answers 24/7",
      "Qualifies the enquiry",
      "Books the tour",
      "Captures contact details",
      "Notifies you straight away",
    ],
  },
  {
    tag: "Tours",
    title: "Tours that actually happen.",
    story:
      "Penny books the tour, confirms it the day before, and reschedules when life happens. Your prospect arrives expected, the unit's ready, and you spend ten minutes closing instead of two days playing phone tag.",
    tasks: [
      "Offers real times",
      "Confirms 24 hours before",
      "Handles reschedules",
      "Notifies your on-site team",
    ],
  },
  {
    tag: "Move-in",
    title: "A warm welcome that doesn't fall on your shoulders.",
    story:
      "Move-in day. Penny rings the new customer, confirms the time, walks them through the gate code, the access hours, and the after-hours contact. You don't get a Saturday text saying \"I can't get in.\"",
    tasks: [
      "Confirms move-in time",
      "Explains gate access",
      "Sends the agreement",
      "Triggers the welcome email",
    ],
  },
  {
    tag: "Collections",
    title: "The phone call you've been putting off - handled.",
    story:
      "Day one late, day three, day seven. Penny rings politely, finds out what's going on, takes a payment commitment on the call, and sends the link to settle. The conversation you hate is the one she's best at.",
    tasks: [
      "Calls in the right tone",
      "Takes payment commitments",
      "Sends payment links",
      "Escalates only when needed",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function UseCases() {
  return (
    <section
      className="section-lg"
      id="use-cases"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="section-inner-wide px-6">
        <motion.div
          className="mb-12 md:mb-16 max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2 mb-4">
            What Penny does at{" "}
            <span style={{ color: "var(--copper)" }}>your facility</span>
          </h2>
          <p className="text-body">
            From the first enquiry to the move-in to the late payment. Every
            call in your facility&apos;s customer lifecycle - answered.
          </p>
        </motion.div>

        {/* Asymmetric 2-column layout: first row has 1 wide + 1 normal */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className={`card interactive-card ${i === useCases.length - 1 ? "md:col-span-2 md:max-w-[calc(50%-10px)] md:mx-auto" : ""}`}
              variants={itemVariants}
            >
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{
                  background: "oklch(0.65 0.11 55 / 0.1)",
                  color: "var(--copper-deep)",
                }}
              >
                {uc.tag}
              </span>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--ink)" }}
              >
                {uc.title}
              </h3>
              <p className="text-body text-[15px] mb-4">{uc.story}</p>
              <div className="flex flex-wrap gap-2">
                {uc.tasks.map((task) => (
                  <span
                    key={task}
                    className="text-xs font-medium px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {task}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
