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

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      // User is authenticated
      return next();
    } else {
      // User is not authenticated
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  router.post('/customer', async (req, res) => {
    const { lastName, email } = req.body;
  
    try {
      const query = 'SELECT * FROM customers WHERE last_name = $1 AND email = $2';
      const result = await pool.query(query, [lastName, email]);
  
      if (result.rows.length === 1) {
        // Authentication successful
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Authentication failed
        res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  });
  

// Your existing route to fetch user information
router.get('/info', async (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        res.status(200).json({ user });
      } else {
        res.status(401).json({ error: 'User not authenticated' });
      }
  });

module.exports = router;