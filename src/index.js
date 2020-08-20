import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

if (process.env.REACT_APP_PROD_ACTIVE === true)
  axios.defaults.baseURL = process.env.REACT_APP_FIREBASE_URL

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
