"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en";

const PRIMARY_LOGO = "/logo-smaxia.png"; // public/logo-smaxia.png
const FALLBACK_LOGO = "/LOGO_SRC.png";   // public/LOGO_SRC.png (fallback)

const COPY = {
  fr: {
    title: "Accès anticipé SMAXIA",
    subtitle:
      "Réservé aux élèves ambitieux, enseignants, chercheurs et partenaires stratégiques.",
    youAre: "VOUS ÊTES",
    select: "Sélectionner…",
    email: "EMAIL PRINCIPAL",
    org: "ÉTABLISSEMENT / ORGANISATION",
    orgPh: "Lycée, Université, Entreprise…",
    emailPh: "prenom.nom@email.com",
    addMsg: "Ajouter un message (optionnel)",
    msgTitle: "Message optionnel",
    msgHint: "Objectif, examen, attentes… (facultatif)",
    msgPh: "Votre objectif, examen, attentes…",
    close: "Fermer",
    save: "Enregistrer",
    send: "Envoyer ma demande",
    sending: "Envoi en cours…",
    requiredNote: "* Champs obligatoires",
    backHome: "Retour à la page d’accueil",
    successTitle: "Demande transmise",
    successText:
      "Votre demande d’accès anticipé a été enregistrée. Vous recevrez un email de confirmation.",
    continue: "Continuer",
    errRequired: "Veuillez renseigner tous les champs obligatoires.",
    errGeneric: "Impossible d’envoyer votre demande. Réessayez dans 30 secondes.",
    roles: {
      student: "Élève / Étudiant",
      parent: "Parent",
      teacher: "Enseignant",
      researcher: "Chercheur",
      partner: "Partenaire",
    },
  },
  en: {
    title: "SMAXIA Early Access",
    subtitle:
      "Reserved for ambitious students, teachers, researchers, and strategic partners.",
    youAre: "YOU ARE",
    select: "Select…",
    email: "PRIMARY EMAIL",
    org: "SCHOOL / ORGANIZATION",
    orgPh: "High school, University, Company…",
    emailPh: "name.surname@email.com",
    addMsg: "Add a message (optional)",
    msgTitle: "Optional message",
    msgHint: "Goal, exam, expectations… (optional)",
    msgPh: "Your goal, exam, expectations…",
    close: "Close",
    save: "Save",
    send: "Submit request",
    sending: "Sending…",
    requiredNote: "* Required fields",
    backHome: "Back to home",
    successTitle: "Request submitted",
    successText:
      "Your early access request has been recorded. You will receive a confirmation email.",
    continue: "Continue",
    errRequired: "Please fill in all required fields.",
    errGeneric: "Unable to submit your request. Please retry in 30 seconds.",
    roles: {
      student: "Student",
      parent: "Parent",
      teacher: "Teacher",
      researcher: "Researcher",
      partner: "Partner",
    },
  },
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function PillLang({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "h-9 px-4 rounded-full text-xs font-semibold tracking-wide transition",
        "border",
        active
          ? "bg-[#f2c94c] text-black border-[#f2c94c] shadow-[0_0_30px_rgba(242,201,76,0.25)]"
          : "bg-transparent text-white/80 border-white/15 hover:border-white/25 hover:text-white"
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#070a13]/90 shadow-[0_0_80px_rgba(77,163,255,0.12)]">
        <div className="px-6 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/20"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer ? (
          <div className="px-6 pb-6 pt-1 flex items-center justify-end gap-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function EarlyAccessPage() {
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("fr");

  const t = useMemo(() => COPY[lang], [lang]);

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");

  const [openMsg, setOpenMsg] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roles = useMemo(
    () => [
      { value: "student", label: t.roles.student },
      { value: "parent", label: t.roles.parent },
      { value: "teacher", label: t.roles.teacher },
      { value: "researcher", label: t.roles.researcher },
      { value: "partner", label: t.roles.partner },
    ],
    [t]
  );

  const canSubmit =
    role.trim().length > 0 &&
    email.trim().length > 0 &&
    organization.trim().length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError(t.errRequired);
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          email,
          organization,
          message: message?.trim() ? message.trim() : undefined,
          lang,
        }),
      });

      if (!res.ok) {
        // tente de lire le message serveur
        let serverMsg = "";
        try {
          const j = await res.json();
          serverMsg = (j?.error || j?.message || "").toString();
        } catch {}
        throw new Error(serverMsg || t.errGeneric);
      }

      setOpenSuccess(true);
    } catch (err: any) {
      setError(err?.message || t.errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#05070d] text-white">
      {/* Background premium */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_30%_20%,rgba(77,163,255,0.20),transparent_60%),radial-gradient(900px_500px_at_70%_35%,rgba(242,201,76,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,13,0.2),rgba(5,7,13,1))]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
        {/* Logo (robuste) */}
        <a href="/" className="group flex items-center gap-3">
          <img
            src={PRIMARY_LOGO}
            alt="SMAXIA"
            width={52}
            height={52}
            loading="eager"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              if (!img.src.includes(FALLBACK_LOGO)) img.src = FALLBACK_LOGO;
            }}
            className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_0_40px_rgba(77,163,255,0.12)] transition group-hover:border-white/20"
          />
          <span className="text-sm font-semibold tracking-[0.35em] text-white/90">
            SMAXIA
          </span>
        </a>

        {/* Lang switch (petit, premium) */}
        <div className="flex items-center gap-2">
          <PillLang active={lang === "fr"} onClick={() => setLang("fr")}>
            FR
          </PillLang>
          <PillLang active={lang === "en"} onClick={() => setLang("en")}>
            EN
          </PillLang>
        </div>
      </header>

      {/* Content */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-110px)] w-full max-w-6xl items-center justify-center px-6 pb-10">
        <div className="w-full max-w-2xl">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_0_90px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              {t.title}
            </h1>
            <p className="mt-2 text-base text-white/70">{t.subtitle}</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              {/* Role */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.30em] text-white/70">
                  {t.youAre} <span className="text-[#f2c94c]">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={cx(
                      "h-12 w-full rounded-2xl border bg-white/[0.03] px-4 text-sm outline-none",
                      "border-white/10 text-white/90",
                      "focus:border-white/25 focus:bg-white/[0.05]"
                    )}
                  >
                    <option value="" className="bg-[#05070d]">
                      {t.select}
                    </option>
                    {roles.map((r) => (
                      <option key={r.value} value={r.value} className="bg-[#05070d]">
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.30em] text-white/70">
                  {t.email} <span className="text-[#f2c94c]">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPh}
                  type="email"
                  autoComplete="email"
                  className={cx(
                    "mt-2 h-12 w-full rounded-2xl border bg-white/[0.03] px-4 text-sm outline-none",
                    "border-white/10 text-white/90 placeholder:text-white/35",
                    "focus:border-white/25 focus:bg-white/[0.05]"
                  )}
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.30em] text-white/70">
                  {t.org} <span className="text-[#f2c94c]">*</span>
                </label>
                <input
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder={t.orgPh}
                  type="text"
                  autoComplete="organization"
                  className={cx(
                    "mt-2 h-12 w-full rounded-2xl border bg-white/[0.03] px-4 text-sm outline-none",
                    "border-white/10 text-white/90 placeholder:text-white/35",
                    "focus:border-white/25 focus:bg-white/[0.05]"
                  )}
                />
              </div>

              {/* Optional message (hidden => modal, no scroll) */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setOpenMsg(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/85 hover:border-white/20 hover:text-white"
                >
                  <span>{t.addMsg}</span>
                  <span className="text-white/40">+</span>
                </button>
              </div>

              {/* Error */}
              {error ? (
                <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className={cx(
                    "h-14 w-full rounded-full font-semibold tracking-wide transition",
                    "border border-[#f2c94c]/35",
                    "bg-[#f2c94c] text-black",
                    "shadow-[0_0_60px_rgba(242,201,76,0.22)]",
                    "hover:shadow-[0_0_80px_rgba(242,201,76,0.30)]",
                    "active:scale-[0.99]",
                    submitting && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {submitting ? t.sending : t.send}
                </button>

                <div className="mt-3 flex items-center justify-between text-xs text-white/45">
                  <span>{t.requiredNote}</span>
                  <a href="/" className="underline hover:text-white/70">
                    {t.backHome}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Message modal */}
      <Modal
        open={openMsg}
        title={t.msgTitle}
        onClose={() => setOpenMsg(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setOpenMsg(false)}
              className="h-11 rounded-full border border-white/12 bg-white/5 px-5 text-sm text-white/85 hover:border-white/20 hover:text-white"
            >
              {t.close}
            </button>
            <button
              type="button"
              onClick={() => setOpenMsg(false)}
              className="h-11 rounded-full border border-[#f2c94c]/35 bg-[#f2c94c] px-6 text-sm font-semibold text-black shadow-[0_0_40px_rgba(242,201,76,0.18)] hover:shadow-[0_0_60px_rgba(242,201,76,0.26)]"
            >
              {t.save}
            </button>
          </>
        }
      >
        <p className="mb-3 text-sm text-white/65">{t.msgHint}</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.msgPh}
          rows={6}
          className={cx(
            "w-full rounded-2xl border bg-white/[0.03] p-4 text-sm outline-none",
            "border-white/10 text-white/90 placeholder:text-white/35",
            "focus:border-white/25 focus:bg-white/[0.05]"
          )}
        />
      </Modal>

      {/* Success modal */}
      <Modal
        open={openSuccess}
        title={t.successTitle}
        onClose={() => {
          setOpenSuccess(false);
          router.push("/early-access/success");
        }}
        footer={
          <button
            type="button"
            onClick={() => {
              setOpenSuccess(false);
              router.push("/early-access/success");
            }}
            className="h-11 rounded-full border border-[#f2c94c]/35 bg-[#f2c94c] px-6 text-sm font-semibold text-black shadow-[0_0_40px_rgba(242,201,76,0.18)] hover:shadow-[0_0_60px_rgba(242,201,76,0.26)]"
          >
            {t.continue}
          </button>
        }
      >
        <p className="text-sm text-white/70">{t.successText}</p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/60">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>
              <span className="text-white/40">Role:</span> {role || "—"}
            </span>
            <span>
              <span className="text-white/40">Email:</span> {email || "—"}
            </span>
            <span>
              <span className="text-white/40">Org:</span> {organization || "—"}
            </span>
          </div>
        </div>
      </Modal>
    </main>
  );
}
