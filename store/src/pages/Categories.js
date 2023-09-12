import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductsByCategory from './ProductsByCategory'


const Categories = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/categories`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories', error)
            });
    }, []);

    return (
        <div style={{ padding: '140px' }}> 
            <Grid container spacing={4} style={{ justifyContent: 'space-around' }}>
                {categories.map(category => (
                    <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/products/${category.id}`} component={ProductsByCategory} style={{ textDecoration: 'none'}}>

                        <div className="category-card">
                            <CardContent>
                                <div className="category-wrapper">
                                <div className="category-image"></div>
                                <div className="category-name">
                                    <p>{category.name}</p>
                                </div></div>
                            </CardContent>
                            </div>

                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
export default Categories;