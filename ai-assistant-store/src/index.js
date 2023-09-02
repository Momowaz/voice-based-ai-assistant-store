import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-yzcp4wgaeq16f6z4.us.auth0.com"
    clientId="HZwcQhW5Clpe7mhiV3GYqk9jJcHCZudG"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  
    <React.StrictMode>
      <App />
    </React.StrictMode>

</Auth0Provider>,
);

