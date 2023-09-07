import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import axios from "axios";

// Declare userId at the top level of your module


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    axios.post("http://localhost:3001/customer/find", user)
    .then(res => {
        const userId = res.data[0].id;
        window.sessionStorage.setItem("userId", userId);
      //  const sessionUser = window.sessionStorage.getItem("userId");
        
    })
  },[])

      const userSubId = user.sub;
    const parts = userSubId.split("|");
    const userId = parts[1];
    console.log('profile user id...', userId);

  return (
     isAuthenticated && (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Box textAlign="center">
              <img
                 src={user.picture}
                 alt={user.name}
                style={{ width: "100px", borderRadius: "50%" }}
              />
              <Typography variant="h4">{user.name}</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    )
   );
};
export default Profile;