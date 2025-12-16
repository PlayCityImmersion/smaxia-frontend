"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Lang = "fr" | "en";

const TEXTS: Record<
  Lang,
  {
    langLabel: string;
    pageTitle: string;
    pageSubtitle: string;
    roleLabel: string;
    rolePlaceholder: string;
    roles: { value: string; label: string }[];
    emailLabel: string;
    orgLabel: string;
    orgPlaceholder: string;
    addMessageToggle: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    backHome: string;
    errorRequired: string;
    mailSubject: string;
  }
> = {
  fr: {
    langLabel: "FR",
    pageTitle: "Accès anticipé SMAXIA",
    pageSubtitle:
      "Réservé aux élèves ambitieux, enseignants, chercheurs et partenaires stratégiques.",
    roleLabel: "Vous êtes",
    rolePlaceholder: "Sélectionnez votre profil",
    roles: [
      { value: "student", label: "Élève / Étudiant" },
      { value: "parent", label: "Parent" },
      { value: "teacher", label: "Enseignant / Professeur" },
      { value: "institution", label: "Établissement / Responsable pédagogique" },
      { value: "researcher", label: "Chercheur / Expert" },
      { value: "investor", label: "Investisseur / Partenaire" },
    ],
    emailLabel: "Email principal",
    orgLabel: "Établissement / Organisation",
    orgPlaceholder: "Ex. Lycée Hoche, Université Paris-Saclay, Fonds d’investissement…",
    addMessageToggle: "Ajouter un message (optionnel)",
    messageLabel: "Message (optionnel)",
    messagePlaceholder:
      "En quelques lignes : votre contexte, vos attentes ou votre intérêt pour SMAXIA.",
    submitLabel: "Envoyer ma demande",
    backHome: "Retour à la page d’accueil",
    errorRequired: "Merci de renseigner tous les champs obligatoires.",
    mailSubject: "Demande d’accès anticipé SMAXIA",
  },
  en: {
    langLabel: "EN",
    pageTitle: "SMAXIA Early Access",
    pageSubtitle:
      "Reserved for ambitious students, educators, researchers and strategic partners.",
    roleLabel: "You are",
    rolePlaceholder: "Select your profile",
    roles: [
      { value: "student", label: "Student" },
      { value: "parent", label: "Parent" },
      { value: "teacher", label: "Teacher / Professor" },
      { value: "institution", label: "School / Academic institution" },
      { value: "researcher", label: "Researcher / Expert" },
      { value: "investor", label: "Investor / Partner" },
    ],
    emailLabel: "Primary email",
    orgLabel: "School / Organization",
    orgPlaceholder: "e.g. Lycée Hoche, University of Oxford, Investment fund…",
    addMessageToggle: "Add a short message (optional)",
    messageLabel: "Message (optional)",
    messagePlaceholder:
      "In a few lines: your context, expectations or interest in SMAXIA.",
    submitLabel: "Send my request",
    backHome: "Back to homepage",
    errorRequired: "Please fill in all required fields.",
    mailSubject: "SMAXIA Early Access Request",
  },
};

export default function EarlyAccessPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = TEXTS[lang];

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!role || !email || !organisation) {
      alert(t.errorRequired);
      return;
    }

    const subject = encodeURIComponent(t.mailSubject);

    const lines = [
      `Lang: ${lang.toUpperCase()}`,
      `Role / Profil: ${
        t.roles.find((r) => r.value === role)?.label || role
      }`,
      `Email: ${email}`,
      `Organisation: ${organisation}`,
      message
        ? `Message:\n${message}`
        : lang === "fr"
        ? "Message: (non renseigné)"
        : "Message: (not provided)",
    ];

    const body = encodeURIComponent(lines.join("\n\n"));

    // Ouvre le client mail local avec un email pré-rempli vers ton adresse pro
    window.location.href = `mailto:alexis.zahbi@smaxia.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-[#05070d] text-slate-100">
      {/* HEADER / LANG SWITCH */}
      <header className="w-full border-b border-slate-800/60 bg-black/20">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-smaxia.png"
              alt="SMAXIA Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-sm tracking-[0.18em] text-slate-300">
              SMAXIA
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`px-2 py-1 rounded-full border ${
                lang === "fr"
                  ? "border-amber-400 text-amber-300 bg-amber-400/10"
                  : "border-slate-700 text-slate-400 hover:border-slate-400"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded-full border ${
                lang === "en"
                  ? "border-amber-400 text-amber-300 bg-amber-400/10"
                  : "border-slate-700 text-slate-400 hover:border-slate-400"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        {/* TITLE BLOCK */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide mb-3">
            {t.pageTitle}
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            {t.pageSubtitle}
          </p>
        </div>

        {/* FORM CARD */}
        <div className="max-w-xl mx-auto bg-[#050914] border border-slate-800/80 rounded-2xl px-5 py-7 md:px-7 md:py-8 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ROLE */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-[0.16em]">
                {t.roleLabel} <span className="text-amber-400">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-black/40 border border-slate-700 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
              >
                <option value="">{t.rolePlaceholder}</option>
                {t.roles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-[0.16em]">
                {t.emailLabel} <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-slate-700 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                placeholder="you@email.com"
              />
            </div>

            {/* ORGANISATION */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-[0.16em]">
                {t.orgLabel} <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                className="w-full bg-black/40 border border-slate-700 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                placeholder={t.orgPlaceholder}
              />
            </div>

            {/* TOGGLE MESSAGE */}
            <button
              type="button"
              onClick={() => setShowMessage((prev) => !prev)}
              className="text-[0.75rem] text-slate-400 underline underline-offset-4 hover:text-slate-200"
            >
              {t.addMessageToggle}
            </button>

            {/* OPTIONAL MESSAGE */}
            {showMessage && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-[0.16em]">
                  {t.messageLabel}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-black/40 border border-slate-700 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60 resize-none"
                  placeholder={t.messagePlaceholder}
                />
              </div>
            )}

            {/* SUBMIT */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/80 px-5 py-2.5 text-sm font-medium text-amber-200 bg-gradient-to-r from-amber-500/10 to-yellow-400/5 hover:from-amber-400/30 hover:to-yellow-300/20 hover:border-amber-300 transition-all shadow-[0_0_25px_rgba(250,204,21,0.25)]"
              >
                {t.submitLabel}
              </button>
            </div>
          </form>
        </div>

        {/* BACK LINK */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-200 underline underline-offset-4"
          >
            {t.backHome}
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/60 border-t border-slate-800 py-6 text-center text-[0.7rem] text-slate-500">
        SMAXIA · Predictive Intelligence Engine · 2025
      </footer>
    </main>
  );
}
