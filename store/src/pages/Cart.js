import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  TextField,
} from '@mui/material';

import PayButton from '../components/payButton';

const Cart = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
    useEffect(() => {
      // Fetch cart items

      const userSubId = sessionStorage.getItem('userSubId');
      
  axios
        .get(`${BACKEND_URL}/api/cart`, {
          headers: {
            'X-User-SubId': userSubId,
          },
        })
        .then((response) => {
          setCartItems(response.data);
          calculateTotals(response.data);
        })
        .catch((error) => {
          console.error('Error fetching cart items', error);
        });
    }, []);

  // Calculate total items and total price
  const calculateTotals = (items) => {
    let totalItemsCount = 0;
    let totalPriceValue = 0;

    items.forEach((item) => {
      totalItemsCount += item.quantity;
      totalPriceValue += item.price * item.quantity;
    });

    setTotalItems(totalItemsCount);
    setTotalPrice(totalPriceValue);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    axios
      .put(`${BACKEND_URL}/api/cart/${itemId}`, { quantity: newQuantity })
      .then((response) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        calculateTotals(updatedCartItems);
      })
      .catch((error) => {
        console.error('Error updating item quantity', error);
      });
  };

  const handleDeleteItem = (itemId) => {
    axios
      .delete(`${BACKEND_URL}/api/cart/${itemId}`)
      .then(() => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
        calculateTotals(updatedCartItems);
      })
      .catch((error) => {
        console.error('Error deleting item from cart', error);
      });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper elevation={3} style={{ padding: '16px', width: '100%' }}>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Typography variant="h6">{item.product_name}</Typography>
                  <Typography variant="body2">Price: ${item.price}</Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">Quantity:</Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </IconButton>
                    <TextField
                      type="number"
                      variant="outlined"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </IconButton>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Remove
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Typography variant="h6">Total Items: {totalItems}</Typography>
        <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
      </Box>
      <PayButton cartItems={cartItems} userId={userId} />
    </div>
  );
};

export default Cart;
