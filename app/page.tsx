"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Lang = "fr" | "en";

const copy = {
  en: {
    heroTagline1: "The Predictive Intelligence Engine",
    heroTagline2: "for Academic Performance",
    problemTitle1: "The Problem Is Not Learning.",
    problemTitle2: "The Problem Is Prediction.",
    problemP1:
      "Students study without knowing what truly matters. Institutions evaluate performance only after failure occurs. Decisions are made too late.",
    problemP2: "Education measures outcomes. It does not anticipate them.",
    whatTitle: "SMAXIA Is Not an EdTech Platform",
    whatP1:
      "It is not content-based. It is not practice-based. It is not probabilistic guessing.",
    whatP2:
      "SMAXIA is a scientific prediction system built on invariant mathematical structures.",
    howTitle: "From Structure, Not From Probability",
    howProcessLines: [
      "Academic Material (PDFs, Exams, Programs)",
      "Mathematical Kernel (Granulo 15 / Granulo 15C)",
      "Key Questions (QC)",
      "Predictive Scoring (SMAX*)",
      "Performance Forecast (PrediNote)",
      "Adaptive Learning Paths for Each Student",
    ],
    howP:
      "For each chapter, SMAXIA identifies 15 structural questions whose mastery is mathematically linked to the final grade. The system does not \"estimate\" success — it computes it from the underlying structure of knowledge.",
    whyTitle: "Why SMAXIA Changes the Paradigm",
    whyBullets: [
      "Mathematical Invariants — stable across exams, years and systems",
      "Predictive Reliability — focuses on inevitability, not frequency",
      "Curriculum-Agnostic — adaptable across countries and programs",
    ],
    whyHighlight: "This is not optimization. This is anticipation.",
    whoTitle: "Who SMAXIA Is For",
    whoBullets: [
      "Students seeking certainty, not hope",
      "Institutions seeking anticipation, not correction",
      "Systems seeking reliability, not averages",
    ],
    globalTitle: "A New Global Standard",
    globalP1:
      "SMAXIA is designed to become the global reference for academic prediction — across countries, curricula and generations.",
    globalP2: "Performance is no longer discovered. It is foreseen.",
    ctaTitle: "Scientific Partners & Early Contributors",
    ctaP:
      "SMAXIA is opening to a limited circle of partners, researchers and early contributors.",
    ctaButton: "Request Early Access",
    backToTop: "Back to top",
    langFr: "FR",
    langEn: "EN",
  },
  fr: {
    heroTagline1: "Le Moteur d’Intelligence Prédictive",
    heroTagline2: "au service de la performance académique",
    problemTitle1: "Le problème n’est pas l’apprentissage.",
    problemTitle2: "Le problème, c’est la prédiction.",
    problemP1:
      "Les élèves révisent sans savoir exactement ce qui compte vraiment. Les institutions évaluent la performance uniquement après l’échec. Les décisions arrivent trop tard.",
    problemP2:
      "L’école mesure les résultats. Elle ne les anticipe pas encore.",
    whatTitle: "SMAXIA n’est pas une plateforme EdTech classique",
    whatP1:
      "Ce n’est pas du contenu en plus. Ce n’est pas de l’entraînement massif. Ce n’est pas du calcul de probabilités.",
    whatP2:
      "SMAXIA est un système de prédiction scientifique fondé sur des structures mathématiques invariantes.",
    howTitle: "À partir de la structure, pas des probabilités",
    howProcessLines: [
      "Matières académiques (PDF, sujets d’examen, programmes)",
      "Noyau mathématique (Granulo 15 / Granulo 15C)",
      "Questions Clés (QC)",
      "Score prédictif (SMAX*)",
      "Prévision de performance (PrediNote)",
      "Parcours d’apprentissage adaptés à chaque élève",
    ],
    howP:
      "Pour chaque chapitre, SMAXIA identifie 15 questions structurelles dont la maîtrise est mathématiquement liée à la note finale. Le système ne « devine » pas le succès — il le calcule à partir de la structure du savoir.",
    whyTitle: "Pourquoi SMAXIA change le paradigme",
    whyBullets: [
      "Invariants mathématiques — stables d’un examen à l’autre, d’une année à l’autre",
      "Fiabilité prédictive — focalisée sur l’inévitabilité, pas sur la fréquence",
      "Indépendant des programmes — adaptable à tous les systèmes éducatifs",
    ],
    whyHighlight:
      "Ce n’est pas de l’optimisation. C’est de l’anticipation.",
    whoTitle: "Pour qui est conçu SMAXIA",
    whoBullets: [
      "Élèves et étudiants qui cherchent de la certitude, pas de l’espoir",
      "Établissements qui veulent anticiper plutôt que corriger",
      "Systèmes qui visent la fiabilité, pas seulement la moyenne",
    ],
    globalTitle: "Un nouveau standard mondial",
    globalP1:
      "SMAXIA est conçu pour devenir la référence mondiale de la prédiction académique — au-delà des pays, des filières et des générations.",
    globalP2:
      "La performance ne se découvre plus après coup. Elle se prévoit.",
    ctaTitle: "Partenaires scientifiques & contributeurs précoces",
    ctaP:
      "SMAXIA s’ouvre à un cercle limité de partenaires, chercheurs et décideurs stratégiques.",
    ctaButton: "Demander un accès anticipé",
    backToTop: "Remonter en haut de page",
    langFr: "FR",
    langEn: "EN",
  },
} satisfies Record<Lang, any>;

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = copy[lang];

  return (
    <main className="min-h-screen bg-[#05070d] text-slate-100">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 bg-[radial-gradient(circle_at_top,#0c1230_0%,#05070d_60%)]">
        {/* Toggle FR / EN */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button
            onClick={() => setLang("fr")}
            className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
              lang === "fr"
                ? "border-amber-400/80 text-amber-300 bg-black/30"
                : "border-slate-600 text-slate-400 hover:border-slate-300"
            }`}
          >
            {t.langFr}
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
              lang === "en"
                ? "border-amber-400/80 text-amber-300 bg-black/30"
                : "border-slate-600 text-slate-400 hover:border-slate-300"
            }`}
          >
            {t.langEn}
          </button>
        </div>

        {/* Logo + titre */}
        <Image
          src="/logo-smaxia.png"
          alt="SMAXIA Logo"
          width={320}
          height={320}
          priority
          className="w-[260px] md:w-[320px] mb-8 drop-shadow-[0_0_40px_rgba(242,201,76,0.55)] rounded-xl"
        />

        <h1 className="text-[3.6rem] md:text-[4rem] tracking-[0.12em] font-semibold mb-4">
          SMAXIA
        </h1>

        <h2 className="text-[1.2rem] md:text-[1.35rem] text-slate-300 max-w-xl">
          {t.heroTagline1}
          <br />
          {t.heroTagline2}
        </h2>
      </section>

      {/* PROBLEM */}
      <section className="bg-[#0a0f1f]">
        <div className="w-[90%] max-w-[1100px] mx-auto py-12 md:py-16">
          <h3 className="text-[1.9rem] mb-4">
            {t.problemTitle1}
            <br />
            {t.problemTitle2}
          </h3>

          <p className="text-[1.02rem] text-slate-300 max-w-[800px] mb-3">
            {t.problemP1}
          </p>
          <p className="text-[1.02rem] text-slate-100 font-semibold max-w-[800px]">
            {t.problemP2}
          </p>
        </div>
      </section>

      {/* WHAT SMAXIA IS */}
      <section className="bg-[#050915]">
        <div className="w-[90%] max-w-[1100px] mx-auto py-12 md:py-16">
          <h3 className="text-[1.9rem] mb-4">{t.whatTitle}</h3>

          <p className="text-[1.02rem] text-slate-300 max-w-[800px] mb-3">
            {t.whatP1}
          </p>

          <p className="text-[1.02rem] text-slate-100 font-semibold max-w-[800px]">
            {t.whatP2}
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#070b1a]">
        <div className="w-[90%] max-w-[1100px] mx-auto py-12 md:py-16">
          <h3 className="text-[1.9rem] mb-4">{t.howTitle}</h3>

          <div className="bg-[#050814] rounded-xl p-5 font-mono text-[0.95rem] text-[#cdd6ff] leading-relaxed mb-4">
            {t.howProcessLines.map((line: string, idx: number) => (
              <p key={idx}>
                {idx > 0 && <span className="select-none">↓{" "}</span>}
                {line}
              </p>
            ))}
          </div>

          <p className="text-[1.02rem] text-slate-300 max-w-[800px]">
            {t.howP}
          </p>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="bg-[#050915]">
        <div className="w-[90%] max-w-[1100px] mx-auto py-12 md:py-16">
          <h3 className="text-[1.9rem] mb-4">{t.whyTitle}</h3>
          <ul className="list-disc list-inside text-[1.02rem] text-slate-300 max-w-[800px] mb-3 space-y-1">
            {t.whyBullets.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="text-[1.02rem] text-slate-100 font-semibold max-w-[800px]">
            {t.whyHighlight}
          </p>
        </div>
      </section>

      {/* WHO FOR */}
      <section className="bg-[#070b1a]">
        <div className="w-[90%] max-w-[1100px] mx-auto py-12 md:py-16">
          <h3 className="text-[1.9rem] mb-4">{t.whoTitle}</h3>
          <ul className="list-disc list-inside text-[1.02rem] text-slate-300 max-w-[800px] space-y-1">
            {t.whoBullets.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* GLOBAL STANDARD */}
      <section className="bg-[#050915]">
        <div className="w-[90%] max-w-[1100px] mx-auto py-12 md:py-16">
          <h3 className="text-[1.9rem] mb-4">{t.globalTitle}</h3>
          <p className="text-[1.02rem] text-slate-300 max-w-[800px] mb-3">
            {t.globalP1}
          </p>
          <p className="text-[1.02rem] text-slate-100 font-semibold max-w-[800px]">
            {t.globalP2}
          </p>
        </div>
      </section>

      {/* CTA – bouton doré vers /early-access */}
      <section className="bg-[#05070d]">
        <div className="w-[90%] max-w-[1100px] mx-auto py-16 text-center">
          <h3 className="text-[1.9rem] mb-4">{t.ctaTitle}</h3>
          <p className="text-[1.02rem] text-slate-300 max-w-[700px] mx-auto mb-8">
            {t.ctaP}
          </p>

          <Link href="/early-access">
            <button
              className="
                mt-2 inline-flex items-center justify-center
                rounded-full border border-[#f2c94c]/80
                px-10 py-3 text-sm font-medium
                text-[#f2c94c]
                shadow-[0_0_25px_rgba(242,201,76,0.45)]
                hover:bg-[#f2c94c] hover:text-black
                transition-colors duration-200
              "
            >
              {t.ctaButton}
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/60 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="flex flex-col items-center gap-2">
          <span>SMAXIA · Predictive Intelligence Engine · 2025</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[0.7rem] text-slate-400 hover:text-slate-200 underline underline-offset-2"
          >
            {t.backToTop}
          </a>
        </div>
      </footer>
    </main>
  );
}
