import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, type, organization, message } = body;

    // Create Gmail API request using the authorized connector
    const base44 = createClientFromRequest(req);
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');

    const emailBody = `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nType: ${type}\n${organization ? `Organization: ${organization}\n` : ''}Message:\n${message}`;

    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        raw: btoa(`To: hopebridgecommunityservices@gmail.com\nSubject: New Contact Form Submission from ${name}\n\n${emailBody}`)
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Gmail API error: ${errorData}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});