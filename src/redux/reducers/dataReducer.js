import {
  DATA_SET_STACKS,
  DATA_SET_STACK,
  DATA_SET_BLOCKS,
  DATA_SET_BLOCK,
} from '../types';

const INITIAL_STATE = {
  stacks: {},
  blocks: {},
};

export default (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case DATA_SET_STACKS:
      return {
        ...state,
        stacks: action.payload,
      };

    case DATA_SET_STACK:
      newState = {
        ...state,
        stacks: {
          ...state.stacks,
        },
      };

      newState.stacks[action.payload.id] = action.payload;
      return newState;

    case DATA_SET_BLOCKS:
      return {
        ...state,
        blocks: action.payload,
      };

    case DATA_SET_BLOCK:
      newState = {
        ...state,
        blocks: {
          ...state.blocks,
        },
      };

      newState.blocks[action.payload.id] = action.payload;
      return newState;

    default:
      return state;
  }
};
