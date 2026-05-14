export const scenarios = [
  {
    id: "storage_waitlist",
    label: "🏢 A unit just opened up - Penny rings the waitlist",
    short: "Waitlist Callback",
  },
  {
    id: "inquiry_callback",
    label: "📞 A missed enquiry - Penny calls back to qualify and book a tour",
    short: "Enquiry Callback",
  },
  {
    id: "tour_booking",
    label: "📅 Tour booking - Penny locks in a viewing time",
    short: "Tour Booking",
  },
  {
    id: "move_in_welcome",
    label: "🎉 New customer move-in - Penny welcomes them and explains access",
    short: "Move-in Welcome",
  },
  {
    id: "overdue_payment",
    label: "💳 Overdue account - Penny chases politely and takes a payment commitment",
    short: "Overdue Account",
  },
] as const;

export type ScenarioId = (typeof scenarios)[number]["id"];
