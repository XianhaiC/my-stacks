import {
  SESSION_SET_DISPLAY,
  SESSION_SET_AUTHENTICATED,
  SESSION_SET_UNAUTHENTICATED,
} from '../types'

import { DISPLAY_LANDING } from '../../util/constants';

const INITIAL_STATE = {
  display: DISPLAY_LANDING,
  user: {},
  authenticated: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SESSION_SET_DISPLAY:
      return {
        ...state,
        display: action.payload,
      };

    case SESSION_SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };

    case SESSION_SET_UNAUTHENTICATED:
      return INITIAL_STATE;

    default:
      return state;
  }
}
