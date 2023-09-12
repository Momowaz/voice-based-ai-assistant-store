import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout } = useAuth0();
  const handleClick = () => {
    window.sessionStorage.removeItem("userId")
    logout({ logoutParams: { returnTo: window.location.origin } })
    }
    return handleClick();
    };
    export default Logout;