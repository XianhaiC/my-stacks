import {
  PLAYLIST_SET_MODE,
  PLAYLIST_SET_PLAYLIST_STACK,
  PLAYLIST_SET_FOCUS_INITIAL,
  PLAYLIST_SET_FOCUS_FINISHED,
  PLAYLIST_SET_FOCUS_REMAINING,
  PLAYLIST_SET_FOCUS_CURRENT,
  PLAYLIST_ADD_COMPLETED_BLOCKS,
  PLAYLIST_CLEAR_COMPLETED_BLOCKS,
} from '../types'

import { PLAYLIST_MODE_WORK } from '../../util/constants';

const INITIAL_STATE = {
  playlist_mode: PLAYLIST_MODE_WORK,
  playlist_stack: null,
  focus_initial: [],
  focus_finished: [],
  focus_remaining: [],
  focus_current: null,
  completed_blocks: {},
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLAYLIST_SET_MODE:
      return {
        ...state,
        playlist_mode: action.payload,
      };

    case PLAYLIST_SET_PLAYLIST_STACK:
      return {
        ...state,
        playlist_stack: action.payload,
      };

    case PLAYLIST_SET_FOCUS_INITIAL:
      return {
        ...state,
        focus_intial: action.payload,
      };

    case PLAYLIST_SET_FOCUS_FINISHED:
      return {
        ...state,
        focus_finished: action.payload,
      };

    case PLAYLIST_SET_FOCUS_REMAINING:
      return {
        ...state,
        focus_remaining: action.payload,
      };

    case PLAYLIST_SET_FOCUS_CURRENT:
      return {
        ...state,
        focus_current: action.payload,
      };

    case PLAYLIST_ADD_COMPLETED_BLOCKS:
      return {
        ...state,
        completed_blocks: { 
          ...state.completed_blocks,
          ...action.payload,
        },
      };

    case PLAYLIST_CLEAR_COMPLETED_BLOCKS:
      return {
        ...state,
        completed_blocks: {},
      };

    default:
      return state;
  }
}
