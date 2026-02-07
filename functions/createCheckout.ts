import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import Stripe from 'npm:stripe@17.5.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
    apiVersion: '2024-12-18.acacia',
});

Deno.serve(async (req) => {
    try {
        const { amount } = await req.json();

        if (!amount || amount < 1) {
            return Response.json({ error: 'Invalid amount' }, { status: 400 });
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Hope Bridge Donation',
                        description: 'Support Asian teen mental health',
                    },
                    unit_amount: amount * 100, // Convert to cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.headers.get('origin') || 'http://localhost:5173'}/donate?success=true`,
            cancel_url: `${req.headers.get('origin') || 'http://localhost:5173'}/donate?canceled=true`,
            metadata: {
                base44_app_id: Deno.env.get("BASE44_APP_ID")
            }
        });

        return Response.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});