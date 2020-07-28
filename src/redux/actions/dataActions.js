import axios from 'axios';

import {
  DATA_SET_STACK,
  DATA_SET_BLOCK,
  DATA_DELETE_BLOCK,
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
export const dataStackUpdate = (stackData, stackId) => (dispatch) => {
  dispatch({
    type: DATA_SET_STACK,
    payload: stackData,
  });
  console.log(stackData);
  axios.patch(`stacks/${stackId}`, stackData)
      .then((response) => {
        console.log(`[INFO] stack ${stackId} updated`);
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
export const dataStackDelete = () => (dispatch) => {
  // TODO
};

// create
export const dataBlockCreate = (blockData) => (dispatch) => {
  axios.post(`/blocks`, blockData)
      .then((res) => {
        console.log('[INFO] Block created', res.data);
        // the stack had already been loaded, so set this for consistency
        res.data.stack.loaded = true;
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
export const dataBlockUpdate = (blockData, blockId) => (dispatch) => {
  console.log(blockData);

  dispatch({
    type: DATA_SET_BLOCK,
    payload: {
      ...blockData,
      id: blockId,
    },
  });

  axios.patch(`/blocks/${blockId}`, blockData)
      .then((response) => {
        console.log(`[INFO] Updated: ${blockId}`);
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
export const dataBlockDelete = (blockData, blockId, stackId) =>
  (dispatch) => {
    dispatch({
      type: DATA_DELETE_BLOCK,
      payload: {blockId, stackId},
    });
    axios.delete(`/blocks/${blockId}`, blockData)
        .catch((error) => {
          console.log(error);
          dispatch({
            type: SESSION_ERRORS_SET,
            payload: error.response.data,
          });
        });
  };
