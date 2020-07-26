import {
  STACK_SET_SIDEBAR_VISIBLE,
  STACK_SET_STACK_FOCUSED,
  STACK_SET_POPUP_VISIBLE_OPTIONS_SIDEBAR,
  STACK_SET_POPUP_VISIBLE_OPTIONS_STACK,
  STACK_SET_POPUP_VISIBLE_STACK_CREATE,
  STACK_SET_POPUP_VISIBLE_STACK_EDIT,
  STACK_CLEAR,
} from '../types';

const INITIAL_STATE = {
  sidebarVisible: true,
  stackFocused: null,
  popupVisibleOptionsSidebar: false,
  popupVisibleOptionsStack: false,
  popupVisibleStackCreate: false,
  popupVisibleStackEdit: false,
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

    case STACK_SET_POPUP_VISIBLE_STACK_CREATE:
      return {
        ...state,
        popupVisibleStackCreate: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_STACK_EDIT:
      return {
        ...state,
        popupVisibleStackEdit: action.payload,
      };

    case STACK_CLEAR:
      return state;

    default:
      return state;
  }
};
