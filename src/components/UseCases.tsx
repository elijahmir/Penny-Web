"use client";

import { motion } from "framer-motion";

const useCases = [
  {
    tag: "Self-storage",
    title: "Fill empty units before they cost you a month's rent.",
    story:
      "A unit opens up. Instead of someone in the office working down a waitlist, Penny rings every name, presents the unit, and books the first taker. Usually before the day is out.",
    tasks: [
      "Calls the waitlist",
      "Presents availability",
      "Books on the call",
      "Sends the agreement link",
      "Logs everything",
    ],
  },
  {
    tag: "Real estate",
    title: "Reference checks done overnight, not next week.",
    story:
      "A tenancy application comes in. Penny rings the referees, asks the right questions, captures scored answers, and has a clean report on your desk by morning.",
    tasks: [
      "Contacts referees",
      "Conducts structured interviews",
      "Captures responses",
      "Produces a report",
      "Flags concerns for review",
    ],
  },
  {
    tag: "Trades",
    title: "Never miss a job call again.",
    story:
      "You're on a roof. The phone rings. Penny answers, qualifies the job, gives a rough quote, books the site visit, and texts you the details. All while you keep working.",
    tasks: [
      "Takes inbound calls",
      "Qualifies the lead",
      "Books site visits",
      "Sends quotes",
      "Notifies you instantly",
    ],
  },
  {
    tag: "Healthcare & wellness",
    title: "Reminders that actually reduce no-shows.",
    story:
      "Day before every appointment, Penny calls to confirm. Patient can confirm, reschedule, or cancel right on the call. Calendar updates itself. Empty slots get refilled from the waitlist.",
    tasks: [
      "Confirms bookings",
      "Reschedules on request",
      "Refills cancellations",
      "Sends prep instructions",
      "Reports no-shows",
    ],
  },
  {
    tag: "Anywhere",
    title: "The repetitive call you do twenty times a week.",
    story:
      "Every business has one: the same call, made or taken, over and over. Survey follow-ups, payment reminders, delivery confirmations, new-customer welcomes. Hand it to Penny once and it's handled forever.",
    tasks: [
      "Whatever script you give her",
      "As many calls as you need",
      "Logged, tracked, reportable",
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
      className="section"
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
            Built for businesses that{" "}
            <span style={{ color: "var(--copper)" }}>live on the phone</span>
          </h2>
          <p className="text-body">
            Storage, property, trades, clinics, admin. If there's a call to
            make or take, Penny's got it.
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
              className={`card ${i === useCases.length - 1 ? "md:col-span-2 md:max-w-[calc(50%-10px)] md:mx-auto" : ""}`}
              variants={itemVariants}
            >
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{
                  background: "rgba(201,129,96,0.1)",
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
