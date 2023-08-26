const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = "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";

app.post('/speech-to-text', async (req, res) => {
  try {
    const audioData = req.body.audio; 

    // Configure Axios to send requests with your API key
    const axiosInstance = axios.create({
      baseURL: 'https://api.openai.com/v1/engines/whisper-large/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });

    // Send a POST request to OpenAI API
    const response = await axiosInstance.post('', {
      audio: audioData, // The audio data received from the frontend
      max_tokens: 512, // Customize parameters as needed
    });

    const transcription = response.data.transcription;

    res.json({ transcription });
  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).json({ message: 'Error processing audio' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
