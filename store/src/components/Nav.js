import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/Home" style={{ textDecoration: 'none', color: 'white' }}>
          Home
        </Typography>
        <Button color="inherit" component={Link} to="/categories">
          Categories
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/speechAI">
          Ask AI
        </Button>
        <Box ml="auto">
          <Button color="inherit" component={Link} to="/profile">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
