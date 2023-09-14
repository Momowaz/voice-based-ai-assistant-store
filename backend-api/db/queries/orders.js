const express = require('express');
const pool = require('.../Pool');

const app = express();
app.use(express.json());

app.post('/create-order', async (req, res) => {
    try {
        const { customerId, cartItems } = req.body;
        let totalAmount = 0;

        cartItems.forEach(item => {
            totalAmount += item.quantity * item.price;
        });

        const newOrder = await pool.query(
            "INSERT INTO orders (customer_id, order_date, total_amount) VALUES ($1, CURRENT_DATE, $2) RETURNING *", 
            [customerId, totalAmount]
        );

        const orderId = newOrder.rows[0].id;

        for (let item of cartItems) {
            await pool.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)", 
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        res.json(newOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});