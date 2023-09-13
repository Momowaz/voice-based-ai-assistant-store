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


router.post("/authorization", async (req, res) => {
  const  { email } = req.body; 
  try {
    const { rows } = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);

    if (rows.length > 0) {
      res.status(200).json({exist: true});
     
    } else {
      // Email doesn't exist in the database
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful'})
})

module.exports = router;