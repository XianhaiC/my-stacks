import axios from 'axios';

import {
  DATA_SET_STACKS,
  DATA_SET_STACK,
  DATA_SET_BLOCKS,
  SESSION_LOADING_LANDING,
  SESSION_LOADING_STACKS,
  SESSION_LOADING_BLOCKS,
  SESSION_SET_AUTHENTICATED,
  SESSION_SET_UNAUTHENTICATED,
  SESSION_ERRORS_SET,
  STACK_SET_STACK_FOCUSED,
} from '../types';

import {PATH_APP} from '../../util/constants';

// logs in the user via a firebase token
// fetches the user data upon success and redirects to the app
export const sessionUserLogin = (credentials, history) => (dispatch) => {
  dispatch({type: SESSION_LOADING_LANDING, payload: true});
  axios.post('/login', credentials)
      .then((res) => {
        console.log(res.data);

        setAuthorizationHeader(res.data.token);

        dispatch(sessionUserFetchData());
        dispatch({type: SESSION_ERRORS_SET, payload: {}});
        history.push(PATH_APP);
      })
      .catch((err) => {
        dispatch({
          type: SESSION_ERRORS_SET,
          payload: err.response.data,
        });
      });
};

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
        Object.values(res.data.stacks).find((stack) => {
          if (stack.isInbox) stackInboxId = stack.id;
          stack.loaded = false;
        });

        // assert inbox exists
        if (stackInboxId === null) throw '[ERROR] No inbox stack found';

        dispatch({
          type: SESSION_SET_AUTHENTICATED,
          payload: res.data.user,
        });

        dispatch({
          type: DATA_SET_STACKS,
          payload: res.data.stacks,
        });

        dispatch({
          type: STACK_SET_STACK_FOCUSED,
          payload: Object.values(res.data.stacks).find((stack) => stack.isInbox).id,
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
        console.error(err);
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
  dispatch({type: SESSION_SET_UNAUTHENTICATED});
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
