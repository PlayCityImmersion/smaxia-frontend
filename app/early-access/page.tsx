"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en";

const COPY: Record<Lang, any> = {
  fr: {
    langLabel: "FR",
    langAlt: "EN",
    title: "Accès anticipé SMAXIA",
    subtitle:
      "Réservé aux élèves ambitieux, enseignants, chercheurs et partenaires stratégiques.",
    roleLabel: "VOUS ÊTES",
    rolePlaceholder: "Sélectionner…",
    roles: [
      { value: "student", label: "Élève / Étudiant" },
      { value: "parent", label: "Parent" },
      { value: "teacher", label: "Enseignant" },
      { value: "researcher", label: "Chercheur" },
      { value: "partner", label: "Partenaire" },
      { value: "other", label: "Autre" },
    ],
    emailLabel: "EMAIL PRINCIPAL",
    emailPh: "prenom.nom@email.com",
    orgLabel: "ÉTABLISSEMENT / ORGANISATION",
    orgPh: "Lycée, Université, Entreprise…",
    optionalCta: "Ajouter un message (optionnel)",
    msgPh: "Objectif, examen, attentes…",
    submit: "Envoyer ma demande",
    back: "Retour à la page d’accueil",
    requiredHint: "* Champs obligatoires",
    errors: {
      missing: "Veuillez renseigner tous les champs obligatoires.",
      email: "Veuillez saisir une adresse email valide.",
      failed: "Impossible d’envoyer votre demande. Réessayez dans 30 secondes.",
    },
    sending: "Envoi…",
    sent: "Demande transmise.",
  },
  en: {
    langLabel: "EN",
    langAlt: "FR",
    title: "SMAXIA Early Access",
    subtitle:
      "Reserved for ambitious students, teachers, researchers, and strategic partners.",
    roleLabel: "YOU ARE",
    rolePlaceholder: "Select…",
    roles: [
      { value: "student", label: "Student" },
      { value: "parent", label: "Parent" },
      { value: "teacher", label: "Teacher" },
      { value: "researcher", label: "Researcher" },
      { value: "partner", label: "Partner" },
      { value: "other", label: "Other" },
    ],
    emailLabel: "PRIMARY EMAIL",
    emailPh: "first.last@email.com",
    orgLabel: "SCHOOL / ORGANIZATION",
    orgPh: "High school, University, Company…",
    optionalCta: "Add a message (optional)",
    msgPh: "Goal, exam, expectations…",
    submit: "Send request",
    back: "Back to home",
    requiredHint: "* Required fields",
    errors: {
      missing: "Please fill in all required fields.",
      email: "Please enter a valid email address.",
      failed: "Unable to send. Please retry in 30 seconds.",
    },
    sending: "Sending…",
    sent: "Request sent.",
  },
};

function isValidEmail(email: string) {
  // volontairement simple et robuste
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
}

export default function EarlyAccessPage() {
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("fr");
  const t = useMemo(() => COPY[lang], [lang]);

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [messageEnabled, setMessageEnabled] = useState(false);
  const [message, setMessage] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!role || !email.trim() || !org.trim()) {
      setError(t.errors.missing);
      return;
    }
    if (!isValidEmail(email)) {
      setError(t.errors.email);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // garder un payload propre et stable
        body: JSON.stringify({
          lang,
          role,
          email: email.trim(),
          organisation: org.trim(),
          message: messageEnabled ? message.trim() : "",
          source: "early-access",
          ts: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("submit_failed");

      router.push("/early-access/success");
    } catch {
      setError(t.errors.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#05070d] text-[#e6ebff] overflow-hidden">
      {/* Background premium */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_20%,rgba(77,163,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_70%_55%,rgba(242,201,76,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <a href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/logo-smaxia.png"
              alt="SMAXIA"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <div className="tracking-[0.38em] text-sm font-semibold text-[#e6ebff]/90">
            SMAXIA
          </div>
        </a>

        {/* Language switch (small, premium) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang("fr")}
            className={[
              "h-9 rounded-full px-4 text-xs font-semibold tracking-widest transition",
              lang === "fr"
                ? "bg-[#f2c94c] text-[#05070d] shadow-[0_0_0_1px_rgba(242,201,76,0.35),0_12px_30px_rgba(242,201,76,0.12)]"
                : "bg-transparent text-[#e6ebff]/80 shadow-[0_0_0_1px_rgba(242,201,76,0.35)] hover:text-[#e6ebff]",
            ].join(" ")}
            aria-label="Français"
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={[
              "h-9 rounded-full px-4 text-xs font-semibold tracking-widest transition",
              lang === "en"
                ? "bg-[#f2c94c] text-[#05070d] shadow-[0_0_0_1px_rgba(242,201,76,0.35),0_12px_30px_rgba(242,201,76,0.12)]"
                : "bg-transparent text-[#e6ebff]/80 shadow-[0_0_0_1px_rgba(242,201,76,0.35)] hover:text-[#e6ebff]",
            ].join(" ")}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </header>

      {/* Center content: NO SCROLL */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-6xl items-center justify-center px-6 pb-10">
        <div className="w-full max-w-[720px]">
          <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(10,15,31,0.92),rgba(5,7,13,0.72))] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-8">
            <div className="mb-5">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.title}
              </h1>
              <p className="mt-2 text-sm text-[#9aa4c7] sm:text-base">
                {t.subtitle}
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Role */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold tracking-[0.28em] text-[#9aa4c7]">
                  {t.roleLabel} <span className="text-[#f2c94c]">*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-12 w-full rounded-2xl bg-[#0a0f1f] px-4 text-[#e6ebff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] outline-none transition focus:shadow-[inset_0_0_0_1px_rgba(77,163,255,0.55),0_18px_60px_rgba(77,163,255,0.10)]"
                >
                  <option value="">{t.rolePlaceholder}</option>
                  {t.roles.map((r: any) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold tracking-[0.28em] text-[#9aa4c7]">
                  {t.emailLabel} <span className="text-[#f2c94c]">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t.emailPh}
                  className="h-12 w-full rounded-2xl bg-[#0a0f1f] px-4 text-[#e6ebff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] outline-none transition focus:shadow-[inset_0_0_0_1px_rgba(77,163,255,0.55),0_18px_60px_rgba(77,163,255,0.10)]"
                />
              </div>

              {/* Org */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold tracking-[0.28em] text-[#9aa4c7]">
                  {t.orgLabel} <span className="text-[#f2c94c]">*</span>
                </label>
                <input
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder={t.orgPh}
                  className="h-12 w-full rounded-2xl bg-[#0a0f1f] px-4 text-[#e6ebff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] outline-none transition focus:shadow-[inset_0_0_0_1px_rgba(77,163,255,0.55),0_18px_60px_rgba(77,163,255,0.10)]"
                />
              </div>

              {/* Optional message (collapsed by default, NO SCROLL) */}
              <div className="rounded-2xl bg-[#0a0f1f]/60 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                <button
                  type="button"
                  onClick={() => setMessageEnabled((v) => !v)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left"
                >
                  <span className="text-sm text-[#e6ebff]/85">
                    {t.optionalCta}
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0f1f] text-[#e6ebff]/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]">
                    {messageEnabled ? "–" : "+"}
                  </span>
                </button>

                {messageEnabled ? (
                  <div className="mt-2">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.msgPh}
                      rows={3}
                      className="w-full resize-none rounded-2xl bg-[#0a0f1f] px-4 py-3 text-[#e6ebff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] outline-none transition focus:shadow-[inset_0_0_0_1px_rgba(77,163,255,0.55),0_18px_60px_rgba(77,163,255,0.10)]"
                    />
                  </div>
                ) : null}
              </div>

              {/* Error */}
              {error ? (
                <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              {/* Submit (landing-like) */}
              <button
                type="submit"
                disabled={busy}
                className={[
                  "group relative h-14 w-full rounded-full font-semibold tracking-wide",
                  "bg-[#f2c94c] text-[#05070d]",
                  "shadow-[0_0_0_1px_rgba(242,201,76,0.35),0_22px_70px_rgba(242,201,76,0.18)]",
                  "transition hover:translate-y-[-1px] hover:shadow-[0_0_0_1px_rgba(242,201,76,0.45),0_28px_90px_rgba(242,201,76,0.22)]",
                  "disabled:opacity-70 disabled:hover:translate-y-0",
                ].join(" ")}
              >
                <span className="relative z-10">
                  {busy ? t.sending : t.submit}
                </span>
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(600px_120px_at_50%_0%,rgba(255,255,255,0.35),transparent_55%)] opacity-80" />
              </button>

              <div className="flex items-center justify-between pt-1 text-xs text-[#9aa4c7]">
                <span>{t.requiredHint}</span>
                <a
                  href="/"
                  className="text-[#9aa4c7] underline decoration-[#f2c94c]/40 underline-offset-4 hover:text-[#e6ebff]"
                >
                  {t.back}
                </a>
              </div>
            </form>
          </div>

          {/* micro footer spacing without scroll */}
          <div className="h-2" />
        </div>
      </section>
    </main>
  );
}
