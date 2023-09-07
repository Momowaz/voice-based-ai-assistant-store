import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Container, Typography, Grid, CircularProgress } from '@mui/material';

const ProductsByCategory = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { category_id } = useParams(); // Get the category_id from the URL

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products/category/${category_id}`)
      .then((response) => {
        setProducts(response.data);
        console.log("response..", response.data)
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching products', error);
        setLoading(false); 
      });
  }, [category_id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container
    style={{
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
    <Typography variant="h2">{}</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {product.description}
                </Typography>
                <Link to={`/product/${product.id}`}>View Details</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsByCategory;
