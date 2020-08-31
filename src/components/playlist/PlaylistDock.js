import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled, {withTheme} from 'styled-components';

import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';

import {
  StyledButton,
  StyledButtonContainer,
  StyledBox,
  StyledBoxColumn,
  media,
} from '../common/styles';

import {
  playlistSetMode,
  playlistSetFocusFinished,
  playlistSetFocusRemaining,
  playlistSetFocusCurrent,
  playlistSetBurstCurrent,
  playlistCheckoff,
  playlistEnd,
} from '../../redux/actions/playlistActions';

import {
  DISPLAY_STACK,
  DISPLAY_PLAYLIST,
  PLAYLIST_MODE_WORK,
  PLAYLIST_MODE_BREAK,
  PLAYLIST_MODE_GRACE,
} from '../../util/constants';

import {shuffle} from '../../util/helpers';

const StyledText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color:
  ${(props) => props.mode === PLAYLIST_MODE_WORK ?
      props.theme.primaryDark :
      props.theme.primaryLight
};
  transition: all 0.5s ease-in-out;
`;

const StyledTextTimer = styled(StyledText)`
  font-size: 5rem;
`;

const StyledTextBreak = styled(StyledText)`
  position: fixed;
  visibility:
  ${(props) => props.mode === PLAYLIST_MODE_WORK ?
      'hidden' :
      'visible'
};
  opacity:
  ${(props) => props.mode === PLAYLIST_MODE_WORK ?
      '0' :
      '1'
};
  bottom: 9rem;
  left: 50%;
  transform: translateX(-50%);

  ${media.m(`
    bottom: 18rem;
  `)}
`;

const StyledBoxBottom = styled(StyledBoxColumn)`
  display: relative;
  justify-content: flex-end;
  padding-bottom: 8rem;

  ${media.m(`
    padding-bottom: 1.5rem;
  `)}
`;

const StyledContainerButtonControl = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.primaryLight};
`;

const StyledContainerSkip = styled.div`
  display: flex;
  padding: 0 1.5rem;
  visibility:
  ${(props) => props.mode === PLAYLIST_MODE_WORK ?
      'visible' :
      'hidden'
};
  opacity:
  ${(props) => props.mode === PLAYLIST_MODE_WORK ?
      '1' :
      '0'
};
  transition: all 0.5s ease-in-out;
`;

const StyledButtonSkip = styled(StyledButton)`
  margin: 0.5rem;
  min-width: 5rem;
`;

class PlaylistDock extends Component {
  constructor() {
    super();
    this.state = {
      // holds the id of the timer, use with clearInterval to cancel
      modeTimeRemaining: 0,
      enabledPause: false,
      enabledShuffle: false,
      displayPrev: DISPLAY_STACK,
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
      focusCurrent,
      playlistSetFocusRemaining,
    } = this.props;

    const enabledShuffleNew = !this.state.enabledShuffle;

    let focusRemainingNew;

    if (enabledShuffleNew) {
      focusRemainingNew = [...focusRemaining];
      shuffle(focusRemainingNew);
    } else {
      // create the remaning list by taking the initial list minus the
      // finished list
      focusRemainingNew =
        focusInitial.filter((blockId) =>
          !focusFinished.includes(blockId) && blockId !== focusCurrent,
        );
    }

    playlistSetFocusRemaining(focusRemainingNew);
    this.setState({enabledShuffle: enabledShuffleNew});
  }

  handleClickPause() {
    const enabledPauseNew = !this.state.enabledPause;

    enabledPauseNew ? this.cancelTimer() : this.startTimer();
    this.setState({enabledPause: enabledPauseNew});
  }

  handleClickRestart() {
    this.cancelTimer();
    this.setModeTime(this.props.playlistMode);
  }

  handleClickSkip() {
    this.props.playlistCheckoff(false);
    this.startNextBlock();
  }

  handleClickFinish() {
    this.props.playlistCheckoff(true);
    this.startNextBlock();
  }

  // ----- helpers

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
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
    if (seconds === 0) {
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
      stackFocused,
      playlistMode,
      focusCurrent,
      burstCurrent,
      playlistCheckoff,
      playlistSetBurstCurrent,
    } = this.props;

    let nextMode;
    let newBurstCurrent;

    switch (playlistMode) {
      case PLAYLIST_MODE_WORK:
        newBurstCurrent = burstCurrent + 1;
        if (newBurstCurrent === blocks[focusCurrent].numBursts) {
          nextMode = PLAYLIST_MODE_GRACE;
          if (stacks[stackFocused].isRoutine) {
            playlistCheckoff(true);
          }
        } else {
          playlistSetBurstCurrent(newBurstCurrent);
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
        this.startNextBlock();
        break;

      default:
        break;
    }
  }

  // note that this also starts a new timer, so make sure to call
  // cancelTimer() before calling this
  setModeTime(mode) {
    const {blocks, stacks, focusCurrent, stackFocused} = this.props;

    switch (mode) {
      case PLAYLIST_MODE_WORK:
        this.setState({modeTimeRemaining: blocks[focusCurrent].durationWork});
        break;
      case PLAYLIST_MODE_BREAK:
        this.setState({modeTimeRemaining: blocks[focusCurrent].durationBreak});
        break;
      case PLAYLIST_MODE_GRACE:
        this.setState({modeTimeRemaining: stacks[stackFocused].durationGrace});
        break;
      default:
        break;
    }
    this.startTimer();
    this.setState({enabledPause: false});
  }

  startNextBlock() {
    const {
      blocks,
      playlistSetMode,
      playlistSetBurstCurrent,
      playlistEnd,
    } = this.props;

    if (this.playlistStackEmpty()) {
      this.cancelTimer();
      playlistEnd();
      return;
    }

    const nextBlock = this.playlistStackPop();
    this.setState({
      modeTimeRemaining: blocks[nextBlock].durationWork,
    });
    this.startTimer();
    playlistSetBurstCurrent(0);
    playlistSetMode(PLAYLIST_MODE_WORK);
  }

  // ----- lifecycle methods

  componentDidMount() {
    // set enabledShuffle to begin_shuffled redux variable,
    // which is set by the handlers for the start session buttons
    // this.startNextBlock();
  }

  componentDidUpdate() {
    const {display, initialShuffle} = this.props;
    if (display !== this.state.displayPrev) {
      if (display === DISPLAY_PLAYLIST) {
        if (initialShuffle) {
          this.handleClickShuffle();
        }
        this.startNextBlock();
      }

      this.setState({displayPrev: display});
    }
  }

  componentWillUnmount() {
    // disable any remaining timers
    clearInterval(this.timer);
  }

  render() {
    const {
      stacks,
      stackFocused,
      display,
      playlistMode,
      theme,
    } = this.props;

    if (display !== DISPLAY_PLAYLIST) {
      return null;
    }

    const minutes = Math.floor(this.state.modeTimeRemaining / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (this.state.modeTimeRemaining % 60)
        .toString()
        .padStart(2, '0');

    const styleIcon = {
      color: playlistMode === PLAYLIST_MODE_WORK ?
      theme.primaryDark :
      theme.primaryLight,
      fontSize: '2rem',
      transition: 'all 0.25s ease-in-out',
    };

    const styleIconShuffle = {
      ...styleIcon,
      color: this.state.enabledShuffle ? theme.secondaryAlt :
      playlistMode === PLAYLIST_MODE_WORK ?
      theme.primaryDark :
      theme.primaryLight,
    };

    return (
      <Fragment>
        <StyledBox />
        <StyledBoxColumn>
          <StyledTextTimer mode={playlistMode}>
            {minutes}:{seconds}
          </StyledTextTimer>

          <StyledContainerButtonControl>
            <StyledButtonContainer
              onClick={this.handleClickRestart}
            >
              <RefreshRoundedIcon style={styleIcon} />
            </StyledButtonContainer>

            <StyledButtonContainer
              onClick={this.handleClickPause}
            >
              {!this.state.enabledPause &&
                <PauseRoundedIcon style={styleIcon} />}
              {this.state.enabledPause &&
                <PlayArrowRoundedIcon style={styleIcon} />}
            </StyledButtonContainer>

            <StyledButtonContainer
              onClick={this.handleClickShuffle}
            >
              <ShuffleRoundedIcon
                style={styleIconShuffle} />
            </StyledButtonContainer>
          </StyledContainerButtonControl>
        </StyledBoxColumn>

        <StyledBoxBottom>
          <StyledTextBreak mode={playlistMode}>Taking a break</StyledTextBreak>
          <StyledContainerSkip mode={playlistMode}>
            {!stacks[stackFocused].isRoutine &&
              <StyledButtonSkip solid={false} onClick={this.handleClickSkip}>
                Skip
              </StyledButtonSkip>
            }
            <StyledButtonSkip solid={false} onClick={this.handleClickFinish}>
              Complete
            </StyledButtonSkip>
          </StyledContainerSkip>
        </StyledBoxBottom>
      </Fragment>
    );
  }
}

PlaylistDock.propTypes = {
  theme: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired,
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string,
  playlistMode: PropTypes.number.isRequired,
  focusInitial: PropTypes.array.isRequired,
  focusRemaining: PropTypes.array.isRequired,
  focusFinished: PropTypes.array.isRequired,
  focusCurrent: PropTypes.string,
  burstCurrent: PropTypes.number.isRequired,
  initialShuffle: PropTypes.bool.isRequired,
  display: PropTypes.number.isRequired,
  playlistSetMode: PropTypes.func.isRequired,
  playlistSetFocusFinished: PropTypes.func.isRequired,
  playlistSetFocusRemaining: PropTypes.func.isRequired,
  playlistSetFocusCurrent: PropTypes.func.isRequired,
  playlistSetBurstCurrent: PropTypes.func.isRequired,
  playlistCheckoff: PropTypes.func.isRequired,
  playlistEnd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  playlistMode: state.playlist.playlistMode,
  focusInitial: state.playlist.focusInitial,
  focusRemaining: state.playlist.focusRemaining,
  focusFinished: state.playlist.focusFinished,
  focusCurrent: state.playlist.focusCurrent,
  burstCurrent: state.playlist.burstCurrent,
  initialShuffle: state.playlist.initialShuffle,
  display: state.session.display,
});

const mapDispatchToProps = {
  playlistSetMode,
  playlistSetFocusFinished,
  playlistSetFocusRemaining,
  playlistSetFocusCurrent,
  playlistSetBurstCurrent,
  playlistCheckoff,
  playlistEnd,
};

export default
connect(mapStateToProps, mapDispatchToProps)(withTheme(PlaylistDock));
