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
    const email = user.email;
    setUserEmail(email);
  }, [user]);

  useEffect(() => {
   
    if (userEmail) {
      axios
        .get(`${BACKEND_URL}/customer/findId?email=${userEmail}`)
        .then((response) => {
          const fetchedUserId = response.data[0].id;
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
      .post(`${BACKEND_URL}/api/cart/addCart`, {
        customerId,
        productId,
        quantity
      })
      .then((response) => {
        const { productName, quantity } = response.data;
        setMessage(`Item added to the cart`);
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
