Deno.serve(async (req) => {
  try {
    const { data } = await req.json();

    if (!data?.name || !data?.email || !data?.message) {
      return Response.json({ error: 'Missing required contact fields' }, { status: 400 });
    }

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
