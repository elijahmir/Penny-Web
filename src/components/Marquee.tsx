"use client";

import { useReducedMotion } from "framer-motion";

const phrases = [
  "Answers every call",
  "Books appointments",
  "Sends follow-ups",
  "Captures details",
  "Works 24/7",
  "Transfers to humans",
  "Confirms bookings",
  "Fills cancellations",
  "Calls your waitlist",
  "Checks references",
  "Qualifies leads",
  "Sends reminders",
];

export function Marquee({
  speed = 35,
  reverse = false,
  className = "",
}: {
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`marquee-track overflow-hidden ${className}`}
      aria-hidden="true"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="marquee-inner"
        style={{
          display: "flex",
          gap: "2rem",
          width: "max-content",
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: prefersReducedMotion ? "paused" : "running",
        }}
      >
        {/* Duplicate for seamless loop */}
        {[0, 1].map((set) => (
          <div key={set} className="flex items-center gap-8 shrink-0 pr-8">
            {phrases.map((phrase, i) => (
              <div key={`${set}-${i}`} className="flex items-center gap-8 shrink-0">
                <span
                  className="text-sm md:text-base font-medium whitespace-nowrap tracking-wide"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {phrase}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--copper)" }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
