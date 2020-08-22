import {
  dataStackBlocksDeleteMultiple,
} from './dataActions';

import {
  SESSION_SET_DISPLAY,
  PLAYLIST_SET_MODE,
  PLAYLIST_SET_FOCUS_INITIAL,
  PLAYLIST_SET_FOCUS_FINISHED,
  PLAYLIST_SET_FOCUS_REMAINING,
  PLAYLIST_SET_FOCUS_CURRENT,
  PLAYLIST_SET_BURST_CURRENT,
  PLAYLIST_ADD_COMPLETED_BLOCKS,
  PLAYLIST_CLEAR_COMPLETED_BLOCKS,
  PLAYLIST_SET_INITIAL_SHUFFLE,
  STACK_SET_SIDEBAR_VISIBLE,
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

export const playlistSetBurstCurrent = (burstCurrent) => (dispatch) => {
  dispatch({
    type: PLAYLIST_SET_BURST_CURRENT,
    payload: burstCurrent,
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

export const playlistCheckoff = (done) => (dispatch, getState) => {
  const playlistState = getState().playlist;

  // the focused block has already been checked off
  if (playlistState.focusCurrent === null) return;

  if (done) dispatch(playlistAddCompletedBlocks(playlistState.focusCurrent));
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
  dispatch({
    type: STACK_SET_SIDEBAR_VISIBLE,
    payload: false,
  });
  dispatch(playlistSetMode(PLAYLIST_MODE_WORK));
  dispatch(playlistSetFocusInitial(blockIds));
  dispatch(playlistSetFocusFinished([]));
  dispatch(playlistSetFocusRemaining(blockIds));
  dispatch(playlistSetFocusCurrent(null));
  dispatch(playlistSetBurstCurrent(0));
  dispatch(playlistClearCompletedBlock());
  dispatch({
    type: PLAYLIST_SET_INITIAL_SHUFFLE,
    payload: shuffle,
  });
};

export const playlistEnd = () => (dispatch, getState) => {
  dispatch({
    type: SESSION_SET_DISPLAY,
    payload: DISPLAY_STACK,
  });

  let playlistState = getState().playlist;
  let stackState = getState().stack;
  let dataState = getState().data;

  let stackFocused = stackState.stackFocused;
  let isRoutine = dataState.stacks[stackState.stackFocused].isRoutine;

  if (isRoutine) return;

  // delete completed blocks if it's not a routine 
  let completedBlocks = playlistState.completedBlocks;

  dispatch(dataStackBlocksDeleteMultiple(
    stackFocused,
    Object.keys(completedBlocks),
  ));
};
