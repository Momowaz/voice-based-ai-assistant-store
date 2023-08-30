import React, { useState } from 'react';
import { Button } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import AWS from 'aws-sdk';
import  environment  from '../environment'

const awsConfig = {
    accessKeyId: environment.AWS_ACCESS_KEY_ID,
    secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
    region: environment.AWS_REGION,
};
AWS.config.update(awsConfig);
const polly = new AWS.Polly();

const SpeechAI = () => {
    const BACKEND_URL = environment.BACKEND_URL;
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

    return (
        <>
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

                <div className='btn-style'>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={isListening ? stopListening : startListening}
                        className={isListening ? 'listening' : ''}
                    >
                        {isListening ? 'Listening...' : 'Start Asking'}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={clearTranscript}>
                        Clear
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SpeechAI;
