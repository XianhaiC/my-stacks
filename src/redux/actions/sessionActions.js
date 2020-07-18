import axios from 'axios';
import fs from 'fs';

import {
  DATA_SET_BLOCKS,
  DATA_SET_STACKS,
  SESSION_SET_AUTHENTICATED,
  SESSION_SET_UNAUTHENTICATED,
  STACK_SET_STACK_FOCUSED,
} from '../types';

import { PATH_APP } from '../../util/constants';

import { fixtureBlocks } from './fixtureBlocks';
import { fixtureStacks } from './fixtureStacks';
import { fixtureUser } from './fixtureUser';

// logs in the user via a firebase token
// fetches the user data upon success and redirects to the app
export const sessionUserLogin = (credentials, history) => (dispatch) => {
  // TODO replace with legitimate token
  setAuthorizationHeader('some_token');
  dispatch(sessionUserFetchData());
  dispatch({ type: SESSION_SET_AUTHENTICATED, payload: fixtureUser });
  history.push(PATH_APP);
}

export const sessionUserSignup = (newUserData, history) => (dispatch) => {
  // TODO
  /*
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUserData)
    .then(res => {
      console.log(res.data);

      setAuthorizationHeader(res.data.token);

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      console.error("DATA", err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    });
    */
}


// fetches the user's stacks and blocks from firebase
export const sessionUserFetchData = () => (dispatch) => {
  // temporary fixture data will be used until the
  // database is ready

  const stacks = fixtureStacks;
  const blocks = fixtureBlocks;
  dispatch({
    type: DATA_SET_STACKS,
    payload: stacks,
  });

  dispatch({
    type: DATA_SET_BLOCKS,
    payload: blocks,
  });

  dispatch({
    type: STACK_SET_STACK_FOCUSED,
    payload: Object.values(stacks).find(stack => stack.isInbox).id,
  });
}

// clears localStorage and redux memory upon logout
export const sessionUserLogout = () => (dispatch) => {
  localStorage.removeItem('userToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SESSION_SET_UNAUTHENTICATED });
}


export const sessionUserUpdate = (userDetails) => (dispatch) => {
  // TODO
}

export const uploadImage = (formData) => (dispatch) => {
  // TODO
  /*
  dispatch({ type: LOADING_USER })
  axios.post('/user/image', formData)
    .then(res => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
    */
}

// ----- helpers

const setAuthorizationHeader = (token) => {
  const userToken = `Bearer ${token}`;
  localStorage.setItem('userToken', userToken);
  axios.defaults.headers.common['Authorization'] = userToken;
};
