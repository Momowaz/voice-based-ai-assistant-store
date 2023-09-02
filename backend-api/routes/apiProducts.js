const express = require('express');
const router  = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    database: process.env.database
  })

// Get list of all products
router.get('/', async (req, res) => {
    try {
      const query = 'SELECT * FROM products';
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'An error occurred while fetching products' });
    }
  });
  
  // List of all products under selected category
  router.get('/category/:category_id', async (req, res) => {
    const category_id = req.params.category_id;
    // console.log('did we get the id..', category_id);
    try {
      const query = `SELECT * FROM products WHERE category_id = $1`;
      const { rows } = await pool.query(query, [category_id]);
      // console.log('sss...', res.json(rows))
      res.json(rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'An error occurred while fetching products' });
    }
  });
  
  // Product detail
  router.get('/:product_id', async (req, res) => {
    const product_id = req.params.product_id;
    try {
      // const product_id = req.params.product_id;
      const query = `SELECT * FROM products WHERE id = $1`;
      //const values = [product_id];
      const result = await pool.query(query, [product_id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const product = result.rows[0];
      res.json(product);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;  

  