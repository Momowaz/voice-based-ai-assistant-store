const express = require('express');
const router = express.Router();
const cartService = require('./cartServices');
const session = require('express-session');
const pool = require('../Pool');
require("dotenv").config();

router.use(
    session({
        secret: '07840537458c3a0e8ca8ff5657f63411409f4cc3946e9df4cfc930c144fa7949',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Get the current shopping cart items
router.get('/', async (req, res) => {
    try {
        const subId = req.session.sub_id;
        const cartContents = cartService.getCartContents(subId);
        res.json(cartContents);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update the quantity of an item in the cart
router.put('/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const newQuantity = parseInt(req.body.quantity);

    try {
        const subId = req.session.sub_id;
        cartService.updateCartItemQuantity(subId, itemId, newQuantity);
        res.json({ message: 'Cart item updated successfully' });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Remove an item from the cart
router.delete('/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);

    try {
        const subId = req.session.sub_id;
        cartService.removeItemFromCart(subId, itemId);
        res.json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/addCart', async (req, res) => {
    try {
        const { product_id, quantity, userId } = req.body;

        // Check if the item already exists in the cart by querying your database
        const existingCartItemQuery = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
        const { rows } = await pool.query(existingCartItemQuery, [userId, product_id]);

        if (rows.length > 0) {
            // If the item already exists, update its quantity
            const existingItemId = rows[0].id;
            const newQuantity = rows[0].quantity + quantity;
            const updateCartItemQuery = 'UPDATE cart_items SET quantity = $1 WHERE id = $2';
            await pool.query(updateCartItemQuery, [newQuantity, existingItemId]);
        } else {
            // Fetch product details from the products table to include in the response
            const getProductDetailsQuery = 'SELECT name, price FROM products WHERE id = $1';

            // Execute the query and handle the response
            const productDetails = await pool.query(getProductDetailsQuery, [product_id]);

            if (productDetails.rows.length > 0) {
                const { name, price } = productDetails.rows[0];

                // Check if the customer exists, create one if not
                const customerQuery = 'INSERT INTO customers (id) VALUES ($1) ON CONFLICT (id) DO NOTHING';
                await pool.query(customerQuery, [userId]);

                // Check if a cart exists for the user, create one if not
                const cartQuery = 'INSERT INTO cart (customer_id) VALUES ($1) ON CONFLICT (customer_id) DO NOTHING RETURNING id';
                const cartResult = await pool.query(cartQuery, [userId]);
                const cartId = cartResult.rows[0]?.id || userId; // Use the newly created cart_id or the existing one



                // Create a new item object
                const newItem = {
                    cart_id: cartId,
                    product_id,
                    quantity,
                };

                // Insert the new item into the cart_items table
                const insertCartItemQuery = 'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)';
                await pool.query(insertCartItemQuery, [cartId, product_id, quantity, price]);

                // Now, you can access "name" from the product details
                res.status(201).json({ message: 'Item added to the cart', productName: name, quantity });
            } else {
                // Handle the case where the product doesn't exist
                res.status(404).json({ error: 'Product not found' });
            }
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    }
});

module.exports = router;
