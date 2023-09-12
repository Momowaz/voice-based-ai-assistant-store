import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography, Paper, Box, Button } from "@mui/material";
import axios from "axios";


const Profile = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();

  useEffect(() => {
    axios.post(`${BACKEND_URL}/customer/find`, user)
      .then(res => {
        const userId = res.data[0].id;
        window.sessionStorage.setItem("userId", userId);
      })
  }, [user])


  const handleClick = () => {
    window.sessionStorage.removeItem("userId")
    logout({ logoutParams: { returnTo: window.location.origin } })

  }

  return (
    isAuthenticated && (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: "66px" }}>
            <Box textAlign="center">
              <img
                src={user.picture}
                alt={user.name}
                style={{ width: "100px", borderRadius: "50%" }}
              />
              
              <Typography variant="h4">{user.name}</Typography>
              <Typography variant="body1">{user.email}</Typography>
              <div style={{ padding: "40px" }}>
              <Button onClick={handleClick} variant="contained">Log Out</Button>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    )
  );
};
export default Profile;