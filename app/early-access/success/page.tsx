export default function SuccessPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 10 }}>Demande envoyée</h1>
        <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
          Merci. Votre demande d’accès anticipé a bien été transmise.
        </p>
        <div style={{ marginTop: 18 }}>
          <a href="/" style={{ textDecoration: "underline" }}>Retour à la page d’accueil</a>
        </div>
      </div>
    </main>
  );
}
