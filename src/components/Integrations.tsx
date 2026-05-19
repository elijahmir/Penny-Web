"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/* ─── Official SVG Icons (sourced from Simple Icons / brand guidelines) ───── */

function GoogleSheetsIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google Sheets"
    >
      <path
        d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z"
        fill="#0F9D58"
      />
    </svg>
  );
}

function GmailIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Gmail"
    >
      <path
        d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GoogleCalendarIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google Calendar"
    >
      <path
        d="M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z"
        fill="#4285F4"
      />
    </svg>
  );
}

function TeamsIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Microsoft Teams"
    >
      <path
        d="M20.625 8.127q-.55 0-1.025-.205-.475-.205-.832-.563-.358-.357-.563-.832Q18 6.053 18 5.502q0-.54.205-1.02t.563-.837q.357-.358.832-.563.474-.205 1.025-.205.54 0 1.02.205t.837.563q.358.357.563.837.205.48.205 1.02 0 .55-.205 1.025-.205.475-.563.832-.357.358-.837.563-.48.205-1.02.205zm0-3.75q-.469 0-.797.328-.328.328-.328.797 0 .469.328.797.328.328.797.328.469 0 .797-.328.328-.328.328-.797 0-.469-.328-.797-.328-.328-.797-.328zM24 10.002v5.578q0 .774-.293 1.46-.293.685-.803 1.194-.51.51-1.195.803-.686.293-1.459.293-.445 0-.908-.105-.463-.106-.85-.329-.293.95-.855 1.729-.563.78-1.319 1.336-.756.557-1.67.861-.914.305-1.898.305-1.148 0-2.162-.398-1.014-.399-1.805-1.102-.79-.703-1.312-1.664t-.674-2.086h-5.8q-.411 0-.704-.293T0 16.881V6.873q0-.41.293-.703t.703-.293h8.59q-.34-.715-.34-1.5 0-.727.275-1.365.276-.639.75-1.114.475-.474 1.114-.75.638-.275 1.365-.275t1.365.275q.639.276 1.114.75.474.475.75 1.114.275.638.275 1.365t-.275 1.365q-.276.639-.75 1.113-.475.475-1.114.75-.638.276-1.365.276-.188 0-.375-.024-.188-.023-.375-.058v1.078h10.875q.469 0 .797.328.328.328.328.797zM12.75 2.373q-.41 0-.78.158-.368.158-.638.434-.27.275-.428.639-.158.363-.158.773 0 .41.158.78.159.368.428.638.27.27.639.428.369.158.779.158.41 0 .773-.158.364-.159.64-.428.274-.27.433-.639.158-.369.158-.779 0-.41-.158-.773-.159-.364-.434-.64-.275-.275-.639-.433-.363-.158-.773-.158zM6.937 9.814h2.25V7.94H2.814v1.875h2.25v6h1.875zm10.313 7.313v-6.75H12v6.504q0 .41-.293.703t-.703.293H8.309q.152.809.556 1.5.405.691.985 1.19.58.497 1.318.779.738.281 1.582.281.926 0 1.746-.352.82-.351 1.436-.966.615-.616.966-1.43.352-.815.352-1.752zm5.25-1.547v-5.203h-3.75v6.855q.305.305.691.452.387.146.809.146.469 0 .879-.176.41-.175.715-.48.304-.305.48-.715t.176-.879Z"
        fill="#5059C9"
      />
    </svg>
  );
}

function OutlookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Microsoft Outlook"
    >
      <path
        d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z"
        fill="#0078D4"
      />
    </svg>
  );
}

function SharePointIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Microsoft SharePoint"
    >
      <path
        d="M24 13.5q0 1.242-.475 2.332-.474 1.09-1.289 1.904-.814.815-1.904 1.29-1.09.474-2.332.474-.762 0-1.523-.2-.106.997-.557 1.858-.451.862-1.154 1.494-.704.633-1.606.99-.902.358-1.91.358-1.09 0-2.045-.416-.955-.416-1.664-1.125-.709-.709-1.125-1.664Q6 19.84 6 18.75q0-.188.018-.375.017-.188.04-.375H.997q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6h3.54q.14-1.277.726-2.373.586-1.096 1.488-1.904Q7.652.914 8.807.457 9.96 0 11.25 0q1.395 0 2.625.533T16.02 1.98q.914.915 1.447 2.145T18 6.75q0 .188-.012.375-.011.188-.035.375 1.242 0 2.344.469 1.101.468 1.928 1.277.826.809 1.3 1.904Q24 12.246 24 13.5zm-12.75-12q-.973 0-1.857.34-.885.34-1.577.943-.691.604-1.154 1.43Q6.2 5.039 6.06 6h4.945q.41 0 .703.293t.293.703v4.945l.21-.035q.212-.75.61-1.424.399-.673.944-1.218.545-.545 1.213-.944.668-.398 1.43-.61.093-.503.093-.96 0-1.09-.416-2.045-.416-.955-1.125-1.664-.709-.709-1.664-1.125Q12.34 1.5 11.25 1.5zM6.117 15.902q.54 0 1.06-.111.522-.111.932-.37.41-.257.662-.679.252-.422.252-1.055 0-.632-.263-1.054-.264-.422-.662-.703-.399-.282-.856-.463l-.855-.34q-.399-.158-.662-.334-.264-.176-.264-.445 0-.2.14-.323.141-.123.335-.193.193-.07.404-.094.21-.023.351-.023.598 0 1.055.152.457.153.95.457V8.543q-.282-.082-.522-.14-.24-.06-.475-.1-.234-.041-.486-.059-.252-.017-.557-.017-.515 0-1.054.117-.54.117-.979.375-.44.258-.715.68-.275.421-.275 1.03 0 .598.263.997.264.398.663.68.398.28.855.474l.856.363q.398.17.662.358.263.187.263.457 0 .222-.123.351-.123.13-.31.2-.188.07-.393.087-.205.018-.369.018-.703 0-1.248-.234-.545-.235-1.107-.621v1.875q1.195.468 2.472.468zM11.25 22.5q.773 0 1.453-.293t1.19-.803q.51-.51.808-1.195.299-.686.299-1.459 0-.668-.223-1.277-.222-.61-.62-1.096-.4-.486-.95-.826-.55-.34-1.207-.48v1.933q0 .41-.293.703t-.703.293H7.57q-.07.375-.07.75 0 .773.293 1.459t.803 1.195q.51.51 1.195.803.686.293 1.459.293zM18 18q.926 0 1.746-.352.82-.351 1.436-.966.615-.616.966-1.43.352-.815.352-1.752 0-.926-.352-1.746-.351-.82-.966-1.436-.616-.615-1.436-.966Q18.926 9 18 9t-1.74.357q-.815.358-1.43.973t-.973 1.43q-.357.814-.357 1.74 0 .129.006.258t.017.258q.551.27 1.02.65t.838.855q.369.475.627 1.026.258.55.387 1.148Q17.18 18 18 18Z"
        fill="#038387"
      />
    </svg>
  );
}

function DocuSignIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DocuSign"
      fill="none"
    >
      {/* Document shape - Cobalt Blue */}
      <path
        d="M30 15h45l15 15v75H30V15z"
        fill="#4C00FF"
      />
      {/* D monogram - Poppy Red */}
      <path
        d="M20 30c0-8.284 6.716-15 15-15h10v70H35c-8.284 0-15-6.716-15-15V30z"
        fill="#FF4438"
      />
      {/* Overlap / Inkwell - where D and document meet */}
      <rect x="30" y="15" width="15" height="70" fill="#1B0533" />
      {/* Dog-ear fold at 45° */}
      <path d="M75 15l15 15H75V15z" fill="#3700CC" />
    </svg>
  );
}

/* ─── Platform data ────────────────────────────────────────────────────────── */

interface IntegrationItem {
  icon: React.ComponentType<{ size?: number }>;
  name: string;
  desc: string;
  badge?: string;
}

interface PlatformGroup {
  group: string;
  color: string;
  items: IntegrationItem[];
}

const platforms: PlatformGroup[] = [
  {
    group: "Google Workspace",
    color: "#4285F4",
    items: [
      {
        icon: GoogleSheetsIcon,
        name: "Google Sheets",
        desc: "Sync unit data, waitlists, and reports to your spreadsheets automatically.",
      },
      {
        icon: GoogleCalendarIcon,
        name: "Google Calendar",
        desc: "Tour bookings and appointments sync straight into your calendar.",
      },
      {
        icon: GmailIcon,
        name: "Gmail",
        desc: "Penny sends confirmations, follow-ups, and summaries via your inbox.",
      },
    ],
  },
  {
    group: "Microsoft 365",
    color: "#5059C9",
    items: [
      {
        icon: TeamsIcon,
        name: "Microsoft Teams",
        desc: "Get instant notifications and call summaries in your Teams channels.",
      },
      {
        icon: OutlookIcon,
        name: "Outlook",
        desc: "Appointments, reminders, and tenant emails routed to your Outlook.",
      },
      {
        icon: SharePointIcon,
        name: "SharePoint",
        desc: "Documents and agreements stored directly in your SharePoint library.",
      },
    ],
  },
  {
    group: "Document Signing",
    color: "#FFD232",
    items: [
      {
        icon: DocuSignIcon,
        name: "DocuSign",
        desc: "Send and track rental agreements for e-signature.",
        badge: "Paid",
      },
    ],
  },
];

/* ─── Animation variants ───────────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ─── Component ────────────────────────────────────────────────────────────── */

export function Integrations() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="section"
      id="integrations"
      style={{ background: "var(--bg-elevated)" }}
      aria-labelledby="integrations-heading"
    >
      <div className="section-inner-wide px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
            Penny connects
          </span>
          <h2 id="integrations-heading" className="text-h2 mb-4">
            Works with the tools you{" "}
            <span style={{ color: "var(--copper)" }}>already use</span>
          </h2>
          <p className="text-body max-w-[520px] mx-auto">
            Penny plugs into your existing workflow. No new system to
            learn - she meets your team where they already work.
          </p>
        </motion.div>

        {/* Platform groups grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1080px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.group}
              className="card shimmer-on-hover"
              variants={cardVariants}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Group header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: platform.color,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {platform.group}
                </h3>
              </div>

              {/* Individual integrations */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  flex: 1,
                }}
              >
                {platform.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        className={prefersReducedMotion ? "" : "animate-float"}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "10px",
                          background: "rgba(247,247,242,0.8)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "2px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "var(--ink)",
                            }}
                          >
                            {item.name}
                          </span>
                          {/* Connected indicator */}
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--success)",
                              flexShrink: 0,
                            }}
                          />
                          {item.badge && (
                            <span
                              style={{
                                fontSize: "9px",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--copper-deep)",
                                background: "rgba(201,129,96,0.1)",
                                padding: "1px 6px",
                                borderRadius: "4px",
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: 1.5,
                            color: "var(--ink-muted)",
                            margin: 0,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* "Don't see your tool?" CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div
            className="gradient-border"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 28px",
              borderRadius: "var(--radius-card)",
              background: "var(--bg-elevated)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(201,129,96,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MessageCircle
                size={18}
                strokeWidth={1.8}
                style={{ color: "var(--copper)" }}
              />
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  margin: "0 0 2px 0",
                }}
              >
                Don&apos;t see your tool?
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--ink-muted)",
                  margin: 0,
                }}
              >
                We&apos;re always adding new connections.{" "}
                <a
                  href="#contact"
                  style={{
                    color: "var(--copper)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(201,129,96,0.4)",
                  }}
                >
                  Talk to us
                </a>{" "}
                and we&apos;ll look into it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
