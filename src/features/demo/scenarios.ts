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
