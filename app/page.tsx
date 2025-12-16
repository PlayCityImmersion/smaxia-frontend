"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);

  // IMPORTANT: mettez votre domaine Vercel / prod ici si besoin
  // (sert uniquement à la redirection après envoi)
  const NEXT_SUCCESS_URL = useMemo(() => {
    // Si vous êtes déjà sur smaxia.com, laissez comme ci-dessous.
    // Sinon, mettez votre URL Vercel complète.
    return "https://smaxia.com/early-access/success";
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const copyFounderEmail = async () => {
    try {
      await navigator.clipboard.writeText("alexis.zahbi@smaxia.com");
      alert("Email copié : alexis.zahbi@smaxia.com");
    } catch {
      alert("Impossible de copier automatiquement. Email : alexis.zahbi@smaxia.com");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <img className="heroLogo" src="/smaxia-logo.png" alt="SMAXIA Logo" />
        <h1>SMAXIA</h1>
        <h2>
          Predictive Intelligence Engine
          <br />
          for Academic Performance
        </h2>

        <div className="heroActions">
          <button className="primaryBtn" type="button" onClick={() => setOpen(true)}>
            Demander l’accès anticipé
          </button>
          <button className="secondaryBtn" type="button" onClick={copyFounderEmail}>
            Copier l’email du fondateur
          </button>
        </div>
      </section>

      {/* PROBLEM */}
      <section>
        <div className="container">
          <h3>
            The Problem Is Not Learning.
            <br />
            The Problem Is Prediction.
          </h3>
          <p>
            Students study without knowing what truly matters.
            <br />
            Institutions evaluate performance only after failure occurs.
            <br />
            Decisions are made too late.
          </p>
          <p className="highlight">Education measures outcomes. It does not anticipate them.</p>
        </div>
      </section>

      {/* WHAT SMAXIA IS */}
      <section>
        <div className="container">
          <h3>SMAXIA Is Not an EdTech Platform</h3>
          <p>
            It is not content-based.
            <br />
            It is not practice-based.
            <br />
            It is not probabilistic guessing.
          </p>
          <p className="highlight">
            SMAXIA is a scientific prediction system built on invariant mathematical structures.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="container">
          <h3>From Structure, Not From Probability</h3>

          <div className="process">
            Academic Material (PDFs, Exams, Programs)
            <br />↓<br />
            Mathematical Kernel
            <br />↓<br />
            Key Questions (QC)
            <br />↓<br />
            Predictive Scoring
            <br />↓<br />
            Performance Forecast
          </div>

          <p>
            No content memorization.
            <br />
            No subjective evaluation.
            <br />
            Only structural relevance.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h3>Accès anticipé</h3>
        <p>Réservé aux élèves ambitieux, enseignants, chercheurs et partenaires stratégiques.</p>
        <button className="primaryBtn" type="button" onClick={() => setOpen(true)}>
          Ouvrir le formulaire
        </button>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footerInner">
          <div>© 2025 SMAXIA — Predictive Intelligence Engine</div>
          <div className="footerRight">
            <span className="muted">Email :</span>{" "}
            <span className="mono">alexis.zahbi@smaxia.com</span>{" "}
            <button className="linkBtn" type="button" onClick={copyFounderEmail}>
              Copier
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL FORM */}
      {open && (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Accès anticipé">
          <div className="modalBackdrop" onClick={() => setOpen(false)} />
          <div className="modalCard">
            <div className="modalHeader">
              <div>
                <h4>Accès anticipé SMAXIA</h4>
                <p className="muted">
                  Remplissez ce formulaire. À l’envoi, vous recevez automatiquement la demande par email.
                </p>
              </div>
              <button className="closeBtn" type="button" onClick={() => setOpen(false)} aria-label="Fermer">
                ×
              </button>
            </div>

            <form
              className="leadForm"
              action="https://formsubmit.co/alexis.zahbi@smaxia.com"
              method="POST"
            >
              {/* CONFIG FORM SUBMIT */}
              <input type="hidden" name="_subject" value="SMAXIA — Nouvelle demande d’accès anticipé" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={NEXT_SUCCESS_URL} />

              {/* CHAMPS */}
              <div className="field">
                <label htmlFor="role">Vous êtes *</label>
                <select id="role" name="role" required defaultValue="">
                  <option value="" disabled>
                    Sélectionner…
                  </option>
                  <option value="eleve">Élève / Étudiant</option>
                  <option value="parent">Parent</option>
                  <option value="enseignant">Enseignant / Professeur</option>
                  <option value="chercheur">Chercheur</option>
                  <option value="partenaire">Partenaire / Institution</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="email">Email principal *</label>
                <input id="email" name="email" type="email" required placeholder="ex: prenom.nom@gmail.com" />
              </div>

              <div className="field">
                <label htmlFor="org">Établissement / Organisation *</label>
                <input id="org" name="organisation" type="text" required placeholder="ex: Lycée, Université, Ville…" />
              </div>

              <div className="field">
                <label htmlFor="message">Message (optionnel)</label>
                <textarea id="message" name="message" rows={4} placeholder="Votre objectif, examen, attentes…" />
              </div>

              <div className="actions">
                <button className="secondaryBtn" type="button" onClick={() => setOpen(false)}>
                  Annuler
                </button>
                <button className="primaryBtn" type="submit">
                  Envoyer ma demande
                </button>
              </div>

              <div className="note">
                Note : si c’est la première utilisation de FormSubmit, un email d’activation peut être demandé.
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STYLES (1 seul fichier, prêt à copier) */}
      <style jsx global>{`
        :root {
          --bg-main: #05070d;
          --bg-section: #0a0f1f;
          --text-main: #e6ebff;
          --text-muted: #9aa4c7;
          --accent-blue: #4da3ff;
          --accent-gold: #f2c94c;
          --card: rgba(10, 15, 31, 0.8);
          --border: rgba(148, 163, 184, 0.18);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Inter, "Segoe UI", Arial, sans-serif;
          background: radial-gradient(circle at top, #0c1230 0%, #05070d 60%);
          color: var(--text-main);
          line-height: 1.5;
        }

        .container {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 0;
        }

        section {
          background: var(--bg-section);
          margin-bottom: 1px;
        }

        .hero {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex-direction: column;
          background: transparent;
          padding: 90px 20px 70px;
        }

        .heroLogo {
          width: 280px;
          margin-bottom: 18px;
          filter: drop-shadow(0 0 40px rgba(242, 201, 76, 0.55))
            drop-shadow(0 0 80px rgba(77, 163, 255, 0.35));
        }

        .hero h1 {
          font-size: 3.1rem;
          letter-spacing: 0.12em;
          margin-bottom: 12px;
        }

        .hero h2 {
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--text-muted);
          max-width: 680px;
          margin: 0 auto 22px;
        }

        h3 {
          font-size: 1.9rem;
          margin-bottom: 12px;
        }

        p {
          font-size: 1.02rem;
          color: var(--text-muted);
          max-width: 900px;
          margin-bottom: 10px;
        }

        .highlight {
          color: var(--text-main);
          font-weight: 600;
        }

        .process {
          background: #070b1a;
          padding: 28px;
          border-radius: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 0.95rem;
          color: #cdd6ff;
          margin-top: 16px;
          line-height: 1.5;
          border: 1px solid rgba(148, 163, 184, 0.15);
        }

        .heroActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }

        .primaryBtn {
          padding: 11px 26px;
          border-radius: 999px;
          border: 1px solid var(--accent-gold);
          background: linear-gradient(135deg, #facc6b, #f2c94c);
          color: #020617;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(250, 204, 21, 0.25);
          transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
        }

        .primaryBtn:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 40px rgba(250, 204, 21, 0.35);
          filter: brightness(1.03);
        }

        .secondaryBtn {
          padding: 11px 20px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(15, 23, 42, 0.45);
          color: var(--text-main);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }

        .secondaryBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(77, 163, 255, 0.55);
          background: rgba(15, 23, 42, 0.7);
        }

        .cta {
          text-align: center;
          padding: 64px 20px;
        }

        footer {
          background: #03050b;
          padding: 28px 0;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footerInner {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .footerRight {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .muted {
          color: var(--text-muted);
        }

        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        }

        .linkBtn {
          border: none;
          background: transparent;
          color: var(--accent-blue);
          cursor: pointer;
          font-weight: 600;
        }

        /* MODAL */
        .modalOverlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          padding: 16px;
        }

        .modalBackdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.66);
          backdrop-filter: blur(6px);
        }

        .modalCard {
          position: relative;
          width: min(720px, 100%);
          border-radius: 16px;
          background: radial-gradient(circle at top, #111735 0%, #05070d 70%);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65);
          padding: 18px 18px 16px;
        }

        .modalHeader {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .modalHeader h4 {
          font-size: 1.25rem;
          margin-bottom: 4px;
        }

        .closeBtn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(15, 23, 42, 0.45);
          color: var(--text-main);
          font-size: 1.4rem;
          cursor: pointer;
        }

        .leadForm {
          display: grid;
          gap: 12px;
          margin-top: 8px;
        }

        .field label {
          display: block;
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(15, 23, 42, 0.9);
          color: var(--text-main);
          font-size: 0.95rem;
          outline: none;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 1px rgba(77, 163, 255, 0.35);
          background: #020617;
        }

        .actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          flex-wrap: wrap;
          margin-top: 6px;
        }

        .note {
          margin-top: 6px;
          font-size: 0.85rem;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .heroLogo {
            width: 220px;
          }
          .hero h1 {
            font-size: 2.35rem;
          }
          .hero h2 {
            font-size: 1.05rem;
          }
          .actions {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
