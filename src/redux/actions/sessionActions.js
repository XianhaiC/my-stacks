import axios from 'axios';

import {
  DATA_SET_STACKS,
  DATA_SET_STACK,
  DATA_SET_BLOCKS,
  DATA_CLEAR,
  SESSION_LOADING_LANDING,
  SESSION_LOADING_STACKS,
  SESSION_LOADING_BLOCKS,
  SESSION_SET_USER,
  SESSION_SET_AUTHENTICATED,
  SESSION_CLEAR,
  SESSION_ERRORS_SET,
  STACK_SET_STACK_FOCUSED,
  STACK_CLEAR,
  PLAYLIST_CLEAR,
} from '../types';

// logs in the user via a firebase token
// fetches the user data upon success and redirects to the app
export const sessionUserLogin = (credentials, history) => (dispatch) => {
  axios.post('/login', credentials)
      .then((res) => {
        console.log(res.data);

        setAuthorizationHeader(res.data.token);

        dispatch(sessionUserFetchData());
        dispatch({type: SESSION_SET_AUTHENTICATED});
        dispatch({type: SESSION_LOADING_LANDING, payload: false});
      })
      .catch((err) => {
        dispatch({
          type: SESSION_ERRORS_SET,
          payload: err.response.data,
        });
      });
};

// creates a new user
export const sessionUserSignup = (newUserData, history) => (dispatch) => {
  axios.post('/signup', newUserData)
      .then((res) => {
        console.log(res.data);

        setAuthorizationHeader(res.data.token);

        dispatch(sessionUserFetchData());
        dispatch({type: SESSION_SET_AUTHENTICATED});
        dispatch({type: SESSION_ERRORS_SET, payload: {}});
      })
      .catch((err) => {
        console.error('DATA', err);
        dispatch({
          type: SESSION_ERRORS_SET,
          payload: err.response.data,
        });
      });
};

// clears localStorage and redux memory upon logout
export const sessionUserLogout = () => (dispatch) => {
  localStorage.removeItem('userToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({type: SESSION_CLEAR});
  dispatch({type: DATA_CLEAR});
  dispatch({type: PLAYLIST_CLEAR});
  dispatch({type: STACK_CLEAR});
};


// fetches the user's stacks and blocks from firebase
export const sessionUserFetchData = () => (dispatch) => {
  dispatch({type: SESSION_LOADING_STACKS, payload: true});
  axios.get('/users/')
      .then((res) => {
        console.log(res.data);

        let stackInboxId = null;

        // add a 'loaded' flag to each stack
        // this is necessary for lazy loading each stack's blocks
        // find the inbox stack while we're at it too
        Object.values(res.data.stacks).forEach((stack) => {
          if (stack.isInbox) stackInboxId = stack.id;
          stack.loaded = false;
        });

        // assert inbox exists
        if (stackInboxId === null) {
          throw new Error('[ERROR] No inbox stack found');
        }

        dispatch({
          type: SESSION_SET_USER,
          payload: res.data.user,
        });

        dispatch({
          type: DATA_SET_STACKS,
          payload: res.data.stacks,
        });

        dispatch({
          type: STACK_SET_STACK_FOCUSED,
          payload:
          Object.values(res.data.stacks).find((stack) => stack.isInbox).id,
        });

        dispatch({type: SESSION_LOADING_STACKS, payload: false});
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: SESSION_ERRORS_SET,
          payload: err.response.data,
        });
      });
};

export const sessionBlockFetchData = (stackId) => (dispatch, getState) => {
  dispatch({type: SESSION_LOADING_BLOCKS, payload: true});
  axios.get(`/stacks/${stackId}/blocks`)
      .then((res) => {
        console.log(res.data);
        const {stacks, blocks} = getState().data;

        dispatch({
          type: DATA_SET_BLOCKS,
          payload: {...blocks, ...res.data.blocks},
        });

        dispatch({
          type: DATA_SET_STACK,
          payload: {
            ...stacks[stackId],
            loaded: true,
          },
        });

        dispatch({type: SESSION_LOADING_BLOCKS, payload: false});
      })
      .catch((err) => {
        console.error("BLOCK FETCH DATA", stackId)
        console.error(err);
        dispatch({
          type: SESSION_ERRORS_SET,
          payload: err.response.data,
        });
      });
};


export const sessionUserUpdate = (userDetails) => (dispatch) => {
  // TODO
};

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
};

// ----- helpers

const setAuthorizationHeader = (token) => {
  const userToken = `Bearer ${token}`;
  localStorage.setItem('userToken', userToken);
  axios.defaults.headers.common['Authorization'] = userToken;
};
