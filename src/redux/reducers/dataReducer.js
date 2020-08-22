import {
  DATA_SET_STACKS,
  DATA_SET_STACK,
  DATA_DELETE_STACK,
  DATA_SET_BLOCKS,
  DATA_SET_BLOCK,
  DATA_DELETE_BLOCK,
  DATA_DELETE_STACK_BLOCKS,
  DATA_DELETE_STACK_BLOCKS_MULTIPLE,
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

    case DATA_DELETE_STACK:
      newState = {
        ...state,
        blocks: {
          ...state.blocks,
        },
        stacks: {
          ...state.stacks,
        },
      };

      newState.stacks[action.payload].order.forEach((blockId) =>
        delete newState.blocks[blockId],
      );
      delete newState.stacks[action.payload];

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

      const {stackId, blockId} = action.payload;

      newState.stacks[stackId] = {
        ...state.stacks[stackId],
        order: state.stacks[stackId].order.filter((id) => id !== blockId),
      };

      delete newState.blocks[blockId];

      return newState;

    case DATA_DELETE_STACK_BLOCKS:
      newState = {
        ...state,
        blocks: {
          ...state.blocks,
        },
        stacks: {
          ...state.stacks,
        },
      };

      newState.stacks[action.payload].order.forEach((blockId) =>
        delete newState.blocks[blockId],
      );
      newState.stacks[action.payload].order = [];

      return newState;

    case DATA_DELETE_STACK_BLOCKS_MULTIPLE:
      newState = {
        ...state,
        blocks: {
          ...state.blocks,
        },
        stacks: {
          ...state.stacks,
        },
      };

      action.payload.blockIds.forEach((blockId) =>
        delete newState.blocks[blockId],
      );

      const order = newState.stacks[action.payload.stackId].order;
      newState.stacks[action.payload.stackId].order =
        order.filter((blockId) => !action.payload.blockIds.includes(blockId));

      return newState;

    case DATA_CLEAR:
      return state;

    default:
      return state;
  }
};
