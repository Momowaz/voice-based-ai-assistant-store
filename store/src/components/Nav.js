import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchResults from '../pages/SearchResults';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from "@mui/icons-material/Chat";
import Icon from "@mui/material/Icon";


function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const { loginWithRedirect } = useAuth0();

  function renderLogin() {
    if (isAuthenticated) {
      return (
        <IconButton color="inherit" component={Link} to="/profile">
          <PersonIcon fontSize="large" />
        </IconButton>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
      );
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword) {

      axios.get(`${BACKEND_URL}/api/products/search/${searchKeyword}`)
        .then((response) => {
          const results = response.data;

          console.log('retrun search', results);

          setSearchResults(results);
          setShowResults(true);
          navigate('/search-results');
        })
        .catch((error) => {
          console.error('Error searching for products:', error);
        });
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const imageStyle = {
    width: '40%',
    height: '35%',
    marginLeft: '90px',
    // padding: '0 30px'
  };

  const buttonStyle = {
    fontSize: '22px'
  };

  return (
    <AppBar position="static" style={{ width: '100%', fontSize: '22px', position: 'fixed', top: '0', zIndex: '1' }}>
      <Toolbar>
        <Typography variant="h2" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img src="/image.png" alt="Image 1" style={imageStyle} />
        </Typography>
        <Button style={buttonStyle} color="inherit" component={Link} to="/categories">
          Categories
        </Button>
        <Button style={buttonStyle} color="inherit" component={Link} to="/products">
          Products
        </Button>

        <form onSubmit={handleSearch} style={{ flexGrow: 1, marginLeft: '60px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}

            style={{ width: '80%', height: '40px', fontSize: '22px' }}
          />
        </form>
        <IconButton
          color="inherit"
          component={Link}
          to="/speechAI"
        >
          <ChatIcon />
        </IconButton>
        <Box ml="auto">
          {renderLogin()}
          <IconButton color="inherit" fontSize="large" aria-label="Cart" component={Link} to="/cart">
            <ShoppingCartIcon />
          </IconButton>
        </Box>

      </Toolbar>

    </AppBar>
  );
}

export default NavBar;
