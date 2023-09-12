import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from "@mui/icons-material/Chat";
import Icon from "@mui/material/Icon";


function Nav(props) {
  const { user, isAuthenticated } = useAuth0();
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  // const navigate = useNavigate();

  function renderLogin() {
    if (isAuthenticated) {

      return (<Button color="black" component={Link} to="/logout">
        Logout
      </Button>)

    }
    else {
      return (<Button color="inherit" component={Link} to="/login">
        Login
      </Button>)
    }


  }
  const handleSearch = (e) => {
    e.preventDefault();
    props.onSearch(searchKeyword);
  };

  const imageStyle = {
    width: '80px',
    height: '25%',
    marginLeft: '90px',
    // padding: '0 30px'
  };
 const navButton = {
  marginLeft: '10px',
  marginRight: '10px',
  fontSize: '22px',
  fontWeight: 'bold',
  color: 'white'
 }

 const SearchField = {
  float: 'right',
  padding: '6px',
  border: 'none',
  marginTop: '8px',
  marginRight: '16px',
  fontSize: '17px',
  height: '40px',
  width: '500px',
  borderRadius: '20px',
 }


  return (
    <nav className="navbar" position="static">
      <Toolbar>
      <Typography variant="h2" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img src="/image.png" alt="logo" style={imageStyle} />
        </Typography>
        <Button color="inherit" component={Link} style={navButton} to="/categories">
          Categories
        </Button>
        <Button color="inherit" component={Link} style={navButton} to="/products">
          Products
        </Button>
        <form onSubmit={handleSearch} style={{ flexGrow: 1, marginLeft: '60px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder=" Search for products..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}

            style={SearchField}
          /> </form>
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
    </nav>
  );
}

export default Nav;
