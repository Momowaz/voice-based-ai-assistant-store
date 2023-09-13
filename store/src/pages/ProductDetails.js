import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

const ProductDetails = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      // If authenticated, make a POST request to get user info
      axios.post("http://localhost:3001/customer/find", user)
        .then((response) => {
          const userSubId = response.data.sub;
          setUserId(userSubId);
        })
        .catch((error) => {
          console.error('Error fetching user info', error);
          setUserId(null); 
        });
    } else {
      // If not authenticated, set the user ID to null
      setUserId(null);
    }
  
    // Fetch product details based on product_id
    axios
      .get(`${BACKEND_URL}/api/products/${product_id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details', error);
      });
  }, [isAuthenticated, product_id, user]);
  

  const handleAddToCart = () => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      // If not authenticated, display a message asking the user to log in
      setMessage('Please log in to add items to your cart.');
      setSnackbarOpen(true);
      return;
    }
  
    // If authenticated, proceed with adding the item to the cart
    axios
      .post(`${BACKEND_URL}/api/cart/addCart`, {
        product_id: product.id,
        quantity,
        userId
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

  const addToCartButton = {
    marginLeft: '30px',
    marginRight: '10px',
    height: '55px',
    borderRadius: '30px',
    backgroundColor: '#9180E5',
  }

  return (
    <div style={{ paddingTop: '120px' }}>
      <div style={{ height: '100%' }}>
        <div className='item-details__container'>
        <div className="item-details__image">
         <img src={product.image} alt={product.name} />
        </div>
        <div className='item-details__info'>
          <div className='item-details__header'>
            {product.name}
          </div>
          <div className='item-details__category'>Category ID: {product.category_id}</div>
          <div className='item-details__quantity'>{product.stock_quantity} in stock</div>
          <div className='item-details__description'>{product.description}</div>
          <div className='item-details__price'>${product.price}</div>
          <TextField
            type="number"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{ min: 1 }}
          />

          <Button style={addToCartButton}
            variant="contained"
            onClick={handleAddToCart}
          ><div className="item-details__button">
            Add to Carts </div>
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
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
