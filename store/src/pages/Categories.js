import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';


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
        <div>
            <Grid container spacing={2}>
                {categories.map(category => (
                    <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {category.name}
                                </Typography>
                                {/* more details or links here */}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
export default Categories;