import {
  DATA_SET_STACKS,
  DATA_SET_BLOCKS,
} from '../types';

const INITIAL_STATE = {
  stacks: {},
  blocks: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_SET_STACKS:
      return {
        ...state,
        stacks: action.payload,
      };

    case DATA_SET_BLOCKS:
      return {
        ...state,
        blocks: action.payload,
      };

    default:
      return state;
  }
};
