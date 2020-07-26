import {
  STACK_SET_STACK_FOCUSED,
  STACK_SET_POPUP_VISIBLE_OPTIONS_SIDEBAR,
  STACK_SET_POPUP_VISIBLE_OPTIONS_STACK,
  STACK_SET_POPUP_VISIBLE_STACK_CREATE,
  STACK_SET_POPUP_VISIBLE_STACK_EDIT,
} from '../types';

export const stackSetSiderbarVisible = () => (dispatch) => {
  // TODO
};

export const stackSetStackFocused = (stack) => (dispatch) => {
  dispatch({type: STACK_SET_STACK_FOCUSED, payload: stack});
};

export const stackSetPopupVisibleOptionsSidebar = (visible) => (dispatch) => {
  dispatch({type: STACK_SET_POPUP_VISIBLE_OPTIONS_SIDEBAR, payload: visible});
};

export const stackSetPopupVisibleOptionsStack = (visible) => (dispatch) => {
  dispatch({type: STACK_SET_POPUP_VISIBLE_OPTIONS_STACK, payload: visible});
};

export const stackSetPopupVisibleStackCreate = (visible) => (dispatch) => {
  dispatch({type: STACK_SET_POPUP_VISIBLE_STACK_CREATE, payload: visible});
};

export const stackSetPopupVisibleStackEdit = (visible) => (dispatch) => {
  dispatch({type: STACK_SET_POPUP_VISIBLE_STACK_EDIT, payload: visible});
};
