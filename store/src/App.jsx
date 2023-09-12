import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SpeechAI from './components/speechAI';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import ProductsByCategory from './pages/ProductsByCategory';
import Profile from './components/Profile';
import Nav from './components/Nav';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import CheckoutSuccess from './components/checkoutSuccess';
import SearchResults from './pages/SearchResults';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import { useCustomNavigate } from './hooks/useCustomNavigate';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [cart, setCart] = useState([]);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useCustomNavigate();

  const handleSearch = (searchKeyword) => {
    setLoading(true);
    setResults([]);
    axios.get(`${BACKEND_URL}/api/products/search/${searchKeyword}`)
      .then((response) => {
        setResults(response.data);
        setLoading(false);
        setStatus(true);

        if (status) {
              navigate('/search-results');
            }
      })
      .catch((error) => {
        console.error('Error searching for products:', error);
        setLoading(false);
      });
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };
  

  return (

    <>
      <Nav onSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Categories' element={<Categories />} />
        <Route path='/Products' element={<Products />} />
        <Route path="/products/:category_id" element={<ProductsByCategory />} />
        <Route path="/product/:product_id" element={<ProductDetails />} />
        <Route path='/SpeechAI' element={<SpeechAI />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/pages/AdminLogin" element={<AdminLogin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        <Route path="/search-results" element={<SearchResults results={results} addToCart={addToCart} />} />
      </Routes>
      <Footer />
    
      </>
  );
}
export default App;
