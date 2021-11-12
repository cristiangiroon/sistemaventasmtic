import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="moduloventass.us.auth0.com"
    clientId="T41lH2Vw7BqzvigibmCi1WZibxIdnDdx"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,

  document.getElementById('root')
);

reportWebVitals();
