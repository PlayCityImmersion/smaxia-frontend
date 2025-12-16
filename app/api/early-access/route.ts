import { Resend } from "resend";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { ok: false, error: "Server misconfigured: RESEND_API_KEY missing." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const role = String(body?.role || "").trim();
    const email = String(body?.email || "").trim();
    const org = String(body?.org || "").trim();
    const message = String(body?.message || "").trim();
    const locale = String(body?.locale || "fr").trim();
    const source = String(body?.source || "").trim();
    const ts = String(body?.ts || "").trim();

    if (!role || !email || !org) {
      return Response.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const toAdmin = process.env.EARLY_ACCESS_TO || "alexis.zahbi@smaxia.com";
    const from =
      process.env.EARLY_ACCESS_FROM || "SMAXIA <onboarding@resend.dev>";

    const subject = `SMAXIA Early Access — ${role} — ${email}`;

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; line-height:1.5">
        <h2 style="margin:0 0 12px 0;">SMAXIA — Early Access Request</h2>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr><td style="padding:6px 12px; color:#666;">Role</td><td style="padding:6px 12px;"><b>${escapeHtml(role)}</b></td></tr>
          <tr><td style="padding:6px 12px; color:#666;">Email</td><td style="padding:6px 12px;"><b>${escapeHtml(email)}</b></td></tr>
          <tr><td style="padding:6px 12px; color:#666;">Org</td><td style="padding:6px 12px;"><b>${escapeHtml(org)}</b></td></tr>
          <tr><td style="padding:6px 12px; color:#666;">Locale</td><td style="padding:6px 12px;">${escapeHtml(locale)}</td></tr>
          <tr><td style="padding:6px 12px; color:#666;">Source</td><td style="padding:6px 12px;">${escapeHtml(source)}</td></tr>
          <tr><td style="padding:6px 12px; color:#666;">Timestamp</td><td style="padding:6px 12px;">${escapeHtml(ts)}</td></tr>
        </table>
        <div style="margin-top:16px; padding:12px; border:1px solid #eee; border-radius:12px;">
          <div style="color:#666; font-size:12px; margin-bottom:6px;">Message</div>
          <div>${escapeHtml(message || "(none)")}</div>
        </div>
      </div>
    `;

    // 1) mail admin (vous)
    const adminSend = await resend.emails.send({
      from,
      to: toAdmin,
      replyTo: email,
      subject,
      html,
    });

    // 2) accusé réception user (optionnel mais premium)
    // Si votre domaine n'est pas vérifié, certains comptes Resend limitent les destinataires.
    // Si ça échoue, on ne bloque pas la demande (on log seulement).
    try {
      await resend.emails.send({
        from,
        to: email,
        subject: locale === "fr" ? "SMAXIA — Demande reçue" : "SMAXIA — Request received",
        html:
          locale === "fr"
            ? `<p>Votre demande d’accès anticipé a bien été reçue. Nous vous recontactons prochainement.</p>`
            : `<p>Your early access request has been received. We will contact you soon.</p>`,
      });
    } catch {
      // silent
    }

    return Response.json({ ok: true, id: adminSend?.data?.id || null });
  } catch (err: any) {
    return Response.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}
