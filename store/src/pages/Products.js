import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Typography, Grid, CircularProgress } from "@mui/material";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

const Products = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Update loading state when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setError("Error fetching products. Please try again later.");
        setLoading(false); // Update loading state in case of error
      });
  }, []);

  return (
    <Container
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        textAlign: "center", 
      }}
    >
    
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          // Display products when data is available
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card style={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {product.stock_quantity}
                    </Typography>
                    <Link to={`/product/${product.id}`}>View Details</Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
     
    </Container>
  );
};

export default Products;
