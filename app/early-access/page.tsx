"use client";
export default function EarlyAccessPage() {
  return (
    <>
      <main className="wrap">
        <header className="top">
          <div className="brand">
            <img className="logo" src="/smaxia-logo.png" alt="SMAXIA" />
            <span className="name">SMAXIA</span>
          </div>

          <div className="lang">
            <span className="pill active">FR</span>
            <span className="pill">EN</span>
          </div>
        </header>

        <section className="card">
          <h1>Accès anticipé SMAXIA</h1>
          <p className="sub">
            Réservé aux élèves ambitieux, enseignants, chercheurs et partenaires stratégiques.
          </p>

          {/* FORMULAIRE : POST (aucun mailto) */}
          <form
            className="form"
            action="https://formsubmit.co/alexis.zahbi@smaxia.com"
            method="POST"
          >
            {/* Paramètres FormSubmit */}
            <input type="hidden" name="_subject" value="SMAXIA — Nouvelle demande d’accès anticipé" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://smaxia.com/early-access/success" />

            <div className="field">
              <label>VOUS ÊTES *</label>
              <select name="profil" required defaultValue="">
                <option value="" disabled>Sélectionner…</option>
                <option value="Élève / Étudiant">Élève / Étudiant</option>
                <option value="Parent">Parent</option>
                <option value="Enseignant / Professeur">Enseignant / Professeur</option>
                <option value="Chercheur">Chercheur</option>
                <option value="Institution / Partenaire">Institution / Partenaire</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="field">
              <label>EMAIL PRINCIPAL *</label>
              <input type="email" name="email" required placeholder="prenom.nom@gmail.com" />
            </div>

            <div className="field">
              <label>ÉTABLISSEMENT / ORGANISATION *</label>
              <input type="text" name="organisation" required placeholder="Lycée, Université, Entreprise…" />
            </div>

            <div className="field">
              <label>MESSAGE (OPTIONNEL)</label>
              <textarea name="message" rows={4} placeholder="Votre objectif, examen, attentes…" />
            </div>

            <button className="btn" type="submit">Envoyer ma demande</button>

            <a className="back" href="/">Retour à la page d’accueil</a>
          </form>
        </section>
      </main>

      <style jsx global>{`
        :root{
          --bg:#05070d;
          --panel:#070b1a;
          --panel2:#0a0f1f;
          --text:#e6ebff;
          --muted:#9aa4c7;
          --gold:#f2c94c;
          --blue:#4da3ff;
          --border: rgba(148,163,184,.18);
        }
        html,body{height:100%}
        body{
          margin:0;
          font-family: Inter, "Segoe UI", Arial, sans-serif;
          background: radial-gradient(circle at top, #0c1230 0%, #05070d 60%);
          color: var(--text);
        }
        .wrap{
          min-height:100vh;
          padding: 22px 16px 60px;
          display:flex;
          flex-direction:column;
          align-items:center;
        }
        .top{
          width:min(980px, 100%);
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding: 10px 6px 22px;
        }
        .brand{
          display:flex; gap:10px; align-items:center;
        }
        .logo{
          width:28px; height:28px; border-radius:6px;
          object-fit:cover;
          filter: drop-shadow(0 0 20px rgba(242,201,76,.35));
        }
        .name{
          letter-spacing:.25em;
          font-weight:700;
          font-size:.95rem;
          opacity:.92;
        }
        .lang{display:flex; gap:10px;}
        .pill{
          border:1px solid rgba(242,201,76,.45);
          padding:6px 12px;
          border-radius:999px;
          font-size:.85rem;
          opacity:.75;
        }
        .pill.active{
          background: rgba(242,201,76,.10);
          opacity:1;
        }

        .card{
          width:min(740px, 100%);
          background: radial-gradient(circle at top, #111735 0%, #05070d 70%);
          border:1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 24px 60px rgba(0,0,0,.65);
          padding: 26px 22px 22px;
        }
        h1{
          margin:0 0 6px;
          font-size: 2.0rem;
          letter-spacing:.02em;
        }
        .sub{
          margin:0 0 18px;
          color: var(--muted);
        }
        .form{display:grid; gap:14px;}
        .field label{
          display:block;
          font-size:.80rem;
          letter-spacing:.18em;
          color: var(--muted);
          margin: 0 0 8px;
        }
        input, select, textarea{
          width:100%;
          padding: 12px 12px;
          border-radius: 12px;
          border:1px solid rgba(148,163,184,.35);
          background: rgba(15,23,42,.9);
          color: var(--text);
          outline:none;
          font-size: 1rem;
        }
        input:focus, select:focus, textarea:focus{
          border-color: var(--blue);
          box-shadow: 0 0 0 1px rgba(77,163,255,.35);
          background:#020617;
        }
        textarea{resize:vertical; min-height:110px;}
        .btn{
          margin-top: 6px;
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid rgba(242,201,76,.55);
          background: rgba(0,0,0,.25);
          color: var(--gold);
          font-weight: 700;
          cursor:pointer;
          box-shadow: 0 16px 40px rgba(0,0,0,.35);
        }
        .btn:hover{
          filter: brightness(1.05);
          transform: translateY(-1px);
        }
        .back{
          text-align:center;
          color: var(--muted);
          text-decoration: underline;
          font-size: .95rem;
          padding-top: 6px;
        }
      `}</style>
    </>
  );
}
