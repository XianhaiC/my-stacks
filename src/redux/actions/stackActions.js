import {
  STACK_SET_STACK_FOCUSED,
} from '../types';

export const stackSetSiderbarVisible = () => (dispatch) => {
  // TODO
}

export const stackSetStackFocused = (stack) => (dispatch) => {
  dispatch({ type: STACK_SET_STACK_FOCUSED, payload: stack });
}

export const stackSetPopupVisibleOptionsSidebar = () => (dispatch) => {
  // TODO
}

export const stackSetPopupVisibleOptionsStack = () => (dispatch) => {
  // TODO
}

export const stackSetPopupVisibleCreateStack = () => (dispatch) => {
  // TODO
}

export const stackSetPopupVisibleEditStack = () => (dispatch) => {
  // TODO
}
