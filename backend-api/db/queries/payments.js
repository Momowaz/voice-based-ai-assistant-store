const stripe = require('stripe')('SECRET_KEY');

app.post('/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, 'ENDPOINT_SECRET');
    } catch (err) {
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerId = session.client_reference_id; 
        const paymentId = session.payment_intent;
        const totalPaid = session.amount_total / 100;

        try {
            await pool.query(
                "INSERT INTO payments (customer_id, date, total_paid, stripe_charge_id) VALUES ($1, CURRENT_DATE, $2, $3)", 
                [customerId, totalPaid, paymentId]
            );

            res.json({received: true});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    } else {
        return res.status(400).end();
    }
});