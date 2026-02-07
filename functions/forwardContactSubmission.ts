import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { data } = await req.json();

        // Get Gmail access token
        const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');

        // Prepare email content
        const emailContent = [
            `From: Hope Bridge <me>`,
            `To: hopebridgecommunityservices@gmail.com`,
            `Subject: New Contact Form Submission from ${data.name}`,
            `Content-Type: text/plain; charset=utf-8`,
            ``,
            `New contact form submission:`,
            ``,
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Type: ${data.type}`,
            data.organization ? `Organization: ${data.organization}` : '',
            ``,
            `Message:`,
            `${data.message}`,
            ``,
            `---`,
            `Submitted: ${new Date().toLocaleString()}`
        ].filter(Boolean).join('\n');

        // Encode email in base64url format
        const encodedEmail = btoa(emailContent)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        // Send via Gmail API
        const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raw: encodedEmail
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Gmail API error: ${error}`);
        }

        return Response.json({ success: true });
    } catch (error) {
        console.error('Error forwarding contact submission:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});