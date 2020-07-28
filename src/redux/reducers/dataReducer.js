import {
  DATA_SET_STACKS,
  DATA_SET_STACK,
  DATA_SET_BLOCKS,
  DATA_SET_BLOCK,
  DATA_DELETE_BLOCK,
  DATA_CLEAR,
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

    case DATA_DELETE_BLOCK:
      newState = {
        ...state,
        blocks: {
          ...state.blocks,
        },
        stacks: {
          ...state.stacks,
        },
      };

      const stackId = action.payload.stackId;
      const blockId = action.payload.blockId;

      newState.stacks[stackId] = {
        ...state.stacks[stackId],
        order: state.stacks[stackId].order.filter((id) => id !== blockId),
      };

      delete newState.blocks[blockId];

      return newState;

    case DATA_CLEAR:
      return state;

    default:
      return state;
  }
};
