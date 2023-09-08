import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import Slider from "../components/Slider"; 
import Categories from "../pages/Categories";

const Home = () => {
    return (
        <Container
            style={{
                flexDirection: "column",
                alignItems: "center", 
                justifyContent: "center",
                minHeight: "100vh", 
            }}
        >
            <Slider />
            <Paper
                elevation={3}
                style={{
                    padding: "22px",
                    margin: "16px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", 
                    justifyContent: "center",
                    textAlign: "center", 
                    gap: 50

                }}
            >
                <Typography variant="h4">Welcome to Our Store</Typography>
                <Typography>
                    Welcome to our store, where effortless discovery meets AI-driven
                    assistance. Whether you're on the hunt for something specific or
                    seeking suggestions, we're here to fulfill your every need.
                </Typography>

                <Categories />
            </Paper>
        </Container>
    );
};

export default Home;
