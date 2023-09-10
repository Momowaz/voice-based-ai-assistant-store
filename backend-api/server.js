require("dotenv").config();
const express = require("express");
const OpenAI = require('openai');
const cors = require('cors');
const { Pool } = require('pg');
const database = require("./db/database")
const session = require('express-session');
const pool = require('./Pool');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const apiProducts = require("./routes/apiProducts");
const apiCart = require("./routes/apiCart");
const adminDashboard = require("./routes/adminDashboard");
const AdminLoginPage = require("./routes/AdminLoginPage");
const searchProduct = require("./routes/searchProduct");
const stripeRouter = require('./routes/stripe');

app.use("/api/products", apiProducts);
app.use("/api/cart", apiCart);
app.use("/api/AdminLoginPage", AdminLoginPage);
app.use("/api/adminDashboard", adminDashboard)
app.use("/api/products", searchProduct);
app.use('/api/stripe', stripeRouter);

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




app.post("/askOpenAI", async (req, res) => {
  const { question } = req.body;
  try {
    if (question == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 20,
      temperature: 0.7
    });

    const answer = response.choices[0].message.content;



    // Send the answer as a JSON response
    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing the request' });
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
