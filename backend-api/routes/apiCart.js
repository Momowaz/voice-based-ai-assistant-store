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
router.get("/:customerId", async (req, res) => {
    const customerId = req.params.customerId;
    console.log('c Id.', customerId)
  
    try {
      // Query the cart_items table to get the cart items for the customer
      const cartItemsQuery = 'SELECT ci.*, p.name AS product_name, p.price AS product_price FROM cart_items ci INNER JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = (SELECT id FROM cart WHERE customer_id = $1)';
      const { rows } = await pool.query(cartItemsQuery, [customerId]);
  
      res.json(rows);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
  });
// router.get('/', async (req, res) => {
//     try {
//         const subId = req.session.sub_id;
//         const cartContents = cartService.getCartContents(subId);
//         res.json(cartContents);
//     } catch (error) {
//         console.error('Error fetching cart items:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

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

// Add item to the cart
router.post("/addItem", async (req, res) => {
    const { customerId, productId, quantity } = req.body;
  
    try {
      // First, check if a cart already exists for the customer
      const cartQuery = 'INSERT INTO cart (customer_id) VALUES ($1) ON CONFLICT (customer_id) DO NOTHING RETURNING id';
      const cartResult = await pool.query(cartQuery, [customerId]);
      const cartId = cartResult.rows[0]?.id;
  
      // If a cart was created or already exists, add the item to cart_items
      if (cartId) {
        const insertCartItemQuery = 'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)';
        await pool.query(insertCartItemQuery, [cartId, productId, quantity, price]);
  
        res.status(201).json({ message: 'Item added to cart' });
      } else {
        // Handle the case where a cart couldn't be created or found
        res.status(500).json({ error: 'Unable to create or find a cart for the customer' });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    }
  });

module.exports = router;
