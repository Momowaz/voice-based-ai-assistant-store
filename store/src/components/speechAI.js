import React, { useState, useEffect } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import AWS from 'aws-sdk';
import './speechAI.css'

const awsConfig = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION
};

AWS.config.update(awsConfig);
const polly = new AWS.Polly();

const SpeechAI = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [openAIResponse, setOpenAIResponse] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [similarProducts, setSimilarProducts] = useState([]);


    const fetchSimilarProducts = async (query) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/products/similar`,
                {
                    query: query,
                }
            );
            setSimilarProducts(response.data);
        } catch (error) {
            console.error('Error fetching similar products:', error);
        }
    };

    useEffect(() => {
        if (transcript) {
            fetchSimilarProducts(transcript);
        }
    }, [transcript]);

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
        setSimilarProducts('')
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
            const aiResponsePromise = axios.post(
                `${BACKEND_URL}/api/askOpenAI`,
                {
                    question: question,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const similarProductsPromise = axios.post(
                `${BACKEND_URL}/api/products/similar`,
                {
                    query: question, // Use the same query for similar products
                }
            );

            const [aiResponse, similarProductsResponse] = await Promise.all([
                aiResponsePromise,
                similarProductsPromise,
            ]);

            const aiAnswer = aiResponse.data.answer;
            setOpenAIResponse(aiAnswer);
            playTextToSpeech(aiAnswer);

            const products = similarProductsResponse.data;
            setSimilarProducts(products);
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
                paddingTop: '190px',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "90vh",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <div className='container'>
                <h5 className="category-container__header">Ask our AI for assistance!</h5>
                <br />
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
                <div className='main-content'>
                    <strong>Your Query:</strong>
                    <p>{transcript}</p>
                </div>
                <div className='main-content'>
                    <strong>AI Response:</strong>
                    <p>{openAIResponse}</p>
                </div>

                {similarProducts.length > 0 && (
                    <div className='main-content'>
                        <strong>Similar Products:</strong>
                        <Grid container spacing={2}></Grid>
                            {similarProducts.map((product) => (
                                 <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                 <div className="item-card">
                                   <div className="item-container">
                                     <div className="item__image">
                                       <img src={product.image} alt={product.name} />
                                     </div>
                                     <h4 className="item__name">
                                       {product.name}
                                     </h4>
                                     <div className="item__price">
                                       ${product.price}
                                     </div>
                                     <div className="item__quantity">
                                       {product.stock_quantity} in stock
                                     </div>
                                     <div className="item__details">
                                       <Link to={`/product/${product.id}`}>View Details</Link>
                                     </div>
                                   </div>
                                 </div>
                               </Grid>
                            ))}
                        <Grid container spacing={2}></Grid>
                    </div>
                )}

            </div>
        </Container>
    );
};

export default SpeechAI;