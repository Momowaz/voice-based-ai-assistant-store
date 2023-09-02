import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ProductDetails = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { product_id } = useParams(); // Get the product_id from the URL
console.log('aaa..', product_id)
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products/${product_id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details', error);
      });
  }, [product_id]);
  console.log('ssss..', product)

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '16px' }}>
      <Card style={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="subtitle1">Category ID: {product.category_id}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
          <Typography variant="body1">Stock Quantity: {product.stock_quantity}</Typography>
          <Typography variant="body2">Description: {product.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
