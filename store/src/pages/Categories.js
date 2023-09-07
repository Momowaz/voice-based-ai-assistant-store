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
        <Container
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "30vh",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center",
          textAlign: "center", 
        }}
      >
        <h2>Categories</h2>
            <Grid container spacing={2}>
                {categories.map(category => (
                    <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/products/${category.id}`} component={ProductsByCategory} style={{ textDecoration: 'none'}}>
                        <Card style={{ height: '100%' }}> 
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
export default Categories;