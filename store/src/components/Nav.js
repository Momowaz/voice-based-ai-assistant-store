import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

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
        
          
          
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart
          </Button>
        </Box>
        {/* } */}
      </Toolbar>
    </nav>
  );
}

export default NavBar;
