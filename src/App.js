import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import store from './redux/store';
import {ThemeProvider} from 'styled-components';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import AuthRoute from './util/AuthRoute';
import Landing from './components/landing/Landing';
import Login from './components/landing/Login';
import Signup from './components/landing/Signup';
import Display from './components/Display';

import './App.css';
import {theme} from './styles/theme.js';

import {
  sessionUserLogout,
  sessionUserFetchData,
} from './redux/actions/sessionActions';

import {
  SESSION_SET_AUTHENTICATED,
  SESSION_LOADING_LANDING,
} from './redux/types';

import {PATH_ROOT} from './util/constants';

const token = localStorage.userToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log('[INFO] User session exists', decodedToken);

  // expiration time in milliseconds
  // Date.now() gives the time in seconds
  if (decodedToken.exp * 1000 < Date.now()) {
    // logout the user
    store.dispatch(sessionUserLogout());
    window.location.href = PATH_ROOT;
  } else {
    // fetch the user data
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(sessionUserFetchData());
    store.dispatch({type: SESSION_SET_AUTHENTICATED});
    store.dispatch({type: SESSION_LOADING_LANDING, payload: false});
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>

              <AuthRoute exact path="/app"
                auth={false} redirect="/"
                component={Display} />

              <AuthRoute exact path="/"
                auth={true} redirect="/app"
                component={Landing} />

              <AuthRoute exact path="/login"
                auth={true} redirect="/app"
                component={Login} />

              <AuthRoute exact path="/signup"
                auth={true} redirect="/app"
                component={Signup} />

            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    </Provider>
  );
}

export default App;
