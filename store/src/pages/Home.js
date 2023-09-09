import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import Slider from "../components/Slider"; 
import Categories from "../pages/Categories";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="main-container" >
            <Slider />
            <div
                elevation={3}
                style={{
                    margin: "10px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 20
                }}
            >
                <p className="main-container__description">
                    Here effortless discovery meets AI-driven
                    assistance.
                    Whether you're on the hunt for something specific or
                    seeking suggestions, we're here to fulfill your every need!🪄
                </p>
                <h4 className="category-container__header">Shop by Category</h4>

                <Categories />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
