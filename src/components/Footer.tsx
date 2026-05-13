import { PennyLogo } from "./PennyLogo";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border) 20%, var(--copper) 50%, var(--border) 80%, transparent)",
        }}
      />

      <div className="py-10 px-6">
        <div className="section-inner-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <PennyLogo size={22} color="var(--copper)" />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--ink)" }}
            >
              penny
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--ink-muted)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-caption text-xs">
            &copy; {year} Brooklyn Bradley. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
