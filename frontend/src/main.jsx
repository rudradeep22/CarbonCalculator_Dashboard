import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <ThemeProvider>
      <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN_AUTH}
      clientId={import.meta.env.VITE_CLIENTID_AUTH}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
        <App />
      </Auth0Provider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
