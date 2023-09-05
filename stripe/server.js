const stripe = require('stripe')('sk_test_51NljfGDhF6AB3bRFyOgoGVuM1IP65dtumYiElvTj5LyCeMXOZpaRaduBZxYZe72asCOh2kw7IsNlrsCPkLu44j5z00rbPEJZKI');
const express = require('express');
const app = express();
app.use(express.static('public'));

//const STRIPE_DOMAIN = 'http://localhost:4242';

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