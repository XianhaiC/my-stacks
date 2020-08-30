import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled, {withTheme} from 'styled-components';

import {
  StyledDot,
} from '../common/styles';

import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {playlistCheckoff} from '../../redux/actions/playlistActions';

import {
  DISPLAY_PLAYLIST,
  PLAYLIST_MODE_WORK,
  PLAYLIST_MODE_GRACE,
  PLAYLIST_ITEM_FINISHED,
  PLAYLIST_ITEM_CURRENT,
  PLAYLIST_ITEM_REMAINING,
} from '../../util/constants';

const StyledCard = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  width: 20rem;
  border-radius: 5px;
  right: 1rem;

  box-shadow: 
  ${(props) => props.state === PLAYLIST_ITEM_FINISHED ?
      'none' :
      '0px 0px 20px rgba(0, 0, 0, 0.25)'
};

  background:
  ${(props) => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return 'none';
      case PLAYLIST_ITEM_CURRENT:
        return props.mode !== PLAYLIST_MODE_GRACE ?
          props.theme.primaryDark :
          props.theme.primaryLight;
      case PLAYLIST_ITEM_REMAINING:
        return props.theme.midtone;
      default:
        return 'none';
    }
  }};

  top:
  ${(props) => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return `${5 - 9 * props.index}rem`;
      case PLAYLIST_ITEM_CURRENT:
        return 'calc(100% - 12rem)';
      case PLAYLIST_ITEM_REMAINING:
        return `calc(100% - 3rem + ${9 * props.index}rem)`;
      default:
        return '0%';
    }
  }};

  border:
  ${(props) => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return `0.11rem solid ${props.done ?
            props.theme.secondary :
            props.theme.secondaryAlt}`;
      default:
        return 'none';
    }
  }};
  transition: all 0.5s ease-in-out;

  @media only screen and (max-width: 1200px) {
    top:
    ${(props) => {
      switch (props.state) {
        case PLAYLIST_ITEM_FINISHED:
          return `${-20 - 9 * props.index}rem`;
        case PLAYLIST_ITEM_CURRENT:
          return 'calc(100% - 12rem)';
        case PLAYLIST_ITEM_REMAINING:
          return `calc(100% - 3rem + ${9 * props.index}rem)`;
        default:
          return '0%';
      }
    }};

    opacity:
    ${(props) => props.state === PLAYLIST_ITEM_FINISHED
        ? '0' : '1'
    };

  }

  @media only screen and (max-height: 700px) {
    top:
    ${(props) => {
      switch (props.state) {
        case PLAYLIST_ITEM_FINISHED:
          return `${-20 - 9 * props.index}rem`;
        case PLAYLIST_ITEM_CURRENT:
          return 'calc(100% - 10rem)';
        case PLAYLIST_ITEM_REMAINING:
          return `calc(100% - 3rem + ${9 * props.index}rem)`;
        default:
          return '0%';
      }
    }};

    height: 6rem;
  }
`;

const StyledText = styled.div`
  font-weight: 600;
  padding: 0 1rem;
  text-align: center;
  overflow: hidden;
  padding-top:
  ${(props) =>
      props.state === PLAYLIST_ITEM_CURRENT &&
      props.mode === PLAYLIST_MODE_GRACE ?
        '0.8rem' :
        '2rem'
};
  font-size:
  ${(props) =>
      props.state === PLAYLIST_ITEM_CURRENT &&
      props.mode === PLAYLIST_MODE_GRACE ?
        '0.8rem' :
        '1rem'
};
  color:
  ${(props) => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return props.done ?
          props.theme.secondary :
          props.theme.secondaryAlt;
      case PLAYLIST_ITEM_CURRENT:
        return props.mode === PLAYLIST_MODE_WORK ?
          props.theme.primaryLight :
          props.theme.primaryDark;
      case PLAYLIST_ITEM_REMAINING:
        return props.theme.primaryLight;
      default:
        return 'none';
    }
  }};
  transition: all 0.5s ease-in-out;
`;

const StyledTextFinished = styled(StyledText)`
  font-size: 1.2rem;
  padding-top: 0;
  display:
  ${(props) =>
      props.state === PLAYLIST_ITEM_CURRENT &&
      props.mode === PLAYLIST_MODE_GRACE ?
        'block' : 'none'
};
`;

const StyledContainerIcon = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
  justify-content: space-around;
  align-items: center;
  display:
  ${(props) =>
      props.state === PLAYLIST_ITEM_FINISHED ||
      (props.state === PLAYLIST_ITEM_CURRENT &&
      props.mode === PLAYLIST_MODE_GRACE) ?
        'block' : 'none'
};
`;

const StyledDotContainer = styled.div`
  height: 2.6rem;
  align-items: center;
  display:
  ${(props) =>
      props.state === PLAYLIST_ITEM_CURRENT &&
      props.mode !== PLAYLIST_MODE_GRACE ?
        'flex' : 'none'
};
`;

const StyledDotBurst = styled(StyledDot)`
  margin: 0.2rem;
  background: ${(props) => props.theme.secondary};
`;

const StyledDotBurstCurrent = styled(StyledDot)`
  margin: 0.2rem;
  background: ${(props) => props.theme.secondaryAlt};
`;

const StyledDotDim = styled(StyledDot)`
  margin: 0.2rem;
  background: ${(props) => props.theme.midtone};
`;

class PlaylistProgressItem extends Component {
  constructor(props) {
    super(props);

    this.state = {click: false};

    this.styleIconDone = {
      padding: '0 1rem',
      color: props.theme.secondary,
    };

    this.styleIconCancel = {
      ...this.styleIconDone,
      color: props.theme.secondaryAlt,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('CLICK');
    this.setState({click: !this.state.click});
  }

  render() {
    const {
      blocks,
      blockId,
      playlistMode,
      focusFinished,
      focusRemaining,
      burstCurrent,
      completedBlocks,
      display,
      playlistCheckoff,
    } = this.props;

    if (display !== DISPLAY_PLAYLIST) {
      return null;
    }

    let itemState;
    let itemIndex;
    let itemDone;

    if ((itemIndex = focusFinished.indexOf(blockId)) !== -1) {
      itemState = PLAYLIST_ITEM_FINISHED;
      itemDone = completedBlocks[blockId];

      // index here is reversed to faciliate the styling login better
      itemIndex = focusFinished.length - 1 - itemIndex;
    } else if ((itemIndex = focusRemaining.indexOf(blockId)) !== -1) {
      itemState = PLAYLIST_ITEM_REMAINING;
    } else {
      itemState = PLAYLIST_ITEM_CURRENT;
    }

    let componentIcons;

    if (itemState === PLAYLIST_ITEM_FINISHED) {
      componentIcons = itemDone ?
        <DoneOutlineOutlinedIcon style={this.styleIconDone} /> :
        <CancelOutlinedIcon style={this.styleIconCancel} />;
    } else {
      componentIcons = (
        <Fragment>
          <CancelOutlinedIcon
            onClick={() => playlistCheckoff(false)}
            style={this.styleIconCancel} />
          <DoneOutlineOutlinedIcon
            onClick={() => playlistCheckoff(true)}
            style={this.styleIconDone} />
        </Fragment>
      );
    }

    const componentDots = [];
    for (let i = 0; i < blocks[blockId].numBursts; i++) {
      let dot;
      if (i < burstCurrent) {
        dot = (<StyledDotBurst key={i} />);
      } else if (i === burstCurrent) {
        dot = (<StyledDotBurstCurrent key={i} />);
      } else {
        dot = (<StyledDotDim key={i} />);
      }

      componentDots.push(dot);
    }

    return (
      <StyledCard
        state={itemState}
        mode={playlistMode}
        done={itemDone}
        index={itemIndex}>

        <StyledText state={itemState} mode={playlistMode} done={itemDone}>
          {blocks[blockId].task}
        </StyledText>
        <StyledTextFinished state={itemState} mode={playlistMode}>
        Finished?
        </StyledTextFinished>
        <StyledContainerIcon state={itemState} mode={playlistMode}>
          {componentIcons}
        </StyledContainerIcon>
        <StyledDotContainer state={itemState} mode={playlistMode}>
          {componentDots}
        </StyledDotContainer>

      </StyledCard>
    );
  }
};

PlaylistProgressItem.propTypes = {
  theme: PropTypes.object.isRequired,
  blockId: PropTypes.string.isRequired,
  blocks: PropTypes.object.isRequired,
  playlistMode: PropTypes.number.isRequired,
  focusFinished: PropTypes.array.isRequired,
  focusRemaining: PropTypes.array.isRequired,
  burstCurrent: PropTypes.number.isRequired,
  completedBlocks: PropTypes.object.isRequired,
  display: PropTypes.number.isRequired,
  playlistCheckoff: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  playlistMode: state.playlist.playlistMode,
  focusFinished: state.playlist.focusFinished,
  focusRemaining: state.playlist.focusRemaining,
  burstCurrent: state.playlist.burstCurrent,
  completedBlocks: state.playlist.completedBlocks,
  display: state.session.display,
});

export default
connect(mapStateToProps, {playlistCheckoff})(withTheme(PlaylistProgressItem));
