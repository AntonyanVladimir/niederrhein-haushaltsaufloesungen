interface Env {
  RESEND_API_KEY: string;
  CONTACT_FROM_EMAIL: string;
  CONTACT_TO_EMAIL: string;
}

type PagesFunction<Bindings> = (context: {
  request: Request;
  env: Bindings;
}) => Response | Promise<Response>;

interface ContactRequest {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  requestType?: string;
  message?: string;
  privacyAccepted?: boolean;
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: corsHeaders() });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: ContactRequest;

  try {
    payload = await request.json();
  } catch {
    return json({ message: 'Ungültige Anfrage.' }, 400);
  }

  const validationError = validate(payload);
  if (validationError) {
    return json({ message: validationError }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
    return json({ message: 'E-Mail-Versand ist nicht konfiguriert.' }, 503);
  }

  const businessResult = await sendEmail(env, {
    to: env.CONTACT_TO_EMAIL,
    replyTo: payload.email!,
    subject: `Neue Anfrage: ${payload.requestType}`,
    text: businessEmailText(payload)
  });

  if (!businessResult.ok) {
    return json({ message: 'Anfrage konnte nicht versendet werden.' }, 502);
  }

  const confirmationResult = await sendEmail(env, {
    to: payload.email!,
    subject: 'Ihre Anfrage bei Niederrhein Haushaltsauflösungen',
    text: customerConfirmationText(payload)
  });

  if (!confirmationResult.ok) {
    return json({ message: 'Anfrage wurde empfangen, Bestätigungsmail konnte nicht versendet werden.' }, 202);
  }

  return json({ message: 'Anfrage wurde versendet.' });
};

function validate(payload: ContactRequest): string | null {
  if (!payload.name?.trim()) return 'Bitte geben Sie Ihren Namen ein.';
  if (!payload.phone?.trim()) return 'Bitte geben Sie Ihre Telefonnummer ein.';
  if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  }
  if (!payload.requestType?.trim()) return 'Bitte wählen Sie eine Anfrageart aus.';
  if (!payload.privacyAccepted) return 'Bitte bestätigen Sie die Datenschutzhinweise.';
  return null;
}

async function sendEmail(env: Env, email: { to: string; replyTo?: string; subject: string; text: string }) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: email.to,
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text
    })
  });
}

function businessEmailText(payload: ContactRequest): string {
  return [
    'Neue Anfrage über die Website',
    '',
    `Name: ${payload.name}`,
    `Telefon: ${payload.phone}`,
    `E-Mail: ${payload.email}`,
    `Ort: ${payload.city || '-'}`,
    `Art der Anfrage: ${payload.requestType}`,
    '',
    'Nachricht:',
    payload.message || '-'
  ].join('\n');
}

function customerConfirmationText(payload: ContactRequest): string {
  return [
    `Guten Tag ${payload.name},`,
    '',
    'vielen Dank für Ihre Anfrage bei Niederrhein Haushaltsauflösungen.',
    'Wir melden uns zeitnah zur Abstimmung der kostenlosen Besichtigung.',
    '',
    'Ihre Angaben:',
    `Telefon: ${payload.phone}`,
    `Ort: ${payload.city || '-'}`,
    `Art der Anfrage: ${payload.requestType}`,
    '',
    'Mit freundlichen Grüßen',
    'Niederrhein Haushaltsauflösungen'
  ].join('\n');
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...corsHeaders()
    }
  });
}

function corsHeaders(): HeadersInit {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type'
  };
}
