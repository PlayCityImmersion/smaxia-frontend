"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Locale = "fr" | "en";

type FormState = {
  role: string;
  email: string;
  org: string;
  message: string;
};

const ROLES = [
  { value: "Eleve", fr: "Élève / Étudiant", en: "Student" },
  { value: "Parent", fr: "Parent", en: "Parent" },
  { value: "Enseignant", fr: "Enseignant", en: "Teacher" },
  { value: "Chercheur", fr: "Chercheur", en: "Researcher" },
  { value: "Partenaire", fr: "Partenaire", en: "Partner" },
];

export default function EarlyAccessPage() {
  const router = useRouter();

  const [locale, setLocale] = useState<Locale>("fr");
  const t = useMemo(() => {
    const fr = {
      title: "Accès anticipé SMAXIA",
      subtitle:
        "Réservé aux élèves ambitieux, enseignants, chercheurs et partenaires stratégiques.",
      youAre: "VOUS ÊTES",
      email: "EMAIL PRINCIPAL",
      org: "ÉTABLISSEMENT / ORGANISATION",
      msg: "MESSAGE (OPTIONNEL)",
      msgPh: "Votre objectif, examen, attentes…",
      emailPh: "prenom.nom@email.com",
      orgPh: "Lycée, Université, Entreprise…",
      submit: "Envoyer ma demande",
      home: "Retour à la page d’accueil",
      required: "* Champs obligatoires",
      sending: "Envoi en cours…",
      sentOk: "Demande envoyée. Merci.",
      sentErr: "Impossible d’envoyer votre demande. Réessayez dans 30 secondes.",
      invalidEmail: "Email invalide.",
      missing: "Veuillez compléter les champs obligatoires.",
    };
    const en = {
      title: "SMAXIA Early Access",
      subtitle:
        "Reserved for ambitious students, teachers, researchers and strategic partners.",
      youAre: "YOU ARE",
      email: "PRIMARY EMAIL",
      org: "SCHOOL / ORGANIZATION",
      msg: "MESSAGE (OPTIONAL)",
      msgPh: "Your goals, exam, expectations…",
      emailPh: "name@email.com",
      orgPh: "High school, University, Company…",
      submit: "Submit request",
      home: "Back to home",
      required: "* Required fields",
      sending: "Sending…",
      sentOk: "Request sent. Thank you.",
      sentErr: "Unable to send. Please retry in 30 seconds.",
      invalidEmail: "Invalid email.",
      missing: "Please complete required fields.",
    };
    return locale === "fr" ? fr : en;
  }, [locale]);

  // IMPORTANT: mettez ici le même logo que sur app/page.tsx (landing)
  // Exemple: "/smaxia-logo.png" ou "/logo.png" selon votre /public
  const LOGO_SRC = "/smaxia-logo.png";

  const [form, setForm] = useState<FormState>({
    role: "",
    email: "",
    org: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOkMsg(null);
    setErrMsg(null);

    const role = form.role.trim();
    const email = form.email.trim();
    const org = form.org.trim();

    if (!role || !email || !org) {
      setErrMsg(t.missing);
      return;
    }
    if (!isValidEmail(email)) {
      setErrMsg(t.invalidEmail);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          email,
          org,
          message: form.message?.trim() || "",
          locale,
          source: "smaxia.com/early-access",
          ts: new Date().toISOString(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        // message serveur si dispo, sinon message premium standard
        setErrMsg(data?.error || t.sentErr);
        return;
      }

      setOkMsg(t.sentOk);
      // redirection vers page de succès (si elle existe)
      router.push("/early-access/success");
    } catch {
      setErrMsg(t.sentErr);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#05070d] relative overflow-hidden">
      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_15%,rgba(77,163,255,0.20),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_50%_35%,rgba(242,201,76,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-[#070b15] to-[#05070d]" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5">
              <Image
                src={LOGO_SRC}
                alt="SMAXIA"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-white/90 tracking-[0.22em] font-semibold">
              SMAXIA
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocale("fr")}
              className={`h-11 w-14 rounded-full border text-sm font-semibold transition ${
                locale === "fr"
                  ? "bg-[#f2c94c] text-[#05070d] border-[#f2c94c] shadow-[0_0_35px_rgba(242,201,76,0.18)]"
                  : "bg-transparent text-white/80 border-white/15 hover:border-white/25"
              }`}
              aria-label="FR"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`h-11 w-14 rounded-full border text-sm font-semibold transition ${
                locale === "en"
                  ? "bg-[#f2c94c] text-[#05070d] border-[#f2c94c] shadow-[0_0_35px_rgba(242,201,76,0.18)]"
                  : "bg-transparent text-white/80 border-white/15 hover:border-white/25"
              }`}
              aria-label="EN"
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
          <div className="px-8 py-8 sm:px-10 sm:py-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-white/95">
              {t.title}
            </h1>
            <p className="mt-2 text-white/70">{t.subtitle}</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              <div>
                <div className="text-xs tracking-[0.24em] text-white/60">
                  {t.youAre} <span className="text-[#f2c94c]">*</span>
                </div>
                <select
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#070b15]/60 px-5 py-4 text-white/90 outline-none focus:border-white/20"
                >
                  <option value="" className="text-black">
                    {locale === "fr" ? "Sélectionner…" : "Select…"}
                  </option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value} className="text-black">
                      {locale === "fr" ? r.fr : r.en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-xs tracking-[0.24em] text-white/60">
                  {t.email} <span className="text-[#f2c94c]">*</span>
                </div>
                <input
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder={t.emailPh}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#070b15]/60 px-5 py-4 text-white/90 placeholder:text-white/30 outline-none focus:border-white/20"
                  inputMode="email"
                  autoComplete="email"
                />
              </div>

              <div>
                <div className="text-xs tracking-[0.24em] text-white/60">
                  {t.org} <span className="text-[#f2c94c]">*</span>
                </div>
                <input
                  value={form.org}
                  onChange={(e) => set("org", e.target.value)}
                  placeholder={t.orgPh}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#070b15]/60 px-5 py-4 text-white/90 placeholder:text-white/30 outline-none focus:border-white/20"
                  autoComplete="organization"
                />
              </div>

              <div>
                <div className="text-xs tracking-[0.24em] text-white/60">
                  {t.msg}
                </div>
                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder={t.msgPh}
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-[#070b15]/60 px-5 py-4 text-white/90 placeholder:text-white/30 outline-none focus:border-white/20"
                />
              </div>

              {/* Status */}
              {errMsg && (
                <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                  {errMsg}
                </div>
              )}
              {okMsg && (
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
                  {okMsg}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-full border px-6 py-4 text-base font-semibold transition ${
                    loading
                      ? "cursor-not-allowed border-white/10 bg-white/5 text-white/50"
                      : "border-[#f2c94c]/45 bg-transparent text-[#f2c94c] hover:border-[#f2c94c] hover:bg-[#f2c94c]/10 shadow-[0_0_60px_rgba(242,201,76,0.10)]"
                  }`}
                >
                  {loading ? t.sending : t.submit}
                </button>

                <div className="mt-3 text-center text-xs text-white/40">
                  {t.required}
                </div>

                <div className="mt-6 text-center">
                  <a
                    href="/"
                    className="text-sm text-white/60 hover:text-white/85 transition"
                  >
                    {t.home}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer subtle */}
        <div className="mt-8 text-center text-xs text-white/25">
          SMAXIA · Predictive Intelligence Engine · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
