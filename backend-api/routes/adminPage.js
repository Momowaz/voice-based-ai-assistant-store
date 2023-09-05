// routes/apiProducts.js
const express = require('express');
const pool = require('../Pool');

const router = express.Router();

// Get all products
router.get('/allProducts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

// Create a new product
router.post('/newProduct', async (req, res) => {
  try {
    const { name, price, stock_quantity, description, category_id } = req.body;
    const query = 'INSERT INTO products (name, price, stock_quantity, description, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, price, stock_quantity, description, category_id];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock_quantity, description, category_id } = req.body;
    const query = 'UPDATE products SET name = $1, price = $2, stock_quantity = $3, description = $4, category_id = $5 WHERE id = $6 RETURNING *';
    const values = [name, price, stock_quantity, description, category_id, id];
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
});

module.exports = router;
