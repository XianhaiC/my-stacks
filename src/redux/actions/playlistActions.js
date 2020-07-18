import {
  SESSION_SET_DISPLAY,
  PLAYLIST_SET_MODE,
  PLAYLIST_SET_FOCUS_INITIAL,
  PLAYLIST_SET_FOCUS_FINISHED,
  PLAYLIST_SET_FOCUS_REMAINING,
  PLAYLIST_SET_FOCUS_CURRENT,
  PLAYLIST_ADD_COMPLETED_BLOCKS,
  PLAYLIST_CLEAR_COMPLETED_BLOCKS,
  PLAYLIST_SET_INITIAL_SHUFFLE,
} from '../types';

import {
  DISPLAY_PLAYLIST,
  DISPLAY_STACK,
  PLAYLIST_MODE_WORK,
} from '../../util/constants';

export const playlistSetMode = (mode) => (dispatch) => {
  dispatch({
    type: PLAYLIST_SET_MODE,
    payload: mode,
  });
};

export const playlistSetFocusInitial = (blockIds) => (dispatch) => {
  dispatch({
    type: PLAYLIST_SET_FOCUS_INITIAL,
    payload: blockIds,
  });
};

export const playlistSetFocusFinished = (blockIds) => (dispatch) => {
  dispatch({
    type: PLAYLIST_SET_FOCUS_FINISHED,
    payload: blockIds,
  });
};

export const playlistSetFocusRemaining = (blockIds) => (dispatch) => {
  dispatch({
    type: PLAYLIST_SET_FOCUS_REMAINING,
    payload: blockIds,
  });
};

export const playlistSetFocusCurrent = (blockId) => (dispatch) => {
  dispatch({
    type: PLAYLIST_SET_FOCUS_CURRENT,
    payload: blockId,
  });
};

export const playlistAddCompletedBlocks = (blockId) => (dispatch) => {
  dispatch({
    type: PLAYLIST_ADD_COMPLETED_BLOCKS,
    payload: blockId,
  });
};

export const playlistClearCompletedBlock = () => (dispatch) => {
  dispatch({
    type: PLAYLIST_CLEAR_COMPLETED_BLOCKS,
  });
};

export const playlistCheckoff = (blockId, done) => (dispatch, getState) => {
  if (done) dispatch(playlistAddCompletedBlocks(blockId));
  const playlistState = getState().playlist;
  const focusFinishedNew = [
    ...playlistState.focusFinished,
    playlistState.focusCurrent,
  ];

  dispatch(playlistSetFocusFinished(focusFinishedNew));
  dispatch(playlistSetFocusCurrent(null));
};

export const playlistStart = (blockIds, shuffle) => (dispatch) => {
  dispatch({
    type: SESSION_SET_DISPLAY,
    payload: DISPLAY_PLAYLIST,
  });
  dispatch(playlistSetMode(PLAYLIST_MODE_WORK));
  dispatch(playlistSetFocusInitial(blockIds));
  dispatch(playlistSetFocusFinished([]));
  dispatch(playlistSetFocusRemaining(blockIds));
  dispatch(playlistSetFocusCurrent(null));
  dispatch({
    type: PLAYLIST_SET_INITIAL_SHUFFLE,
    payload: shuffle,
  });
};

export const playlistEnd = () => (dispatch) => {
  dispatch({
    type: SESSION_SET_DISPLAY,
    payload: DISPLAY_STACK,
  });
  dispatch(playlistSetFocusInitial([]));
  dispatch(playlistSetFocusFinished([]));
  dispatch(playlistSetFocusRemaining([]));
  dispatch(playlistSetFocusCurrent(null));
};
