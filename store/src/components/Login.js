import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        paddingTop="150px"
        style={{ minHeight: "200vh" }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
