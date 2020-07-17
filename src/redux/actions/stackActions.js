import {
  STACK_SET_STACK_FOCUSED,
} from '../types';

export const stackSetStackFocused = (stack) => (dispatch) => {
  dispatch({ type: STACK_SET_STACK_FOCUSED, payload: stack });
}

