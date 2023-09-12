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
    <div style={{ paddingTop: "120px" }}>
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
        </Grid>
      )}
    </div>
  );
};

export default Products;
