export const scenarios = [
  {
    id: "storage_waitlist",
    label: "A unit just opened up - Penny rings the waitlist",
    short: "Waitlist Callback",
    emoji: "🏢",
    description: "A tenant vacated and Penny calls the next person on the waitlist.",
  },
  {
    id: "inquiry_callback",
    label: "A missed enquiry - Penny calls back to qualify and book a tour",
    short: "Enquiry Callback",
    emoji: "📞",
    description: "Someone called while you were busy. Penny returns the call.",
  },
  {
    id: "tour_booking",
    label: "Tour booking - Penny locks in a viewing time",
    short: "Tour Booking",
    emoji: "📅",
    description: "A prospect wants to see the facility. Penny arranges the visit.",

  },
  {
    id: "move_in_welcome",
    label: "New customer move-in - Penny welcomes them and explains access",
    short: "Move-in Welcome",
    emoji: "🎉",
    description: "A new tenant just signed up. Penny welcomes them with gate codes.",

  },
  {
    id: "overdue_payment",
    label: "Overdue account - Penny chases politely and offers payment options",
    short: "Overdue Account",
    emoji: "💳",
    description: "A payment is a few days late. Penny gives a warm courtesy call.",

  },
] as const;

export type ScenarioId = (typeof scenarios)[number]["id"];

/**
 * Maps scenario IDs to their Retell conversation-flow agent IDs.
 * These are loaded from environment variables on the server side.
 */
export const SCENARIO_AGENT_MAP: Record<ScenarioId, string> = {
  storage_waitlist: "agent_a4e0448bb0232314e6d17e1dfc",
  inquiry_callback: "agent_79b67eb596c896e2a9057f07da",
  tour_booking: "agent_8a0a182305f6f00f450f699e69",
  move_in_welcome: "agent_5555f2584d26c4950956ea8eef",
  overdue_payment: "agent_a7c3ca7429e8c425f447e62e32",
};
