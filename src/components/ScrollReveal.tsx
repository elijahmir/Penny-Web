"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  width?: "fit-content" | "100%";
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  width = "100%",
}: ScrollRevealProps) {
  const directionOffset = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      style={{ width }}
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      }}
    >
      {children}
    </motion.div>
  );
}
