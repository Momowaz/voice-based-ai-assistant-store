const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const stripe = require("./routes/stripe");


AWS.config.update({
  region: 'us-east-1', 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const Polly = new AWS.Polly();

router.post('/tts', async (req, res) => {
  const { text } = req.body;
  const params = {
    OutputFormat: 'mp3',
    Text: text,
    TextType: 'text',
    VoiceId: 'Joanna', 
  };

  try {
    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error('Error synthesizing speech:', err);
        res.status(500).json({ error: 'Error synthesizing speech' });
      } else {
        res.status(200).send(data.AudioStream);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Stripe router
app.use("/api/stripe", stripe);



module.exports = router;
