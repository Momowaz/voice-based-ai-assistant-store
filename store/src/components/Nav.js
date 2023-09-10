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
  const { user, isAuthenticated} = useAuth0();
  function renderLogin(){
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

  return (
    <nav className="navbar" position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          HOME
        </Typography>
        <Button color="inherit" component={Link} to="/categories">
          Categories
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/speechAI">
          Ask AI🤖
        </Button>
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

export default NavBar;
