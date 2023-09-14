const express = require('express');
const Stripe = require('stripe');
const pool = require('../Pool');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

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



router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    const payload = req.rawBody.toString('utf8');
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
      console.error("Stripe webhook error:", err);
      return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerId = session.client_reference_id; 
      const paymentId = session.payment_intent;
      const totalPaid = session.amount_total / 100;

      try {
          const result = await pool.query(
              "INSERT INTO payments (customer_id, date, total_paid, stripe_charge_id) VALUES ($1, CURRENT_DATE, $2, $3) RETURNING id", 
              [customerId, totalPaid, paymentId]
          );

          console.log("Successfully inserted into payments table with ID:", result.rows[0].id);
          res.json({received: true});
      } catch (err) {
          console.error("Database error:", err.message);
          res.status(500).send("Server error");
      }
  } else {
      return res.status(400).end();
  }
});


module.exports = router;