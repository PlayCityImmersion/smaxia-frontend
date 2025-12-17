import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(s: string) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const role = String(body?.role ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const organization = String(body?.organization ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const lang = String(body?.lang ?? "fr").trim(); // optionnel

    if (!role || !email || !organization) {
      return NextResponse.json(
        { ok: false, error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email invalide." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY manquante côté serveur." },
        { status: 500 }
      );
    }

    // IMPORTANT :
    // - Si votre domaine n’est PAS vérifié sur Resend, utilisez temporairement :
    //   "SMAXIA <onboarding@resend.dev>"
    // - Dès que smaxia.com est vérifié, mettez "SMAXIA <no-reply@smaxia.com>"
    const from =
      process.env.EARLY_ACCESS_FROM?.trim() || "SMAXIA <onboarding@resend.dev>";

    // Email interne (vous)
    const internalTo = process.env.EARLY_ACCESS_TO?.trim() || "";
    if (!internalTo) {
      return NextResponse.json(
        { ok: false, error: "EARLY_ACCESS_TO manquante (email interne de réception)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 1) Email interne (vous)
    const internalSubject = `SMAXIA — Early Access (${role})`;
    const internalHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Nouvelle demande Early Access</h2>
        <p><b>Rôle :</b> ${escapeHtml(role)}</p>
        <p><b>Email :</b> ${escapeHtml(email)}</p>
        <p><b>Organisation :</b> ${escapeHtml(organization)}</p>
        <p><b>Lang :</b> ${escapeHtml(lang)}</p>
        <p><b>Message :</b><br/>${escapeHtml(message || "(vide)")}</p>
      </div>
    `;

    const r1 = await resend.emails.send({
      from,
      to: internalTo,
      subject: internalSubject,
      reply_to: email, // plus fiable que replyTo
      html: internalHtml,
    });

    if ((r1 as any)?.error) {
      console.error("Resend internal email error:", (r1 as any).error);
      return NextResponse.json(
        { ok: false, error: "Resend a refusé l’envoi interne (FROM/TO/domaine?)." },
        { status: 502 }
      );
    }

    // 2) Accusé de réception utilisateur (premium)
    // Si Resend est en mode test / restrictions, cet envoi peut être refusé.
    // On le tente, mais on ne bloque pas le succès si l’interne est parti.
    const userSubject =
      lang === "en" ? "SMAXIA — Request received" : "SMAXIA — Demande reçue";

    const userHtml =
      lang === "en"
        ? `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <p>Your early access request has been received.</p>
          <p>We will get back to you after validation.</p>
          <p style="margin-top:16px"><b>SMAXIA</b></p>
        </div>
      `
        : `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <p>Votre demande d’accès anticipé a bien été reçue.</p>
          <p>Nous revenons vers vous dès validation.</p>
          <p style="margin-top:16px"><b>SMAXIA</b></p>
        </div>
      `;

    const r2 = await resend.emails.send({
      from,
      to: email,
      subject: userSubject,
      html: userHtml,
    });

    if ((r2 as any)?.error) {
      // On log, mais on ne casse pas l’expérience (sinon vous perdez le formulaire)
      console.warn("Resend user receipt email refused:", (r2 as any).error);
    }

    return NextResponse.json(
      { ok: true, receipt_sent: !(r2 as any)?.error },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Early-access error:", e);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur. Réessayez dans 30 secondes." },
      { status: 500 }
    );
  }
}
