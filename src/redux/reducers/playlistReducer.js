import {
  PLAYLIST_SET_MODE,
  PLAYLIST_SET_PLAYLIST_STACK,
  PLAYLIST_SET_FOCUS_INITIAL,
  PLAYLIST_SET_FOCUS_FINISHED,
  PLAYLIST_SET_FOCUS_REMAINING,
  PLAYLIST_SET_FOCUS_CURRENT,
  PLAYLIST_ADD_COMPLETED_BLOCKS,
  PLAYLIST_CLEAR_COMPLETED_BLOCKS,
  PLAYLIST_SET_INITIAL_SHUFFLE,
} from '../types'

import { PLAYLIST_MODE_WORK } from '../../util/constants';

const INITIAL_STATE = {
  playlistMode: PLAYLIST_MODE_WORK,
  playlistStack: null,
  focusInitial: [],
  focusFinished: [],
  focusRemaining: [],
  focusCurrent: null,
  completedBlocks: {},
  initialShuffle: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLAYLIST_SET_MODE:
      return {
        ...state,
        playlistMode: action.payload,
      };

    case PLAYLIST_SET_PLAYLIST_STACK:
      return {
        ...state,
        playlistStack: action.payload,
      };

    case PLAYLIST_SET_FOCUS_INITIAL:
      return {
        ...state,
        focusInitial: action.payload,
      };

    case PLAYLIST_SET_FOCUS_FINISHED:
      return {
        ...state,
        focusFinished: action.payload,
      };

    case PLAYLIST_SET_FOCUS_REMAINING:
      return {
        ...state,
        focusRemaining: action.payload,
      };

    case PLAYLIST_SET_FOCUS_CURRENT:
      return {
        ...state,
        focusCurrent: action.payload,
      };

    case PLAYLIST_ADD_COMPLETED_BLOCKS:
      return {
        ...state,
        completedBlocks: { 
          ...state.completed_blocks,
          ...action.payload,
        },
      };

    case PLAYLIST_CLEAR_COMPLETED_BLOCKS:
      return {
        ...state,
        completedBlocks: {},
      };

    case PLAYLIST_SET_INITIAL_SHUFFLE:
      return {
        ...state,
        initialShuffle: action.payload,
      };

    default:
      return state;
  }
}
