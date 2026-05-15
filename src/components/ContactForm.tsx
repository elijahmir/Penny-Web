"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name required.").max(60),
  phone: z
    .string()
    .min(8, "Enter a valid phone number.")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Enter a valid phone number."),
  email: z.string().email("Enter a valid email."),
  message: z.string().min(10, "Give us a bit more detail.").max(500),
});

type FormData = z.infer<typeof schema>;
type FormState = "idle" | "submitting" | "success" | "error";

const WEBHOOK_URL = "https://hup.app.n8n.cloud/webhook/penny-contact-web";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: data.message,
          source: "penny_landing",
          submitted_at: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setState("success");
        reset();
      } else {
        setState("error");
        setErrorMsg("Something went wrong. Try again or email us directly.");
      }
    } catch {
      setState("error");
      setErrorMsg("Connection error. Please check your internet.");
    }
  };

  return (
    <section
      className="section"
      id="contact"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="section-inner px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-h2 mb-3">Talk to us</h2>
            <p className="text-body">
              Questions about Penny, need a custom setup, or have a data request?{" "}
              We&apos;re here to help and respond within one business day.
            </p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle2 size={40} className="mx-auto mb-4" style={{ color: "var(--success)" }} />
                  <p className="text-xl font-semibold mb-2" style={{ color: "var(--ink)" }}>
                    Message sent!
                  </p>
                  <p className="text-body text-sm">
                    We&apos;ll get back to you within one business day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {state === "error" && (
                    <div
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
                      style={{
                        background: "rgba(184,74,61,0.08)",
                        color: "var(--danger)",
                      }}
                    >
                      <AlertCircle size={16} />
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--ink)" }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
                      style={{
                        borderColor: errors.name ? "var(--danger)" : "var(--border)",
                        color: "var(--ink)",
                        background: "var(--bg)",
                      }}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: "var(--danger)" }} role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--ink)" }}
                    >
                      Phone number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="04XX XXX XXX"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
                      style={{
                        borderColor: errors.phone ? "var(--danger)" : "var(--border)",
                        color: "var(--ink)",
                        background: "var(--bg)",
                      }}
                    />
                    {errors.phone && (
                      <p className="text-xs mt-1" style={{ color: "var(--danger)" }} role="alert">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--ink)" }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@company.com"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
                      style={{
                        borderColor: errors.email ? "var(--danger)" : "var(--border)",
                        color: "var(--ink)",
                        background: "var(--bg)",
                      }}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: "var(--danger)" }} role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--ink)" }}
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Questions, custom setup, data requests — tell us what you need."
                      {...register("message")}
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none"
                      style={{
                        borderColor: errors.message ? "var(--danger)" : "var(--border)",
                        color: "var(--ink)",
                        background: "var(--bg)",
                      }}
                    />
                    {errors.message && (
                      <p className="text-xs mt-1" style={{ color: "var(--danger)" }} role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full py-4 text-base"
                    disabled={!isValid || state === "submitting"}
                    style={{
                      opacity: isValid && state !== "submitting" ? 1 : 0.5,
                    }}
                  >
                    {state === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
