import Stripe from 'npm:stripe@17.5.0';

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
const stripe = stripeKey
  ? new Stripe(stripeKey, { apiVersion: '2024-12-18.acacia' })
  : null;

Deno.serve(async (req) => {
  try {
    const { amount } = await req.json();

    if (!amount || amount < 1) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'http://localhost:5173';

    if (!stripe) {
      return Response.json({
        url: `${origin}/donate?success=true&mock_checkout=true&amount=${amount}`,
        mock: true
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Hope Bridge Donation',
            description: 'Support Asian teen mental health'
          },
          unit_amount: amount * 100
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${origin}/donate?success=true`,
      cancel_url: `${origin}/donate?canceled=true`
    });

    return Response.json({ url: session.url, mock: false });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
