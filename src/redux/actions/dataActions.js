import axios from 'axios';

import {
  DATA_SET_STACK,
  DATA_DELETE_STACK,
  DATA_SET_BLOCK,
  DATA_DELETE_BLOCK,
  DATA_DELETE_STACK_BLOCKS,
  DATA_DELETE_STACK_BLOCKS_MULTIPLE,
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
export const dataStackUpdate = (stackId, stackData) => (dispatch) => {
  dispatch({
    type: DATA_SET_STACK,
    payload: stackData,
  });

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
export const dataStackDelete = (stackId) => (dispatch) => {
  dispatch({
    type: DATA_DELETE_STACK,
    payload: stackId,
  });

  deleteResource(`/stacks/${stackId}`, dispatch);
};

// create
export const dataBlockCreate = (blockData) => (dispatch) => {
  dispatch({
    type: DATA_SET_BLOCK,
    payload: blockData,
  });

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
export const dataBlockUpdate = (blockId, blockData) => (dispatch) => {
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
export const dataBlockDelete = (blockId, stackId) => (dispatch) => {
  dispatch({
    type: DATA_DELETE_BLOCK,
    payload: {blockId, stackId},
  });

  deleteResource(`/blocks/${blockId}`, dispatch);
};

export const dataStackBlocksDelete = (stackId) => (dispatch) => {
  dispatch({
    type: DATA_DELETE_STACK_BLOCKS,
    payload: stackId,
  });

  deleteResource(`/stacks/${stackId}/blocks`, dispatch);
};

export const dataStackBlocksDeleteMultiple = (stackId, blockIds) => (dispatch) => {
  dispatch({
    type: DATA_DELETE_STACK_BLOCKS_MULTIPLE,
    payload: {stackId, blockIds},
  });

  axios.post(`/stacks/${stackId}/blocks`, blockIds)
    .catch((err) => {
      console.error(err);
      dispatch({
        type: SESSION_ERRORS_SET,
        payload: err.response.data,
      });
    });
};

const deleteResource = (url, dispatch) => {
  axios.delete(url)
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SESSION_ERRORS_SET,
        payload: error.response.data,
      });
    });
};
