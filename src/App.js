import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import Display from './components/Display';

import './App.css';


let authenticated;
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  // expiration time in milliseconds
  // Date.now() gives the time in seconds
  if (decodedToken.exp * 1000 < Date.now()) {
    // logout the user
  }
  else {
    axios.defaults.headers.common['Authorization'] = token;
    // update global state and fetch user data
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Display />
      </div>
    </Provider>
  );
}

export default App;
