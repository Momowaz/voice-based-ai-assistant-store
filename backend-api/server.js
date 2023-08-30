require("dotenv").config();
const express = require("express");
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));


const OPENAI_API_KEY = '';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const port = process.env.PORT || 3001;

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
