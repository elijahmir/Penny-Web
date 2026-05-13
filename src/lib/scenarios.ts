export const scenarios = [
  {
    id: "storage_waitlist",
    label: "🏢 Storage waitlist: a unit just opened up",
    short: "Storage Waitlist",
  },
  {
    id: "property_inquiry",
    label: "🏠 Property inquiry callback: following up on a listing",
    short: "Property Inquiry",
  },
  {
    id: "appointment_reminder",
    label: "📅 Appointment reminder: confirming tomorrow's booking",
    short: "Appointment Reminder",
  },
  {
    id: "reference_check",
    label: "✅ Reference check: referee interview",
    short: "Reference Check",
  },
  {
    id: "service_callback",
    label: "🛠 Service callback: quoting a job",
    short: "Service Callback",
  },
] as const;

export type ScenarioId = (typeof scenarios)[number]["id"];
