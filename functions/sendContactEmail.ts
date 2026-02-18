import { Resend } from 'npm:resend@4.0.0';

const TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') || 'hopebridgecommunityservices@gmail.com';
const FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, type, organization, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required contact fields' }, { status: 400 });
    }

    if (!resend) {
      return Response.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Type:</strong> ${type || 'N/A'}</p>
      <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${String(message).replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html
    });

    if (result.error) {
      return Response.json({ error: result.error.message || 'Resend failed' }, { status: 500 });
    }

    return Response.json({ success: true, delivered: true, provider: 'resend', id: result.data?.id || null });
    }

    return Response.json({ success: true, delivered: true, provider: 'resend', id: result.data?.id || null });
    }

    return Response.json({ success: true, delivered: true, provider: 'resend', id: result.data?.id || null });
    const payload = {
      source: 'hope-bridge-web',
      submitted_at: new Date().toISOString(),
      name,
      email,
      type,
      organization,
      message
    };

    const webhookUrl = Deno.env.get('CONTACT_EMAIL_WEBHOOK_URL') || Deno.env.get('CONTACT_FORWARD_WEBHOOK_URL');

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Webhook error: ${response.status} ${err}`);
      }

      return Response.json({ success: true, delivered: true, provider: 'webhook' });
    }

    console.log('sendContactEmail fallback (no webhook configured):', payload);
    return Response.json({ success: true, delivered: false, provider: 'none_configured' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
