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

const apiProducts = require("./routes/apiProducts");


app.use("/api/products", apiProducts);

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

app.post("/customer/find", (req, res) => {
  const user = req.body;
  //database.getUserByEmail(email).then((user) => {
  console.log(user);  
 // })

})

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
