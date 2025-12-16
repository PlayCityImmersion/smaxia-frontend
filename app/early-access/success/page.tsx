export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#05070d] flex items-center justify-center px-6">
      <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center">
        <h1 className="text-3xl font-semibold text-white/95">SMAXIA</h1>
        <p className="mt-4 text-white/70">
          Votre demande d’accès anticipé a été transmise.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#f2c94c]/45 px-6 py-3 text-[#f2c94c] hover:border-[#f2c94c] hover:bg-[#f2c94c]/10 transition"
          >
            Retour à l’accueil
          </a>
        </div>
      </div>
    </div>
  );
}
