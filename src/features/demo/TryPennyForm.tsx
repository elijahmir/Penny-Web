"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle, AlertCircle, Loader2, ArrowRight, RotateCcw, ChevronDown, Mail, Shield } from "lucide-react";
import { scenarios, type ScenarioId } from "./scenarios";
import { getOrderedCountries, findCountryByIso, DEFAULT_COUNTRY_ISO, type CountryCode } from "./country-codes";
import { Turnstile } from "@marsidev/react-turnstile";
import styles from "./TryPennyForm.module.css";

const EMIL_EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EMIL_SPRING = { type: "spring", duration: 0.5, bounce: 0.2 } as const;

type FormState = "idle" | "submitting" | "success" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const DEMO_TERMS_BODY = `Penny AI — Demo Terms & Conditions

Demo Nature
This is a demonstration of Penny AI's voice assistant capabilities. The call simulates real-world storage service scenarios and does not constitute a service agreement, quote, or binding commitment.

Recording & Quality
This demo call will be recorded for quality assurance, product improvement, and training purposes.

Your Information
We collect your name, email address, and phone number to:
• Deliver this demo call experience
• Improve our product and service quality
• Contact you regarding our services (only if you opt in separately)

Data Handling
Your information is stored securely on encrypted servers and will never be sold to third parties. Demo call data is retained for up to 90 days, after which it is automatically deleted unless you become a customer.

Call Duration
Demo calls are limited to approximately 2 minutes.`;

/** Simple email validation */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export function TryPennyForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsExpanded, setTermsExpanded] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const captchaTokenRef = useRef<string>("");
  const [captchaReady, setCaptchaReady] = useState(!TURNSTILE_SITE_KEY);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries = useMemo(() => getOrderedCountries(), []);
  const selectedCountry = useMemo(() => findCountryByIso(countryIso), [countryIso]);

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return countries;
    const q = countrySearch.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [countries, countrySearch]);

  const handleScenarioSelect = useCallback((id: ScenarioId) => {
    setSelectedScenario(id);
    setStep(2);
  }, []);

  const handleBack = useCallback(() => {
    setStep(1);
    setFormState("idle");
    setErrorMessage("");
  }, []);

  const handleCountrySelect = useCallback((country: CountryCode) => {
    setCountryIso(country.iso);
    setCountryDropdownOpen(false);
    setCountrySearch("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedScenario || !name.trim() || !email.trim() || !phone.trim() || !termsAccepted)
        return;

      if (!isValidEmail(email.trim())) {
        setFormState("error");
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      setFormState("submitting");
      setErrorMessage("");

      try {
        const res = await fetch("/api/demo-call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            countryCode: countryIso,
            scenario: selectedScenario,
            marketingConsent,
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
    [selectedScenario, name, email, phone, countryIso, termsAccepted, marketingConsent]
  );

  const handleReset = useCallback(() => {
    setStep(1);
    setSelectedScenario(null);
    setName("");
    setEmail("");
    setPhone("");
    setCountryIso(DEFAULT_COUNTRY_ISO);
    setTermsAccepted(false);
    setTermsExpanded(false);
    setMarketingConsent(false);
    setFormState("idle");
    setErrorMessage("");
    setSuccessMessage("");
    captchaTokenRef.current = "";
    setCaptchaReady(!TURNSTILE_SITE_KEY);
  }, []);

  const selectedScenarioData = scenarios.find((s) => s.id === selectedScenario);

  const isSubmitDisabled =
    formState === "submitting" ||
    !name.trim() ||
    !email.trim() ||
    !isValidEmail(email.trim()) ||
    !phone.trim() ||
    !termsAccepted ||
    !captchaReady;

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

              {/* ─── STEP 2: DETAILS ─── */}
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
                    {/* Name */}
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

                    {/* Email */}
                    <div className={styles.inputGroup}>
                      <label htmlFor="demo-email" className={styles.label}>
                        <Mail size={13} className={styles.labelIcon} />
                        Email address
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        className={styles.input}
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        maxLength={254}
                        autoComplete="email"
                        disabled={formState === "submitting"}
                      />
                    </div>

                    {/* Phone with country code */}
                    <div className={styles.inputGroup}>
                      <label htmlFor="demo-phone" className={styles.label}>
                        <Phone size={13} className={styles.labelIcon} />
                        Phone number
                      </label>
                      <div className={styles.phoneRow}>
                        {/* Country Code Dropdown */}
                        <div className={styles.countryDropdownWrapper} ref={dropdownRef}>
                          <button
                            type="button"
                            className={styles.countryTrigger}
                            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                            disabled={formState === "submitting"}
                            aria-label="Select country code"
                            aria-expanded={countryDropdownOpen}
                          >
                            <span className={styles.countryFlag}>
                              {selectedCountry?.flag || "🌍"}
                            </span>
                            <span className={styles.countryDial}>
                              {selectedCountry?.dial || "+61"}
                            </span>
                            <ChevronDown
                              size={14}
                              className={`${styles.countryChevron} ${
                                countryDropdownOpen ? styles.countryChevronOpen : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {countryDropdownOpen && (
                              <motion.div
                                className={styles.countryDropdown}
                                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                transition={{ duration: 0.2, ease: EMIL_EASE_OUT }}
                              >
                                <input
                                  type="text"
                                  className={styles.countrySearchInput}
                                  placeholder="Search country..."
                                  value={countrySearch}
                                  onChange={(e) => setCountrySearch(e.target.value)}
                                  autoFocus
                                />
                                <div className={styles.countryList}>
                                  {filteredCountries.length === 0 && (
                                    <div className={styles.countryEmpty}>No results</div>
                                  )}
                                  {filteredCountries.map((c, i) => {
                                    // Show separator after priority countries
                                    const showSep = i === 5 && !countrySearch.trim();
                                    return (
                                      <div key={`${c.iso}-${c.dial}`}>
                                        {showSep && <div className={styles.countrySeparator} />}
                                        <button
                                          type="button"
                                          className={`${styles.countryOption} ${
                                            c.iso === countryIso ? styles.countryOptionActive : ""
                                          }`}
                                          onClick={() => handleCountrySelect(c)}
                                        >
                                          <span className={styles.countryOptionFlag}>{c.flag}</span>
                                          <span className={styles.countryOptionName}>{c.name}</span>
                                          <span className={styles.countryOptionDial}>{c.dial}</span>
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Phone Input */}
                        <input
                          id="demo-phone"
                          type="tel"
                          className={`${styles.input} ${styles.phoneInput}`}
                          placeholder={selectedCountry?.example || "Phone number"}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          autoComplete="tel-national"
                          disabled={formState === "submitting"}
                          onFocus={() => setCountryDropdownOpen(false)}
                        />
                      </div>
                      <span className={styles.inputHint}>
                        Penny will call this number in about 15 seconds.
                      </span>
                    </div>

                    {/* ─── Terms & Conditions ─── */}
                    <div className={styles.termsSection}>
                      <label className={styles.checkboxRow}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          disabled={formState === "submitting"}
                        />
                        <span className={styles.checkboxLabel}>
                          I agree to the{" "}
                          <button
                            type="button"
                            className={styles.termsToggle}
                            onClick={(e) => {
                              e.preventDefault();
                              setTermsExpanded(!termsExpanded);
                            }}
                          >
                            Demo Terms
                          </button>
                        </span>
                      </label>

                      <AnimatePresence>
                        {termsExpanded && (
                          <motion.div
                            className={styles.termsAccordion}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: EMIL_EASE_OUT }}
                          >
                            <div className={styles.termsContent}>
                              <Shield size={14} className={styles.termsShieldIcon} />
                              <pre className={styles.termsText}>{DEMO_TERMS_BODY}</pre>
                              <p className={styles.termsRightsText}>
                                <strong>Your Rights</strong><br />
                                You may request access to, correction of, or deletion of your personal data at any time by{" "}
                                <a href="#contact" className={styles.termsContactLink}>contacting us</a>.
                                We comply with the Australian Privacy Act 1988 and applicable international privacy regulations.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Optional: Marketing consent */}
                      <label className={`${styles.checkboxRow} ${styles.marketingRow}`}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          disabled={formState === "submitting"}
                        />
                        <span className={styles.checkboxLabelOptional}>
                          I&apos;d like to hear from the Penny team about how AI voice agents can
                          help my business{" "}
                          <span className={styles.optionalTag}>(optional)</span>
                        </span>
                      </label>
                    </div>

                    {/* CAPTCHA */}
                    {TURNSTILE_SITE_KEY && (
                      <div className={styles.captchaWrapper}>
                        <Turnstile
                          siteKey={TURNSTILE_SITE_KEY}
                          onSuccess={(token: string) => {
                            captchaTokenRef.current = token;
                            setCaptchaReady(true);
                          }}
                          onExpire={() => {
                            captchaTokenRef.current = "";
                            setCaptchaReady(false);
                          }}
                          onError={() => {
                            captchaTokenRef.current = "";
                            setCaptchaReady(false);
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
                      disabled={isSubmitDisabled}
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
