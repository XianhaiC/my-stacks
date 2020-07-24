import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';

import {
  playlistSetMode,
  playlistSetFocusFinished,
  playlistSetFocusRemaining,
  playlistSetFocusCurrent,
  playlistCheckoff,
  playlistEnd,
} from '../../redux/actions/playlistActions';

import {
  PLAYLIST_MODE_WORK,
  PLAYLIST_MODE_BREAK,
  PLAYLIST_MODE_GRACE,
} from '../../util/constants';

import {shuffle} from '../../util/helpers';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledTextLight = styled.div`
  font-size: 1em;
  font-weight: 600;
  color: ${props => props.theme.primaryLight};
`

const StyledTimer = styled.div`
  font-size: 5em;
  color: ${props => props.theme.primaryLight};
`

const StyledContainerButton = styled.div`
  display: flex;
  justify-content: center;
  color: ${props => props.theme.primaryLight};
  padding: 2.5em;
`

class PlaylistDock extends Component {
  constructor() {
    super();
    this.state = {
      // holds the id of the timer, use with clearInterval to cancel
      modeTimeRemaining: 0,
      enabledPause: false,
      enabledShuffle: false,
      burstCurrent: 0,
    };

    this.timer = 0;

    this.handleClickShuffle = this.handleClickShuffle.bind(this);
    this.handleClickPause = this.handleClickPause.bind(this);
    this.handleClickRestart = this.handleClickRestart.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.handleClickFinish = this.handleClickFinish.bind(this);

    this.startTimer = this.startTimer.bind(this);
    this.cancelTimer = this.cancelTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.playlistStackPop = this.playlistStackPop.bind(this);
    this.playlistStackEmpty = this.playlistStackEmpty.bind(this);
    this.endPlaylist = this.endPlaylist.bind(this);
    this.transitionMode = this.transitionMode.bind(this);
    this.setModeTime = this.setModeTime.bind(this);
    this.startNextBlock = this.startNextBlock.bind(this);
  }

  // ----- handlers

  handleClickShuffle() {
    const {
      focusInitial,
      focusFinished,
      focusRemaining,
      playlistSetFocusRemaining
    } = this.props;

    const enabledShuffleNew = !this.state.enabledShuffle;

    let focusRemainingNew;

    if (enabledShuffleNew) {
      focusRemainingNew = [...focusRemaining];
      shuffle(focusRemainingNew);
    }
    else {
      // create the remaning list by taking the initial list minus the 
      // finished list
      focusRemainingNew =
        focusInitial.filter(blockId => !focusFinished.includes(blockId));
    }

    playlistSetFocusRemaining(focusRemainingNew);
  }

  handleClickPause() {
    const enabledPauseNew = !this.state.enabledPause;

    enabledPauseNew ? this.cancelTimer() : this.startTimer();
    this.setState({enabledPause: enabledPauseNew});
  }

  handleClickRestart() {
    const {playlistMode, blocks, stacks, focusCurrent, stackFocused} = this.props;
    this.cancelTimer();
    this.setModeTime(playlistMode);
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

  cancelTimer() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  countDown() {
    const seconds = this.state.modeTimeRemaining - 1;
    this.setState({
      modeTimeRemaining: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      this.cancelTimer();
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
    const {
      blocks,
      stacks,
      playlistMode,
      focusCurrent,
      stackFocused,
      playlistSetMode,
      playlistCheckoff,
      playlistEnd,
    } = this.props;

    let nextMode;
    let newBurstCurrent;

    switch (playlistMode) {

      case PLAYLIST_MODE_WORK:
        newBurstCurrent = this.state.burstCurrent + 1;
        if (newBurstCurrent === blocks[focusCurrent].numBursts)
          nextMode = PLAYLIST_MODE_GRACE 
        else {
          this.setState({burstCurrent: newBurstCurrent});
          nextMode = PLAYLIST_MODE_BREAK;
        }

        this.setModeTime(nextMode);
        this.props.playlistSetMode(nextMode);
        break;

      case PLAYLIST_MODE_BREAK:
        nextMode = PLAYLIST_MODE_WORK;
        this.setModeTime(nextMode);
        this.props.playlistSetMode(nextMode);
        break;

      case PLAYLIST_MODE_GRACE:
        playlistCheckoff(false);
        if (this.playlistStackEmpty()) {
          playlistEnd();
          return;
        }
        this.startNextBlock();
        break;

      default:
        break;
    }
    console.log("NEXT MODE", nextMode);
  }

  // note that this also starts a new timer, so make sure to call
  // cancelTimer() before calling this
  setModeTime(mode) {
    const {blocks, stacks, focusCurrent, stackFocused} = this.props;

    switch (mode) {
      case PLAYLIST_MODE_WORK:
        this.setState({modeTimeRemaining: blocks[focusCurrent].durationWork})
        break;
      case PLAYLIST_MODE_BREAK:
        this.setState({modeTimeRemaining: blocks[focusCurrent].durationBreak})
        break;
      case PLAYLIST_MODE_GRACE:
        this.setState({modeTimeRemaining: stacks[stackFocused].durationGrace})
      default:
        break;
    }
    this.startTimer();
    this.setState({enabledPause: false});
  }

  startNextBlock() {
    const {blocks} = this.props;

    const nextBlock = this.playlistStackPop();
    this.setState({
      modeTimeRemaining: blocks[nextBlock].durationWork,
      burstCurrent: 0,
    });
    this.startTimer();
    this.props.playlistSetMode(PLAYLIST_MODE_WORK);
  }

  // ----- lifecycle methods

  componentDidMount() {
    // set enabled_shuffle to begin_shuffled redux variable,
    // which is set by the handlers for the start session buttons
    this.startNextBlock();
  }

  componentWillUnmount() {
    // disable any remaining timers
    clearInterval(this.timer);
  }

  render() {
    const {blocks, stacks, focusCurrent, playlistMode, stackFocused} = this.props;

    if (focusCurrent === null) {
      return (
        <div>
          <p>Session finished</p>
          <button onClick={(() => this.props.playlistEnd())}>Go back</button>
        </div>
      );
    }

    const minutes = Math.floor(this.state.modeTimeRemaining / 60);
    const seconds = this.state.modeTimeRemaining % 60;

    return (
      <StyledContainer>
        <StyledTextLight>{stacks[stackFocused].name}</StyledTextLight>
        <StyledTimer>{minutes}m {seconds}s</StyledTimer>

        <StyledContainerButton>
          <RefreshRoundedIcon onClick={this.handleClickRestart}>Restart</RefreshRoundedIcon>
          <PauseRoundedIcon onClick={this.handleClickPause}>Pause</PauseRoundedIcon>
          <ShuffleRoundedIcon onClick={this.handleClickShuffle}>Shuffle</ShuffleRoundedIcon>
        </StyledContainerButton>
        {playlistMode !== PLAYLIST_MODE_WORK && <StyledTextLight>Taking a break</StyledTextLight>}
      </StyledContainer>
    );
  }
}

PlaylistDock.propTypes = {
  blocks: PropTypes.object.isRequired,
  stacks: PropTypes.object.isRequired,
  playlistMode: PropTypes.number.isRequired,
  focusRemaining: PropTypes.array.isRequired,
  focusCurrent: PropTypes.string,
  stackFocused: PropTypes.string.isRequired,
  playlistSetMode: PropTypes.func.isRequired,
  playlistSetFocusFinished: PropTypes.func.isRequired,
  playlistSetFocusRemaining: PropTypes.func.isRequired,
  playlistSetFocusCurrent: PropTypes.func.isRequired,
  playlistCheckoff: PropTypes.func.isRequired,
  playlistEnd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  stacks: state.data.stacks,
  playlistMode: state.playlist.playlistMode,
  focusInitial: state.playlist.focusInitial,
  focusRemaining: state.playlist.focusRemaining,
  focusFinished: state.playlist.focusFinished,
  focusCurrent: state.playlist.focusCurrent,
  stackFocused: state.stack.stackFocused,
});

const mapDispatchToProps = {
  playlistSetMode,
  playlistSetFocusFinished,
  playlistSetFocusRemaining,
  playlistSetFocusCurrent,
  playlistCheckoff,
  playlistEnd,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDock);
