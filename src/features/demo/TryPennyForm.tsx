"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle, AlertCircle, Loader2, ArrowRight, RotateCcw } from "lucide-react";
import { scenarios, type ScenarioId } from "./scenarios";
import { Turnstile } from "@marsidev/react-turnstile";
import styles from "./TryPennyForm.module.css";

const EMIL_EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EMIL_SPRING = { type: "spring", duration: 0.5, bounce: 0.2 } as const;

type FormState = "idle" | "submitting" | "success" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export function TryPennyForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const captchaTokenRef = useRef<string>("");

  const handleScenarioSelect = useCallback((id: ScenarioId) => {
    setSelectedScenario(id);
    setStep(2);
  }, []);

  const handleBack = useCallback(() => {
    setStep(1);
    setFormState("idle");
    setErrorMessage("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedScenario || !name.trim() || !phone.trim()) return;

      setFormState("submitting");
      setErrorMessage("");

      try {
        const res = await fetch("/api/demo-call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            scenario: selectedScenario,
            captchaToken: captchaTokenRef.current,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setFormState("error");
          setErrorMessage(data.error || "Something went wrong. Please try again.");
          return;
        }

        setFormState("success");
        setSuccessMessage(data.message || `Penny will call you shortly, ${name.trim()}!`);
      } catch {
        setFormState("error");
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    },
    [selectedScenario, name, phone]
  );

  const handleReset = useCallback(() => {
    setStep(1);
    setSelectedScenario(null);
    setName("");
    setPhone("");
    setFormState("idle");
    setErrorMessage("");
    setSuccessMessage("");
    captchaTokenRef.current = "";
  }, []);

  const selectedScenarioData = scenarios.find((s) => s.id === selectedScenario);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {/* ─── SUCCESS STATE ─── */}
        {formState === "success" ? (
          <motion.div
            key="success"
            className={styles.successState}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, ease: EMIL_EASE_OUT }}
          >
            <motion.div
              className={styles.successIcon}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, ...EMIL_SPRING }}
            >
              <CheckCircle size={40} strokeWidth={1.5} />
            </motion.div>
            <h3 className={styles.successTitle}>Call incoming!</h3>
            <p className={styles.successMessage}>{successMessage}</p>
            <p className={styles.successHint}>
              Your phone will ring in about 10–15 seconds. Penny will introduce herself and walk
              you through the <strong>{selectedScenarioData?.short}</strong> scenario.
            </p>
            <button type="button" className={styles.resetButton} onClick={handleReset}>
              <RotateCcw size={14} />
              Try another scenario
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ─── STEP INDICATOR ─── */}
            <div className={styles.stepIndicator}>
              <div className={`${styles.stepDot} ${step >= 1 ? styles.stepDotActive : ""}`}>
                <span>1</span>
              </div>
              <div className={`${styles.stepLine} ${step >= 2 ? styles.stepLineActive : ""}`} />
              <div className={`${styles.stepDot} ${step >= 2 ? styles.stepDotActive : ""}`}>
                <span>2</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* ─── STEP 1: SCENARIO SELECTION ─── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: EMIL_EASE_OUT }}
                >
                  <p className={styles.stepLabel}>Pick a scenario</p>
                  <div className={styles.scenarioGrid}>
                    {scenarios.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          className={`${styles.scenarioCard} ${
                            selectedScenario === s.id ? styles.scenarioCardSelected : ""
                          }`}
                          onClick={() => handleScenarioSelect(s.id)}
                        >
                          <span className={styles.scenarioEmoji}>{s.emoji}</span>
                          <span className={styles.scenarioLabel}>
                            {s.short}
                          </span>
                          <span className={styles.scenarioDescription}>{s.description}</span>
                          <ArrowRight className={styles.scenarioArrow} size={14} />
                        </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ─── STEP 2: NAME + PHONE ─── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.4, ease: EMIL_EASE_OUT }}
                >
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    ← Change scenario
                  </button>

                  {selectedScenarioData && (
                    <div className={styles.selectedBadge}>
                      <span>{selectedScenarioData.emoji}</span>
                      <span>{selectedScenarioData.short}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="demo-name" className={styles.label}>
                        First name
                      </label>
                      <input
                        id="demo-name"
                        type="text"
                        className={styles.input}
                        placeholder="e.g. Sarah"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={2}
                        maxLength={50}
                        autoComplete="given-name"
                        disabled={formState === "submitting"}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="demo-phone" className={styles.label}>
                        Australian mobile number
                      </label>
                      <input
                        id="demo-phone"
                        type="tel"
                        className={styles.input}
                        placeholder="04XX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        autoComplete="tel"
                        disabled={formState === "submitting"}
                      />
                      <span className={styles.inputHint}>
                        Penny will call this number in about 15 seconds.
                      </span>
                    </div>

                    {/* CAPTCHA - rendered invisibly */}
                    {TURNSTILE_SITE_KEY && (
                      <div className={styles.captchaWrapper}>
                        <Turnstile
                          siteKey={TURNSTILE_SITE_KEY}
                          onSuccess={(token: string) => {
                            captchaTokenRef.current = token;
                          }}
                          options={{ theme: "light", size: "compact" }}
                        />
                      </div>
                    )}

                    {/* Error message */}
                    <AnimatePresence>
                      {formState === "error" && (
                        <motion.div
                          className={styles.errorBanner}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <AlertCircle size={16} />
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={
                        formState === "submitting" || !name.trim() || !phone.trim()
                      }
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 size={18} className={styles.spinner} />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Phone size={18} />
                          Call me now
                        </>
                      )}
                    </button>

                    <p className={styles.disclaimer}>
                      By submitting, you agree to receive one demo call (max 2 min) from Penny.
                      Your number won&apos;t be stored for marketing.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
