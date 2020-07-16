import {
  STACK_SET_SIDEBAR_VISIBLE,
  STACK_SET_STACK_FOCUSED,
  STACK_SET_POPUP_VISIBLE_OPTIONS_SIDEBAR,
  STACK_SET_POPUP_VISIBLE_OPTIONS_STACK,
  STACK_SET_POPUP_VISIBLE_CREATE_STACK,
  STACK_SET_POPUP_VISIBLE_EDIT_STACK,
} from '../types'

const INITIAL_STATE = {
  sidebar_visible: true,
  stack_focused: null,
  popup_visible_options_sidebar: false,
  popup_visible_options_stack: false,
  popup_visible_create_stack: false,
  popup_visible_edit_stack: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case STACK_SET_SIDEBAR_VISIBLE:
      return {
        ...state,
        sidebar_visible: action.payload,
      };

    case STACK_SET_STACK_FOCUSED:
      return {
        ...state,
        stack_focused: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_OPTIONS_SIDEBAR:
      return {
        ...state,
        popup_visible_options_sidebar: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_OPTIONS_STACK:
      return {
        ...state,
        popup_visible_options_stack: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_CREATE_STACK:
      return {
        ...state,
        popup_visible_create_stack: action.payload,
      };

    case STACK_SET_POPUP_VISIBLE_EDIT_STACK:
      return {
        ...state,
        popup_visible_edit_stack: action.payload,
      };

    default:
      return state;
  }
}
