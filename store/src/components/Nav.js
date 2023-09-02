import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  const { user, isAuthenticated} = useAuth0();
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
        {/* if (isAuthenticated) {
          <Box ml="auto">
          <Button color="inherit" component={Link} to="/logout">
            Logout
          </Button>
          </Box>
          }
        else { */}
          <Box ml="auto">
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Box>
        {/* } */}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
