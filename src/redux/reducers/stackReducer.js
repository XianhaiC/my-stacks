import {
  STACK_SET_SIDEBAR_VISIBLE,
  STACK_SET_STACK_FOCUSED,
  STACK_SET_POPUP_VISIBLE_OPTIONS_SIDEBAR,
  STACK_SET_POPUP_VISIBLE_OPTIONS_STACK,
  STACK_SET_POPUP_VISIBLE_CREATE_STACK,
  STACK_SET_POPUP_VISIBLE_EDIT_STACK,
} from '../types';

const INITIAL_STATE = {
  sidebarVisible: true,
  stackFocused: null,
  popupVisibleOptionsSidebar: false,
  popupVisibleOptionsStack: false,
  popupVisibleCreateStack: false,
  popupVisibleEditStack: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STACK_SET_SIDEBAR_VISIBLE:
      return {
        ...state,
        sidebarVisible: action.payload,
      };

    case STACK_SET_STACK_FOCUSED:
      return {
        ...state,
        stackFocused: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_OPTIONS_SIDEBAR:
      return {
        ...state,
        popupVisibleOptionsSidebar: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_OPTIONS_STACK:
      return {
        ...state,
        popupVisibleOptionsStack: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_CREATE_STACK:
      return {
        ...state,
        popupVisibleCreateStack: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_EDIT_STACK:
      return {
        ...state,
        popupVisibleEditStack: action.payload,
      };

    default:
      return state;
  }
};
