import axios from 'axios';

import {
  DATA_SET_STACK,
  DATA_SET_BLOCK,
  SESSION_ERRORS_SET,
  STACK_SET_STACK_FOCUSED,
} from '../types';

// ----- stack resource actions

// create
export const dataStackCreate = (stackData) => (dispatch) => {
  axios.post('/stacks', stackData)
      .then((res) => {
        console.log('[INFO] Stack created', res.data);

        // newly created stack, so technically it hasn't 'loaded' yet
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
      .catch((err) => {
        console.error('DATA', err);
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
export const dataBlockCreate = (blockData) => (dispatch) => {
  axios.post(`/blocks`, blockData)
      .then((res) => {
        console.log('[INFO] Stack created', res.data);

        // the stack had already been loaded, so set this for consistency
        res.data.stack.loaded = true;
        console.log(res.data.block);

        dispatch({
          type: DATA_SET_BLOCK,
          payload: res.data.block,
        });

        dispatch({
          type: DATA_SET_STACK,
          payload: res.data.stack,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: SESSION_ERRORS_SET,
          payload: err.response.data,
        });
      });
};

// update
export const dataBlockUpdate = (blockData) => (dispatch) => {
  axios.patch(`/blocks/${blockData.blockId}`, blockData)
      .then((response) => {
        console.log(`[INFO] Updated: ${blockData.blockId}`);
        dispatch({
          type: DATA_SET_BLOCK,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: SESSION_ERRORS_SET,
          payload: error.response.data,
        });
      });
};

// delete
export const dataBlockDelete = () => (dispatch) => {
  // TODO
};
