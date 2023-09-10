const express = require('express');
const router  = express.Router();
const pool = require('../Pool');

router.get("/search/:keyword", async (req, res) => {
    const keyword = req.params.keyword;
    console.log('keyowrd..', keyword)
  
    try {
      const searchQuery = 'SELECT * FROM products WHERE name ILIKE $1';
    //   const searchTerm = `%${keyword}%`
    //   console.log('searchTerm', searchTerm);
      const { rows } = await pool.query(searchQuery, [`%${keyword}%`]);
  
      console.log('rows', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error searching for products:', error);
      res.status(500).json({ error: 'An error occurred while searching for products' });
    }
  });
  
  module.exports = router; 