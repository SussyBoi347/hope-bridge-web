import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { data } = await req.json();

        // Prepare email body
        const emailBody = [
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

        // Send email using Base44's Core integration
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: 'Hope Bridge',
            to: 'hopebridgecommunityservices@gmail.com',
            subject: `New Contact Form Submission from ${data.name}`,
            body: emailBody
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error('Error forwarding contact submission:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});