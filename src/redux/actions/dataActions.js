import axios from 'axios';

import {
  DATA_SET_STACK,
  SESSION_ERRORS_SET,
  STACK_SET_STACK_FOCUSED,
} from '../types';

// ----- stack resource actions

// create
export const dataStackCreate = (stackData) => (dispatch) => {
  axios.post('/stacks', stackData)
    .then(res => {
      console.log('[INFO] Stack created', res.data);

      res.data.loaded = false;

      dispatch({
        type: DATA_SET_STACK,
        payload: res.data,
      });

      dispatch({
        type: STACK_SET_STACK_FOCUSED,
        payload: res.data.id,
      });
    })
    .catch(err => {
      console.error("DATA", err)
      dispatch({
        type: SESSION_ERRORS_SET,
        payload: err.response.data,
      });
    });
};

// update
export const dataStackUpdate = () => (dispatch) => {
  // TODO
};

// delete
export const dataStackDelete = () => (dispatch) => {
  // TODO
};

// create
export const dataTaskCreate = () => (dispatch) => {
  // TODO
};

// update
export const dataTaskUpdate = () => (dispatch) => {
  // TODO
};

// delete
export const dataTaskDelete = () => (dispatch) => {
  // TODO
};
