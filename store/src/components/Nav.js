// NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const navbarStyle = {
        width: '100%',
      };

  return (
    <AppBar position="static" style={navbarStyle}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/Home" style={{ textDecoration: 'none', color: 'white' }}>
          Home
        </Typography>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/categories">
          Categories
        </Button>
        <Button color="inherit" component={Link} to="/speechAI">
          Ask AI
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
