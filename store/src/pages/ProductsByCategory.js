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
    <div style={{ paddingTop: '120px' }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <div className="item-card">
              <div className="item-container">
              <div className="item__image"></div>
                <h4 className="item__name">
                  {product.name}
                </h4>
                <div className="item__description">
                 {product.description}
                </div>
                <div className="item__price">
                ${product.price}
                </div>
                <div className="item__details">
                <Link to={`/product/${product.id}`}>View Details</Link>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsByCategory;
