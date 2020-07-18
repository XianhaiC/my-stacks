import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  playlistSetMode,
  playlistSetFocusFinished,
  playlistSetFocusRemaining,
  playlistSetFocusCurrent,
  playlistCheckoff,
  playlistEnd,
} from '../../redux/actions/playlistActions';

class PlaylistDock extends Component {
  constructor() {
    super();
    this.state = {
      // holds the id of the timer, use with clearInterval to cancel
      modeTimeRemaining: 0,
      enabledPause: false,
      enabledShuffle: false,
      burstCurrent: 0,
    }

    this.timer = 0;

    this.handleClickShuffle = this.handleClickShuffle.bind(this);
    this.handleClickPause = this.handleClickPause.bind(this);
    this.handleClickRestart = this.handleClickRestart.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.handleClickFinish = this.handleClickFinish.bind(this);

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.playlistStackPop = this.playlistStackPop.bind(this);
    this.playlistStackEmpty = this.playlistStackEmpty.bind(this);
    this.endPlaylist = this.endPlaylist.bind(this);
    this.transitionMode = this.transitionMode.bind(this);
    this.startNextBlock = this.startNextBlock.bind(this);
  }

  // ----- handlers

  handleClickShuffle() {
  }

  handleClickPause() {
  }

  handleClickRestart() {
  }

  handleClickSkip() {
  }

  handleClickFinish() {
  }

  // ----- helpers

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1);
    }
  }

  countDown() {
    const seconds = this.state.modeTimeRemaining - 1;
    this.setState({
      modeTimeRemaining: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      this.timer = 0;
      this.transitionMode();
    }
  }

  playlistStackPop() {
    const {
      focusRemaining,
      playlistSetFocusRemaining,
      playlistSetFocusCurrent,
    } = this.props;

    const nextBlock = focusRemaining[0];
    playlistSetFocusCurrent(nextBlock);
    playlistSetFocusRemaining([...focusRemaining.slice(1)]);

    return nextBlock;
  }

  playlistStackEmpty() {
    return this.props.focusRemaining.length === 0;
  }

  endPlaylist() {
    // TODO redirect back to DISPLAY_STACK
    // for now just display that the stack has finished
  }

  transitionMode() {
    const { focusCurrent, playlistCheckoff } = this.props;
    // TODO
    // currently switches immediately to the next task, or exits if there
    // aren't any left
    playlistCheckoff(focusCurrent, false);
    if (this.playlistStackEmpty()) {
      this.endPlaylist();
      return;
    }
    else {
      this.startNextBlock();
    }
  }

  startNextBlock() {
    const { blocks, focusCurrent, playlistSetMode } = this.props;

    const nextBlock = this.playlistStackPop();
    this.setState({ modeTimeRemaining: blocks[nextBlock].durationWork * 60 });
    this.startTimer();
  }

  // ----- lifecycle methods

  componentDidMount() {
    // set enabled_shuffle to begin_shuffled redux variable,
    // which is set by the handlers for the start session buttons
    this.startNextBlock();
  }

  render() {
    const { blocks, focusCurrent } = this.props;

    if (focusCurrent === null) return (
      <div>
        <p>Session finished</p>
        <button onClick={(() => this.props.playlistEnd()).bind(this)}>Go back</button>
      </div>
    );

    const minutes = Math.floor(this.state.modeTimeRemaining / 60);
    const seconds = this.state.modeTimeRemaining % 60;

    return (
      <div>
        <p>Time: {minutes}m {seconds}s</p>
        <p>Current task: {blocks[focusCurrent].task}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  focusRemaining: state.playlist.focusRemaining,
  focusCurrent: state.playlist.focusCurrent,
})

const mapDispatchToProps = {
  playlistSetMode,
  playlistSetFocusFinished,
  playlistSetFocusRemaining,
  playlistSetFocusCurrent,
  playlistCheckoff,
  playlistEnd,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDock);
