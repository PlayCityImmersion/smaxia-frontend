import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 1) Validations strictes
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

    // 2) Configuration email
    const from =
      process.env.EARLY_ACCESS_FROM?.trim() ||
      "SMAXIA <onboarding@resend.dev>";

    // IMPORTANT : mettez ici VOTRE email (réception interne)
    const internalTo =
      process.env.EARLY_ACCESS_TO?.trim() || "playcityimmersion@gmail.com";

    // 3) Email interne (vous)
    await resend.emails.send({
      from,
      to: internalTo,
      subject: `SMAXIA — Early Access (${role})`,
      replyTo: email, // ✅ bon champ (compile)
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0b1220">
          <h2 style="margin:0 0 12px 0;">Nouvelle demande Early Access</h2>
          <p style="margin:6px 0;"><b>Rôle :</b> ${escapeHtml(role)}</p>
          <p style="margin:6px 0;"><b>Email :</b> ${escapeHtml(email)}</p>
          <p style="margin:6px 0;"><b>Organisation :</b> ${escapeHtml(
            organization
          )}</p>
          <p style="margin:10px 0 6px 0;"><b>Message :</b></p>
          <div style="padding:12px;border:1px solid #e6e8ee;border-radius:10px;background:#f8fafc;">
            ${escapeHtml(message || "(vide)").replaceAll("\n", "<br/>")}
          </div>
          <p style="margin:14px 0 0 0;color:#64748b;font-size:12px;">
            SMAXIA — Early Access pipeline (auto)
          </p>
        </div>
      `,
    });

    // 4) Accusé réception utilisateur
    await resend.emails.send({
      from,
      to: email,
      subject: "SMAXIA — Demande reçue",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.7;color:#0b1220">
          <p style="margin:0 0 10px 0;">Votre demande d’accès anticipé a bien été reçue.</p>
          <p style="margin:0 0 10px 0;">Nous reviendrons vers vous dès validation.</p>
          <div style="margin-top:16px;padding:12px;border:1px solid #e6e8ee;border-radius:12px;background:#f8fafc;">
            <p style="margin:0;"><b>Récapitulatif</b></p>
            <p style="margin:6px 0;"><b>Rôle :</b> ${escapeHtml(role)}</p>
            <p style="margin:6px 0;"><b>Organisation :</b> ${escapeHtml(
              organization
            )}</p>
          </div>
          <p style="margin-top:16px;"><b>SMAXIA</b></p>
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
