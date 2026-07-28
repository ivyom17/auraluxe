"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

interface FormState {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  description: string;
}

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  description: "",
};

const services = [
  "Strategic Consulting",
  "Product Engineering",
  "Brand & Experience",
  "Growth Infrastructure",
  "Security & Compliance",
  "Concierge Support",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs tracking-wide text-ink-500 uppercase">{label}</span>
      {children}
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Valid email required";
    if (!form.city.trim()) next.city = "Required";
    if (!form.service) next.service = "Please select a service";
    if (!form.description.trim()) next.description = "Tell us a bit more";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Replace with a real API call, e.g.:
    // await fetch("/api/request-service", { method: "POST", body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.3em] text-aurora-magenta uppercase mb-4 block">
              Get Started
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-6">
              Request a <span className="italic text-gradient">service.</span>
            </h2>
            <p className="text-ink-300 max-w-xl mx-auto">
              Tell us what you need — our concierge team will respond within
              one business day with next steps.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} y={40}>
          <div className="glass-card rounded-[2rem] p-6 md:p-12 relative overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-aurora-violet/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-aurora-cyan/20 blur-3xl" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="relative grid md:grid-cols-2 gap-6"
                  noValidate
                >
                  <Field label="Full Name">
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jordan Ellis"
                      className="field-input rounded-xl px-4 py-3.5 text-white placeholder:text-ink-700 w-full"
                    />
                    {errors.name && <span className="text-xs text-aurora-rose">{errors.name}</span>}
                  </Field>

                  <Field label="Phone Number">
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="field-input rounded-xl px-4 py-3.5 text-white placeholder:text-ink-700 w-full"
                    />
                    {errors.phone && <span className="text-xs text-aurora-rose">{errors.phone}</span>}
                  </Field>

                  <Field label="Email Address">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jordan@company.com"
                      className="field-input rounded-xl px-4 py-3.5 text-white placeholder:text-ink-700 w-full"
                    />
                    {errors.email && <span className="text-xs text-aurora-rose">{errors.email}</span>}
                  </Field>

                  <Field label="City">
                    <input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="New York, NY"
                      className="field-input rounded-xl px-4 py-3.5 text-white placeholder:text-ink-700 w-full"
                    />
                    {errors.city && <span className="text-xs text-aurora-rose">{errors.city}</span>}
                  </Field>

                  <Field label="Service Needed">
                    <select
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className="field-input rounded-xl px-4 py-3.5 text-white w-full appearance-none"
                    >
                      <option value="" className="bg-void">
                        Select a service
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-void">
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <span className="text-xs text-aurora-rose">{errors.service}</span>
                    )}
                  </Field>

                  <Field label="Preferred Contact Time">
                    <input
                      placeholder="e.g. Weekday mornings"
                      className="field-input rounded-xl px-4 py-3.5 text-white placeholder:text-ink-700 w-full"
                    />
                  </Field>

                  <div className="md:col-span-2">
                    <Field label="Description">
                      <textarea
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                        placeholder="Tell us about your project, timeline, and goals..."
                        rows={5}
                        className="field-input rounded-xl px-4 py-3.5 text-white placeholder:text-ink-700 w-full resize-none"
                      />
                      {errors.description && (
                        <span className="text-xs text-aurora-rose">{errors.description}</span>
                      )}
                    </Field>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-6 mt-2">
                    <p className="text-xs text-ink-500 max-w-xs">
                      By submitting, you agree to be contacted regarding your
                      request. We never share your information.
                    </p>
                    <MagneticButton type="submit" className="!px-10">
                      {submitting ? "Sending..." : "Submit Request"}
                      {!submitting && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </MagneticButton>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-aurora-cyan mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl text-white mb-3">Request received.</h3>
                  <p className="text-ink-300 max-w-sm mb-8">
                    A member of our concierge team will reach out within one
                    business day to confirm next steps.
                  </p>
                  <MagneticButton
                    variant="ghost"
                    onClick={() => {
                      setForm(initialState);
                      setSubmitted(false);
                    }}
                  >
                    Submit another request
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
