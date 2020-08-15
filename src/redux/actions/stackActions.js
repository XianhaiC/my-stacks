import {
  STACK_SET_SIDEBAR_VISIBLE,
  STACK_SET_STACK_FOCUSED,
  STACK_SET_POPUP_VISIBLE_OPTIONS_SIDEBAR,
  STACK_SET_POPUP_VISIBLE_OPTIONS_STACK,
  STACK_SET_POPUP_VISIBLE_STACK_CREATE,
  STACK_SET_POPUP_VISIBLE_STACK_UPDATE,
} from '../types';

export const stackSetSiderbarVisible = (visible) => (dispatch) => {
  dispatch({type: STACK_SET_SIDEBAR_VISIBLE, payload: visible});
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

export const stackSetPopupVisibleStackUpdate = (visible) => (dispatch) => {
  dispatch({type: STACK_SET_POPUP_VISIBLE_STACK_UPDATE, payload: visible});
};
