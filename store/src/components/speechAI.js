import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import AWS from 'aws-sdk';
import './speechAI.css'

const awsConfig = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION
};

console.log(process.env.AWS_ACCESS_KEY_ID);

AWS.config.update(awsConfig);
const polly = new AWS.Polly();

const SpeechAI = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [openAIResponse, setOpenAIResponse] = useState('');
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if (!isListening) {
            SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (isListening) {
            SpeechRecognition.stopListening();
            setIsListening(false);

            askOpenAI(transcript)
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    const clearTranscript = () => {
        resetTranscript();
        setOpenAIResponse('');
    };

    const synthesizeSpeech = async (text) => {
        try {
            const params = {
                Text: text,
                OutputFormat: 'mp3',
                VoiceId: 'Joanna',
            };

            const result = await polly.synthesizeSpeech(params).promise();
            const audioData = result.AudioStream;
            return audioData;
        } catch (error) {
            console.error('Error synthesizing speech:', error);
            return null;
        }
    };

    const playTextToSpeech = async (text) => {
        try {
            const audioData = await synthesizeSpeech(text);
            if (audioData) {
                const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            }
        } catch (error) {
            console.error('Error playing text-to-speech:', error);
        }
    };

    const askOpenAI = async (question) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/askOpenAI`,
                {
                    question: question,
                },
                {
                    headers: {
                        'Authorization': 'Bearer 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',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const answer = response.data;
            setOpenAIResponse(answer.answer);
            playTextToSpeech(answer.answer);
        } catch (error) {
            console.error('Error asking OpenAI:', error);
        }
    };

    const startButton = {
        marginTop: '10px',
        marginLeft: '5px',
        marginRight: '10px',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: '#08DA55',
      }
      const clearButton = {
        marginTop: '10px',
        marginLeft: '15px',
        marginRight: '10px',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: '#FC171F',
      }

    return (
        <Container
            style={{
                paddingTop: '150px',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50vh",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <div className='container'>
                <h2>How can I help you?</h2>
                <br />
                <div className='main-content'>
                    <strong>Your Question:</strong>
                    <p>{transcript}</p>
                </div>
                <div className='main-content'>
                    <strong>AI Response:</strong>
                    <p>{openAIResponse}</p>
                </div>


                <Button
                    variant="contained"
                    style={startButton}
                    onClick={isListening ? stopListening : startListening}
                    className={isListening ? 'listening' : ''}
                >
                    {isListening ? 'Listening...' : 'Start Asking'}
                </Button>
                <Button variant="contained" style={clearButton} onClick={clearTranscript}>
                    Clear
                </Button>

            </div>
        </Container>
    );
};

export default SpeechAI;