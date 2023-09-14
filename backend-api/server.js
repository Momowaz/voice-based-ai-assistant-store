require("dotenv").config();
const express = require("express");
const cors = require('cors');
const { Pool } = require('pg');
const database = require("./db/database")
const session = require('express-session');
const pool = require('./Pool');
const app = express();
app.use(express.json({
  verify: function(req, res, buf) {
    req.rawBody = buf.toString();
  }
}));
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));



const apiProducts = require("./routes/apiProducts");
const apiCart = require("./routes/apiCart");
const adminDashboard = require("./routes/adminDashboard");
const AdminLoginPage = require("./routes/AdminLoginPage");
const searchProduct = require("./routes/searchProduct");
const stripeRouter = require('./routes/stripe');
const askOpenAI = require('./routes/askAI');

app.use("/api/products", apiProducts);
app.use("/api/cart", apiCart);
app.use("/api/AdminLoginPage", AdminLoginPage);
app.use("/api/adminDashboard", adminDashboard)
app.use("/api/products", searchProduct);
app.use('/api/stripe', stripeRouter);
app.use('/api', askOpenAI);

app.use(
  session({
    secret: '07840537458c3a0e8ca8ff5657f63411409f4cc3946e9df4cfc930c144fa7949',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Get list of all categories
app.get('/api/categories', async (req, res) => {
  try {
    const query = 'SELECT * FROM categories';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'An error occurred while fetching categories' });
  }
});

//Check if customer is already in DB, if not, add the costumer

app.post("/customer/find", (req, res) => {
  const user = req.body;
  database.getUserBysub_id(user.sub)
  .then((result) => {
    if(!result) {
      return database.addCustomer(user);
    }
      return res.send(result)
  })
  // .then(() => {
  //   res.status(201).send("OK")  
  // })
})
app.get("/customer/findId", async (req, res) => {
  const userEmail = req.query.email; 
  try {
    const query = 'SELECT id FROM customers WHERE email = $1';
    const { rows } = await pool.query(query, [userEmail]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred while fetching categories' });
  }
});


app.listen(port, () => console.log(`Server is running on port ${port}!!`));
