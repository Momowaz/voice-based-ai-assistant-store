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

// Update the quantity of an item in the cart
router.put('/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const { quantity } = req.body;

  try {
    // Perform a SQL UPDATE operation to update the quantity of the item
    const updateQuery = 'UPDATE cart_items SET quantity = $1 WHERE id = $2';
    await pool.query(updateQuery, [quantity, itemId]);
    res.status(204).send(); // Respond with a 204 No Content status
  } catch (error) {
    console.error('Error updating item quantity in cart:', error);
    res.status(500).json({ error: 'An error occurred while updating the item quantity in the cart' });
  }
});

// Remove an item from the cart
router.delete('/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);

  try {
    const deleteQuery = 'DELETE FROM cart_items WHERE id = $1';
    await pool.query(deleteQuery, [itemId]);
    res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/addItem", async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  try {
    // Check if a cart already exists for the customer
    const cartQuery = 'SELECT * FROM cart WHERE customer_id = $1';
    const cartResult = await pool.query(cartQuery, [customerId]);
    let cartId = null;

    if (cartResult.rows.length === 0) {
      // If a cart doesn't exist, create one for the customer
      const createCartQuery = 'INSERT INTO cart (customer_id) VALUES ($1) RETURNING id';
      const createCartResult = await pool.query(createCartQuery, [customerId]);
      cartId = createCartResult.rows[0].id;
    } else {
      // If a cart already exists, use its id
      cartId = cartResult.rows[0].id;
    }


    if (cartId) {
      // Fetch product price from the products table
      const productQuery = 'SELECT price FROM products WHERE id = $1';
      const productResult = await pool.query(productQuery, [productId]);
      const price = productResult.rows[0]?.price;


      if (price !== undefined) {
        // Now that you have the cartId, insert the item into cart_items
        const insertCartItemQuery = 'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)';
        await pool.query(insertCartItemQuery, [cartId, productId, quantity, price]);

        res.status(201).json({ message: 'Item added to cart' });
      } else {
        // Handle the case where the product couldn't be found or has no price
        res.status(404).json({ error: 'Product not found or has no price' });
      }
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
