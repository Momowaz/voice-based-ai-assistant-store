const express = require('express');
const Stripe = require('stripe');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  const formattedItems = cartItems.map(item => ({
    price_data: {
      currency: 'cad',
      product_data: {
        name: item.product_name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: formattedItems,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/checkout-success`,
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;