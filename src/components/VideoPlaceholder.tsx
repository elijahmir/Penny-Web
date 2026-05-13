"use client";

import { motion } from "framer-motion";
import { Play, Film } from "lucide-react";

export function VideoPlaceholder({
  title = "See Penny in action",
  description = "A short walkthrough showing how Penny handles a real call, from pickup to follow-up.",
  aspect = "video",
}: {
  title?: string;
  description?: string;
  aspect?: "video" | "square";
}) {
  return (
    <section className="section" id="demo-video">
      <div className="section-inner px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2 mb-3">{title}</h2>
          <p className="text-body max-w-[480px] mx-auto">{description}</p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div
            className={`relative rounded-2xl overflow-hidden border ${
              aspect === "square" ? "aspect-square" : "aspect-video"
            }`}
            style={{
              borderColor: "var(--border)",
              background:
                "linear-gradient(135deg, rgba(201,129,96,0.04) 0%, rgba(36,35,33,0.03) 100%)",
            }}
          >
            {/* Dashed inner border */}
            <div
              className="absolute inset-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-4"
              style={{ borderColor: "rgba(201,129,96,0.2)" }}
            >
              {/* Play icon */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,129,96,0.1)" }}
              >
                <Play
                  size={28}
                  strokeWidth={1.8}
                  style={{ color: "var(--copper)" }}
                  className="ml-1"
                />
              </div>

              <div className="text-center px-6">
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Video coming soon
                </p>
                <p className="text-caption text-xs max-w-[280px] mx-auto">
                  This space is reserved for a product demo video.
                </p>
              </div>

              {/* Badge */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(201,129,96,0.08)",
                  color: "var(--copper-deep)",
                }}
              >
                <Film size={12} />
                Placeholder
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
