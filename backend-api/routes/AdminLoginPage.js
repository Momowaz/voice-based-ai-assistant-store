const express = require('express');
const session = require('express-session');
const pool = require('../Pool');
const router = require('./apiProducts');

router.use(
    session({
        secret: '07840537458c3a0e8ca8ff5657f63411409f4cc3946e9df4cfc930c144fa7949',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);


router.post("./", async (req, res) => {

  try {
    const { last_name, email } = req.body; 
    const { rows } = await pool.query('SELECT * FROM admin WHERE last_name = $1 AND email = $2', [last_name, email]);

    if (rows.length === 1) {
      // Authentication successful, store user data in the session
      req.session.user = rows[0];
     
    } else {
      // Authentication failed
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;