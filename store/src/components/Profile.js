import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography, Paper, Box } from "@mui/material";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Please wait...</div>;
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
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Box textAlign="center">
              <img
                // src={user.picture}
                // alt={user.name}
                style={{ width: "100px", borderRadius: "50%" }}
              />
              <Typography variant="h4">Username</Typography>
              <Typography variant="body1">user email</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    )
   );
};

export default Profile;