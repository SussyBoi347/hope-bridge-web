import { Resend } from 'npm:resend@4.0.0';

const TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') || 'hopebridgecommunityservices@gmail.com';
const FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

Deno.serve(async (req) => {
  try {
    const { data } = await req.json();

    if (!data?.name || !data?.email || !data?.message) {
      return Response.json({ error: 'Missing required contact fields' }, { status: 400 });
    }

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Type:</strong> ${data.type || 'N/A'}</p>
      <p><strong>Organization:</strong> ${data.organization || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${String(data.message).replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `;

    if (!resend) {
      return Response.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      replyTo: data.email,
      html
    });

    if (result.error) {
      return Response.json({ error: result.error.message || 'Resend failed' }, { status: 500 });
    }

    return Response.json({ success: true, delivered: true, provider: 'resend', id: result.data?.id || null });
    const webhook = Deno.env.get('CONTACT_FORWARD_WEBHOOK_URL');
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          source: 'hope-bridge-web',
          submitted_at: new Date().toISOString(),
          ...data
        })
      });
    }

    return Response.json({ success: true, forwarded: Boolean(webhook) });
  } catch (error) {
    console.error('Error forwarding contact submission:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
