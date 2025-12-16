"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en";

type FormState = {
  role: string;
  email: string;
  org: string;
  message: string;
};

export default function EarlyAccessPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("fr");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [state, setState] = useState<FormState>({
    role: "",
    email: "",
    org: "",
    message: "",
  });

  const t = useMemo(() => {
    const FR = {
      title: "Accès anticipé SMAXIA",
      subtitle:
        "Réservé aux élèves ambitieux, enseignants, chercheurs et partenaires stratégiques.",
      youAre: "Vous êtes",
      select: "Sélectionner…",
      roles: {
        student: "Élève / Étudiant",
        parent: "Parent",
        teacher: "Enseignant / Professeur",
        school: "École / Institution",
        other: "Autre",
      },
      email: "Email principal",
      org: "Établissement / Organisation",
      orgPh: "Lycée, Université, Entreprise…",
      msg: "Message (optionnel)",
      msgPh: "Votre objectif, examen, attentes…",
      send: "Envoyer ma demande",
      sending: "Envoi en cours…",
      required: "* Champs obligatoires",
      backHome: "Retour à la page d’accueil",
      errors: {
        required: "Merci de renseigner les champs obligatoires.",
        invalidEmail: "Adresse email invalide.",
        generic: "Impossible d’envoyer votre demande. Réessayez dans 30 secondes.",
      },
    };

    const EN = {
      title: "SMAXIA Early Access",
      subtitle:
        "Reserved for ambitious students, teachers, researchers and strategic partners.",
      youAre: "You are",
      select: "Select…",
      roles: {
        student: "Student",
        parent: "Parent",
        teacher: "Teacher / Professor",
        school: "School / Institution",
        other: "Other",
      },
      email: "Primary email",
      org: "School / Organization",
      orgPh: "High school, University, Company…",
      msg: "Message (optional)",
      msgPh: "Your goal, exam, expectations…",
      send: "Submit my request",
      sending: "Sending…",
      required: "* Required fields",
      backHome: "Back to homepage",
      errors: {
        required: "Please fill in the required fields.",
        invalidEmail: "Invalid email address.",
        generic: "Unable to submit your request. Please try again in 30 seconds.",
      },
    };

    return lang === "fr" ? FR : EN;
  }, [lang]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setError("");
      setState((s) => ({ ...s, [key]: e.target.value }));
    };

  const isValidEmail = (email: string) => {
    // simple + robust enough for frontend validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const role = state.role.trim();
    const email = state.email.trim();
    const org = state.org.trim();

    if (!role || !email || !org) {
      setError(t.errors.required);
      return;
    }
    if (!isValidEmail(email)) {
      setError(t.errors.invalidEmail);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // IMPORTANT: no mailto, no external action
        body: JSON.stringify({
          role,
          email,
          org,
          message: state.message?.trim() || "",
          lang,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          ts: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      router.push("/early-access/success");
    } catch (_err) {
      setError(t.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      {/* Top bar */}
      <header className="topbar">
        <div className="brand">
          {/* Remplacez le src si votre logo est ailleurs */}
          <img className="logo" src="/smaxia-logo.png" alt="SMAXIA" />
          <span className="brandName">SMAXIA</span>
        </div>

        <div className="lang">
          <button
            type="button"
            className={`langBtn ${lang === "fr" ? "active" : ""}`}
            onClick={() => setLang("fr")}
            aria-pressed={lang === "fr"}
          >
            FR
          </button>
          <button
            type="button"
            className={`langBtn ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>
      </header>

      <section className="wrap">
        <div className="card">
          <h1 className="title">{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>

          <form className="form" onSubmit={submit} noValidate>
            <div className="grid">
              <div className="field full">
                <label className="label">
                  {t.youAre} <span className="req">*</span>
                </label>
                <select className="control" value={state.role} onChange={onChange("role")} required>
                  <option value="">{t.select}</option>
                  <option value="student">{t.roles.student}</option>
                  <option value="parent">{t.roles.parent}</option>
                  <option value="teacher">{t.roles.teacher}</option>
                  <option value="school">{t.roles.school}</option>
                  <option value="other">{t.roles.other}</option>
                </select>
              </div>

              <div className="field full">
                <label className="label">
                  {t.email} <span className="req">*</span>
                </label>
                <input
                  className="control"
                  type="email"
                  value={state.email}
                  onChange={onChange("email")}
                  placeholder="prenom.nom@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field full">
                <label className="label">
                  {t.org} <span className="req">*</span>
                </label>
                <input
                  className="control"
                  type="text"
                  value={state.org}
                  onChange={onChange("org")}
                  placeholder={t.orgPh}
                  autoComplete="organization"
                  required
                />
              </div>

              <div className="field full">
                <label className="label">{t.msg}</label>
                <textarea
                  className="control textarea"
                  value={state.message}
                  onChange={onChange("message")}
                  placeholder={t.msgPh}
                />
              </div>
            </div>

            {error ? (
              <div className="alert" role="alert">
                {error}
              </div>
            ) : null}

            <div className="footer">
              <small className="hint">{t.required}</small>

              <button className="submit" type="submit" disabled={loading}>
                {loading ? t.sending : t.send}
              </button>

              <a className="back" href="/">
                {t.backHome}
              </a>
            </div>
          </form>
        </div>
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #0c1230 0%, #05070d 60%);
          color: #e6ebff;
        }

        .topbar {
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.14);
          backdrop-filter: blur(10px);
          background: rgba(5, 7, 13, 0.35);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 180px;
        }
        .logo {
          width: 34px;
          height: 34px;
          object-fit: contain;
          filter: drop-shadow(0 0 18px rgba(242, 201, 76, 0.28))
            drop-shadow(0 0 26px rgba(77, 163, 255, 0.18));
        }
        .brandName {
          letter-spacing: 0.24em;
          font-weight: 600;
          opacity: 0.92;
        }

        .lang {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .langBtn {
          border: 1px solid rgba(242, 201, 76, 0.35);
          background: rgba(2, 6, 23, 0.45);
          color: #e6ebff;
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s ease;
        }
        .langBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(242, 201, 76, 0.6);
        }
        .langBtn.active {
          background: linear-gradient(135deg, #facc6b, #f2c94c);
          color: #020617;
          border-color: transparent;
          box-shadow: 0 12px 30px rgba(250, 204, 21, 0.18);
        }

        .wrap {
          width: 100%;
          padding: 44px 18px 56px;
          display: flex;
          justify-content: center;
        }

        .card {
          width: 100%;
          max-width: 860px;
          border-radius: 18px;
          padding: 34px 28px 26px;
          background: radial-gradient(circle at top, #111735 0%, #05070d 74%);
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.6);
        }

        .title {
          font-size: 42px;
          margin: 0 0 8px;
          letter-spacing: 0.02em;
        }

        .subtitle {
          margin: 0 0 22px;
          color: #9aa4c7;
          max-width: 760px;
          line-height: 1.55;
        }

        .form {
          margin-top: 6px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .label {
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(230, 235, 255, 0.72);
        }

        .req {
          color: #f2c94c;
        }

        .control {
          width: 100%;
          padding: 14px 14px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          background: rgba(2, 6, 23, 0.65);
          color: #e6ebff;
          outline: none;
          font-size: 15px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .control:focus {
          border-color: rgba(77, 163, 255, 0.75);
          box-shadow: 0 0 0 2px rgba(77, 163, 255, 0.18);
          background: rgba(2, 6, 23, 0.88);
        }

        .textarea {
          min-height: 120px;
          resize: vertical;
        }

        .alert {
          margin-top: 14px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(239, 68, 68, 0.35);
          background: rgba(239, 68, 68, 0.08);
          color: rgba(255, 220, 220, 0.95);
        }

        .footer {
          margin-top: 18px;
          display: grid;
          gap: 12px;
          justify-items: center;
        }

        .hint {
          color: rgba(154, 164, 199, 0.9);
        }

        .submit {
          width: 100%;
          max-width: 520px;
          padding: 14px 22px;
          border-radius: 999px;
          border: 1px solid rgba(242, 201, 76, 0.75);
          background: rgba(2, 6, 23, 0.35);
          color: #f2c94c;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
          transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
            color 0.12s ease;
        }

        .submit:hover {
          transform: translateY(-1px);
          background: rgba(242, 201, 76, 0.08);
          box-shadow: 0 24px 65px rgba(0, 0, 0, 0.45);
        }

        .submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .back {
          color: rgba(154, 164, 199, 0.95);
          text-decoration: none;
          border-bottom: 1px solid rgba(154, 164, 199, 0.35);
          padding-bottom: 2px;
        }

        .back:hover {
          border-bottom-color: rgba(242, 201, 76, 0.55);
          color: rgba(230, 235, 255, 0.95);
        }

        @media (max-width: 768px) {
          .topbar {
            padding: 0 16px;
          }
          .card {
            padding: 26px 18px 22px;
          }
          .title {
            font-size: 34px;
          }
        }
      `}</style>
    </main>
  );
}
