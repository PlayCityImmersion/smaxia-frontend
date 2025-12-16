import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const role = String(body?.role ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const organization = String(body?.organization ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!role || !email || !organization) {
      return NextResponse.json(
        { ok: false, error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Email invalide." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY manquante côté serveur." },
        { status: 500 }
      );
    }

    const from =
      process.env.EARLY_ACCESS_FROM?.trim() || "SMAXIA <onboarding@resend.dev>";
    const to = process.env.EARLY_ACCESS_TO?.trim() || email; // fallback

    // 1) Email interne (vous)
    await resend.emails.send({
      from,
      to,
      subject: `SMAXIA — Early Access (${role})`,
      replyTo: email,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>Nouvelle demande Early Access</h2>
          <p><b>Rôle :</b> ${escapeHtml(role)}</p>
          <p><b>Email :</b> ${escapeHtml(email)}</p>
          <p><b>Organisation :</b> ${escapeHtml(organization)}</p>
          <p><b>Message :</b><br/>${escapeHtml(message || "(vide)")}</p>
        </div>
      `,
    });

    // 2) Accusé de réception utilisateur (optionnel mais premium)
    await resend.emails.send({
      from,
      to: email,
      subject: "SMAXIA — Demande reçue",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <p>Votre demande d’accès anticipé a bien été reçue.</p>
          <p>Nous revenons vers vous dès validation.</p>
          <p style="margin-top:16px"><b>SMAXIA</b></p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error("Early-access error:", e?.message || e);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur. Réessayez dans 30 secondes." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
