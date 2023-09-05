const express = require('express');
const Stripe = require('stripe');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1Nljx4DhF6AB3bRFqBcFcIwv',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${STRIPE_DOMAIN}?success=true`,
    cancel_url: `${STRIPE_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));