"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PennyLogo } from "./PennyLogo";

const links = [
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        background: "rgba(247, 247, 242, 0.85)",
        borderColor: "var(--border)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="section-inner-wide flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
          style={{ color: "var(--ink)" }}
          aria-label="Penny | home"
        >
          <PennyLogo size={28} color="var(--copper)" />
          <span>penny</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "var(--ink-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#try-penny"
            className="btn btn-primary text-sm px-5 py-2.5 hidden sm:inline-flex"
          >
            Try Penny
          </a>
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X size={22} style={{ color: "var(--ink)" }} />
            ) : (
              <Menu size={22} style={{ color: "var(--ink)" }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="md:hidden border-t px-6 pb-6 pt-4"
            style={{
              background: "var(--bg)",
              borderColor: "var(--border)",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium py-1"
                  style={{ color: "var(--ink-muted)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#try-penny"
                className="btn btn-primary text-sm mt-2 w-full"
                onClick={() => setMobileOpen(false)}
              >
                Try Penny
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
