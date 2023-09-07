import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

const ProductDetails = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { product_id } = useParams(); // Get the product_id from the URL
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth0(); 

  useEffect(() => {
    axios.post(`${BACKEND_URL}/customer/find`, user);
    console.log('usersss', user.email)
    const email = user.email;
    setUserEmail(email);
  }, [user]);

  useEffect(() => {
   
    if (userEmail) {
      axios
        .get(`${BACKEND_URL}/customer/findId?email=${userEmail}`)
        .then((response) => {
          const fetchedUserId = response.data[0].id;
          console.log('User ID:', fetchedUserId);
          setCustomerId(fetchedUserId)
        })
        .catch((error) => {
          console.error('Error fetching user ID:', error);
        });
    }

    axios
      .get(`${BACKEND_URL}/api/products/${product_id}`)
      .then((response) => {
        const getProductId = response.data.id;
        setProductId(getProductId);
        setProduct(response.data)
      })
      .catch((error) => {
        console.error('Error fetching product details', error);
      });
  }, [userEmail, product_id]);

  const handleAddToCart = () => {
    
      axios
      .post(`${BACKEND_URL}/api/cart/addItem`, {
        customerId,
        productId,
        quantity
      })
      .then((response) => {
        const { productName, quantity } = response.data;
        setMessage(`Added ${quantity} ${productName} to the cart`);
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error adding item to cart', error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
          <TextField
            type="number"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{ min: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              {message}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
