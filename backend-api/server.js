require("dotenv").config();
const express = require("express");
const OpenAI = require('openai');
const cors = require('cors');
const { Pool } = require('pg');


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

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database
})
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

// Get list of all products
app.get('/api/products', async (req, res) => {
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
app.get('/api/products/category/:category_id', async (req, res) => {
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
app.get('/api/products/:product_id', async (req, res) => {
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

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
