"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

type Lang = "fr" | "en";

const LOGO_SRC = "/smaxia-logo.svg"; // <-- mettez ici EXACTEMENT le logo utilisé sur la Landing

const COPY: Record<Lang, any> = {
  fr: {
    title: "Accès anticipé SMAXIA",
    subtitle:
      "Réservé aux élèves ambitieux, enseignants, chercheurs et partenaires stratégiques.",
    youAre: "VOUS ÊTES",
    select: "Sélectionner…",
    email: "EMAIL PRINCIPAL",
    org: "ÉTABLISSEMENT / ORGANISATION",
    optional: "Ajouter un message (optionnel)",
    msgPh: "Votre objectif, examen, attentes…",
    emailPh: "prenom.nom@email.com",
    orgPh: "Lycée, Université, Entreprise…",
    submit: "Envoyer ma demande",
    sending: "Envoi en cours…",
    backHome: "Retour à la page d’accueil",
    requiredNote: "* Champs obligatoires",
    roles: [
      { value: "", label: "Sélectionner…" },
      { value: "eleve", label: "Élève / Étudiant" },
      { value: "parent", label: "Parent" },
      { value: "enseignant", label: "Enseignant" },
      { value: "chercheur", label: "Chercheur" },
      { value: "partenaire", label: "Partenaire" },
      { value: "presse", label: "Presse / Média" },
    ],
    errors: {
      required: "Veuillez renseigner tous les champs obligatoires.",
      email: "Adresse email invalide.",
      generic: "Impossible d’envoyer votre demande. Réessayez dans 30 secondes.",
    },
  },
  en: {
    title: "SMAXIA Early Access",
    subtitle:
      "Reserved for ambitious students, educators, researchers, and strategic partners.",
    youAre: "YOU ARE",
    select: "Select…",
    email: "PRIMARY EMAIL",
    org: "SCHOOL / ORGANIZATION",
    optional: "Add a message (optional)",
    msgPh: "Your goal, exam, expectations…",
    emailPh: "name@email.com",
    orgPh: "High school, University, Company…",
    submit: "Submit request",
    sending: "Submitting…",
    backHome: "Back to home",
    requiredNote: "* Required fields",
    roles: [
      { value: "", label: "Select…" },
      { value: "student", label: "Student" },
      { value: "parent", label: "Parent" },
      { value: "teacher", label: "Teacher" },
      { value: "researcher", label: "Researcher" },
      { value: "partner", label: "Partner" },
      { value: "press", label: "Press / Media" },
    ],
    errors: {
      required: "Please fill in all required fields.",
      email: "Invalid email address.",
      generic: "Unable to submit. Please retry in 30 seconds.",
    },
  },
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function EarlyAccessPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = useMemo(() => COPY[lang], [lang]);

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [showOptional, setShowOptional] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const _email = email.trim();
    const _org = org.trim();

    if (!role || !_email || !_org) return setError(t.errors.required);
    if (!isValidEmail(_email)) return setError(t.errors.email);

    setSubmitting(true);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          role,
          email: _email,
          organisation: _org,
          message: showOptional ? (message?.trim() || "") : "",
          source: "early-access",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || t.errors.generic);

      window.location.href = "/early-access/success";
    } catch (err: any) {
      setError(err?.message || t.errors.generic);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#05070d] text-[#e6ebff] overflow-x-hidden">
      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_650px_at_50%_0%,rgba(77,163,255,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_86%_28%,rgba(242,201,76,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_14%_78%,rgba(77,163,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.55))]" />
      </div>

      {/* Top bar (small language chips) */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-end px-6 pt-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang("fr")}
            aria-pressed={lang === "fr"}
            className={[
              "h-9 rounded-full px-4 text-[11px] font-semibold tracking-[0.24em] transition",
              "border",
              lang === "fr"
                ? "bg-[#f2c94c] text-[#05070d] border-[#f2c94c]/40 shadow-[0_18px_45px_rgba(242,201,76,0.12)]"
                : "bg-white/5 text-[#e6ebff] border-white/12 hover:bg-white/8",
            ].join(" ")}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={[
              "h-9 rounded-full px-4 text-[11px] font-semibold tracking-[0.24em] transition",
              "border",
              lang === "en"
                ? "bg-[#f2c94c] text-[#05070d] border-[#f2c94c]/40 shadow-[0_18px_45px_rgba(242,201,76,0.12)]"
                : "bg-white/5 text-[#e6ebff] border-white/12 hover:bg-white/8",
            ].join(" ")}
          >
            EN
          </button>
        </div>
      </header>

      {/* Card */}
      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-10 pt-7">
        <div
          className={[
            "rounded-[30px] border border-white/10 bg-white/[0.035] backdrop-blur-xl",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_110px_rgba(0,0,0,0.70)]",
            "overflow-hidden",
          ].join(" ")}
        >
          {/* Scrollable body (button always visible) */}
          <div className="max-h-[calc(100vh-190px)] overflow-y-auto px-7 sm:px-10 pt-9 sm:pt-10 pb-6">
            {/* Centered logo like Landing */}
            <div className="flex flex-col items-center text-center select-none">
              <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                <Image
                  src={LOGO_SRC}
                  alt="SMAXIA"
                  fill
                  priority
                  sizes="64px"
                  className="object-contain drop-shadow-[0_12px_30px_rgba(77,163,255,0.16)]"
                />
              </div>
              <div className="mt-3 text-sm tracking-[0.34em] text-[#9aa4c7]">
                SMAXIA
              </div>
            </div>

            <div className="mt-7">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center">
                {t.title}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-[#9aa4c7] text-center">
                {t.subtitle}
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-9 space-y-5">
              {/* Role */}
              <div>
                <label className="block text-[11px] tracking-[0.28em] text-[#9aa4c7]">
                  {t.youAre} <span className="text-[#f2c94c]">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#0a0f1f]/70 px-4 py-3 text-sm outline-none transition focus:border-[#4da3ff]/45 focus:ring-2 focus:ring-[#4da3ff]/20"
                  >
                    {t.roles.map((r: any) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] tracking-[0.28em] text-[#9aa4c7]">
                  {t.email} <span className="text-[#f2c94c]">*</span>
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPh}
                    autoComplete="email"
                    inputMode="email"
                    className="w-full rounded-2xl border border-white/10 bg-[#0a0f1f]/70 px-4 py-3 text-sm outline-none transition focus:border-[#4da3ff]/45 focus:ring-2 focus:ring-[#4da3ff]/20"
                  />
                </div>
              </div>

              {/* Org */}
              <div>
                <label className="block text-[11px] tracking-[0.28em] text-[#9aa4c7]">
                  {t.org} <span className="text-[#f2c94c]">*</span>
                </label>
                <div className="mt-2">
                  <input
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder={t.orgPh}
                    autoComplete="organization"
                    className="w-full rounded-2xl border border-white/10 bg-[#0a0f1f]/70 px-4 py-3 text-sm outline-none transition focus:border-[#4da3ff]/45 focus:ring-2 focus:ring-[#4da3ff]/20"
                  />
                </div>
              </div>

              {/* Optional field hidden by default */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowOptional((v) => !v)}
                  className={[
                    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3",
                    "text-left text-sm text-[#e6ebff] transition hover:bg-white/[0.05]",
                    "flex items-center justify-between",
                  ].join(" ")}
                >
                  <span className="text-[#9aa4c7]">{t.optional}</span>
                  <span
                    className={[
                      "inline-flex h-7 w-7 items-center justify-center rounded-full",
                      "border border-white/10 bg-[#0a0f1f]/70 text-[#e6ebff]/90",
                      "transition",
                      showOptional ? "rotate-45" : "",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {showOptional && (
                  <div className="mt-3">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.msgPh}
                      rows={4}
                      className="w-full rounded-2xl border border-white/10 bg-[#0a0f1f]/70 px-4 py-3 text-sm outline-none transition focus:border-[#4da3ff]/45 focus:ring-2 focus:ring-[#4da3ff]/20 resize-none max-h-[160px] overflow-y-auto"
                    />
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Footer with Landing-like button (always visible) */}
          <div className="border-t border-white/10 bg-[#05070d]/40 px-7 sm:px-10 py-6">
            <button
              type="submit"
              form="__unused"
              onClick={(e) => {
                // ensure submit triggers the same handler even if user clicked in footer
                // We simply submit the first form in this card.
                const root = (e.currentTarget.closest("div")?.parentElement ??
                  null) as HTMLElement | null;
                const form = root?.querySelector("form");
                form?.requestSubmit();
              }}
              disabled={submitting}
              className={[
                "w-full rounded-full px-6 py-4 text-sm font-semibold tracking-wide transition",
                "border border-[#f2c94c]/35",
                "bg-[linear-gradient(135deg,rgba(242,201,76,0.95),rgba(242,201,76,0.65))]",
                "text-[#05070d]",
                "shadow-[0_22px_55px_rgba(242,201,76,0.14)]",
                "hover:shadow-[0_30px_80px_rgba(242,201,76,0.18)]",
                "disabled:opacity-60 disabled:cursor-not-allowed",
              ].join(" ")}
            >
              {submitting ? t.sending : t.submit}
            </button>

            <div className="mt-3 text-center text-xs text-[#9aa4c7]">
              {t.requiredNote}
            </div>

            <div className="mt-5 text-center">
              <Link
                href="/"
                className="text-sm text-[#9aa4c7] hover:text-[#e6ebff] transition"
              >
                {t.backHome}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
