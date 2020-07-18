import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import store from './redux/store';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import AuthRoute from './util/AuthRoute';
import Landing from './components/landing/Landing';
import Login from './components/landing/Login';
import Signup from './components/landing/Signup';
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
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    // update global state and fetch user data
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <AuthRoute exact path="/app"
              auth={false} redirect="/"
              component={Display}
            />
            <AuthRoute exact path="/"
              auth={true} redirect="/app"
              component={Landing}
            />
            <AuthRoute exact path="/login"
              auth={true} redirect="/app"
              component={Login}
            />
            <AuthRoute exact path="/signup"
              auth={true} redirect="/app"
              component={Signup}
            />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
