const express = require('express');
const router = express.Router();
const session = require('express-session');
const pool = require('../Pool');
require("dotenv").config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.use(
  session({
    secret: '07840537458c3a0e8ca8ff5657f63411409f4cc3946e9df4cfc930c144fa7949',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Define a variable to store similar products
let similarProducts = [];

router.post("/products/similar", async (req, res) => {
  const { query } = req.body;

  console.log('ai query', query);
  try {
    // Implement your logic to find similar products based on the query
    similarProducts = await findSimilarProducts(query);
    console.log('similarProducts..', similarProducts)
    res.json(similarProducts);
  } catch (error) {
    console.error('Error fetching similar products:', error);
    res.status(500).json({ error: 'Error fetching similar products' });
  }
});

// Define a function to find similar products
const findSimilarProducts = async (query) => {

  console.log('find similar..', query)
  // Your SQL query to find similar products based on the query
  const searchQuery = 'SELECT * FROM products WHERE description ILIKE $1 LIMIT 5';

  try {
    const { rows } = await pool.query(searchQuery, [`%${query}%`]);
    return rows;
  } catch (error) {
    console.error('Error querying similar products:', error);
    throw error;
  }
};

router.post("/askOpenAI", async (req, res) => {
  const { question } = req.body;
  try {
    if (question == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    let answer = '';

    if (similarProducts.length > 0) {
      answer = 'Please see below the matched item your are looking for...';
    } else {
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

      answer = response.choices[0].message.content;
    }

    // Send the answer as a JSON response
    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing the request' });
  }
});

module.exports = router;
