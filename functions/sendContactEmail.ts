Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, type, organization, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required contact fields' }, { status: 400 });
    }

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
