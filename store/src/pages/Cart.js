import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  TextField,
  Container
} from '@mui/material';

import PayButton from '../components/payButton';

const Cart = () => {
  console.log('cart testing...');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();
  const [userId, setUserId] = useState(null);


 useEffect(() => {
    // Initialize userId from local storage
    const userIdFromLocalStorage = localStorage.getItem('userId');
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
    } else {
      axios.post(`${BACKEND_URL}/customer/find`, user)
        .then(res => {
          const userId = res.data[0].id;
          // Save userId in local storage
          localStorage.setItem('userId', userId);
          setUserId(userId);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }

    if (userId) {
      // Use the userId stored in state to send requests to the backend
      axios.get(`${BACKEND_URL}/api/cart/${userId}`)
        .then((response) => {
          const itemsInCart = response.data;
          setCartItems(itemsInCart);
          calculateTotals(itemsInCart);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
          setLoading(false);
        });
    }
  }, [userId]);

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
  const checkoutButton = {
    marginTop: '10px',
    marginLeft: '5px',
    marginRight: '10px',
    height: '40px',
    borderRadius: '20px',
    backgroundColor: '#08DA55',
  }

  return (
    <Container
    style={{
        paddingTop: '140px',
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        minHeight: "100vh", 
    }}
>s
<div className='shopping-cart-container'>
<h6 className="category-container__header">Your Shopping Cart</h6>
<h5 className="category-container__header">🛒</h5>
      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper elevation={3} style={{ padding: '56px', width: '100%' }}>
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
      <div className= 'cart-total-container'>
      <Box mt={2}>
        <Typography variant="h6">Total Items: {totalItems}</Typography>
        <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
      </Box>
      </div>
      <PayButton style={checkoutButton} 
      cartItems={cartItems} userId={userId} />
      </div>
    </Container>
  );
};


export default Cart;
