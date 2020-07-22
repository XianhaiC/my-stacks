import {
  SESSION_SET_DISPLAY,
  SESSION_LOADING_LANDING,
  SESSION_LOADING_STACKS,
  SESSION_LOADING_BLOCKS,
  SESSION_SET_USER,
  SESSION_SET_AUTHENTICATED,
  SESSION_CLEAR,
  SESSION_ERRORS_SET,
} from '../types';

import {DISPLAY_STACK} from '../../util/constants';

const INITIAL_STATE = {
  display: DISPLAY_STACK,
  loadingLanding: false,
  loadingStacks: false,
  loadingBlocks: false,
  user: {},
  authenticated: false,
  errors: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_SET_DISPLAY:
      return {
        ...state,
        display: action.payload,
      };

    case SESSION_LOADING_LANDING:
      return {
        ...state,
        loadingLanding: action.payload,
      };

    case SESSION_LOADING_STACKS:
      return {
        ...state,
        loadingStacks: action.payload,
      };

    case SESSION_LOADING_BLOCKS:
      return {
        ...state,
        loadingBlocks: action.payload,
      };

    case SESSION_SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SESSION_SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case SESSION_CLEAR:
      return state;

    case SESSION_ERRORS_SET:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
