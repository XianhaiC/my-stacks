import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled, {withTheme} from 'styled-components';

import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {playlistCheckoff} from '../../redux/actions/playlistActions';

import {
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
  right: 2rem;

  box-shadow: 
  ${props => props.state === PLAYLIST_ITEM_FINISHED
      ? 'none'
      : '0px 0px 20px rgba(0, 0, 0, 0.25)'
      };

  background:
  ${props => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return 'none';
        break;
      case PLAYLIST_ITEM_CURRENT:
        return props.mode === PLAYLIST_MODE_WORK
          ? props.theme.primaryDark
          : props.theme.primaryLight;
        break;
      case PLAYLIST_ITEM_REMAINING:
        return props.theme.midtone;
        break;
      default:
        return 'none';
        break;
    }
  }};

  top:
  ${props => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return '5%';
        break;
      case PLAYLIST_ITEM_CURRENT:
        return 'calc(100% - 12em)';
        break;
      case PLAYLIST_ITEM_REMAINING:
        return 'calc(100% - 3em)';
        break;
      default:
        return '0%';
        break;
    }
  }};

  border:
  ${props => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return `0.11rem solid ${props.done
            ? props.theme.secondary
            : props.theme.secondaryAlt}`;
        break;
      default:
        return 'none';
        break;
    }
  }};
  transition: all 0.5s ease-in-out;
`;

const StyledText = styled.div`
  font-weight: 600;
  padding-top:
  ${props =>
      props.state === PLAYLIST_ITEM_CURRENT
      && props.mode === PLAYLIST_MODE_GRACE 
      ? '0.8rem'
        : '2rem'
      };
  font-size:
  ${props =>
      props.state === PLAYLIST_ITEM_CURRENT
      && props.mode === PLAYLIST_MODE_GRACE 
      ? '0.8rem'
        : '1rem'
      };
  color:
  ${props => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return props.done
            ? props.theme.secondary
            : props.theme.secondaryAlt;
      case PLAYLIST_ITEM_CURRENT:
        return props.mode === PLAYLIST_MODE_WORK
          ? props.theme.primaryLight
          : props.theme.primaryDark;
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
  ${props =>
      props.state === PLAYLIST_ITEM_CURRENT
      && props.mode === PLAYLIST_MODE_GRACE 
      ? 'block' : 'none'
      };
`;

const StyledContainerIcon = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
  justify-content: space-around;
  align-items: center;
  display:
  ${props =>
      props.state === PLAYLIST_ITEM_FINISHED
      || props.state === PLAYLIST_ITEM_CURRENT
      && props.mode === PLAYLIST_MODE_GRACE
      ? 'block' : 'none'
      };
`;


class PlaylistProgressItem extends Component {
  constructor(props) {
    super(props);

    this.state = {click: false}

    this.styleIconDone = {
      padding: '0 1rem',
      color: props.theme.secondary,
    }

    this.styleIconCancel = {
      ...this.styleIconDone,
      color: props.theme.secondaryAlt,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("CLICK");
    this.setState({click: !this.state.click});
  }

  render() {
    const {
      blocks,
      blockId, 
      playlistMode,
      focusFinished, 
      focusRemaining, 
      focusCurrent, 
      completedBlocks,
      playlistCheckoff,
    } = this.props;

    let itemState;
    let itemIndex;
    let itemDone;

    if ((itemIndex = focusFinished.indexOf(blockId)) !== -1) {
      itemState = PLAYLIST_ITEM_FINISHED;
      itemDone = completedBlocks[blockId];
    }
    else if ((itemIndex = focusRemaining.indexOf(blockId)) !== -1)
      itemState = PLAYLIST_ITEM_REMAINING;
    else
      itemState = PLAYLIST_ITEM_CURRENT;

    let componentIcons;

    if (itemState === PLAYLIST_ITEM_FINISHED)
      componentIcons = itemDone
      ? <DoneOutlineOutlinedIcon style={this.styleIconDone} />
      : <CancelOutlinedIcon style={this.styleIconCancel} />;
    else
      componentIcons = (
        <Fragment>
          <CancelOutlinedIcon onClick={() => playlistCheckoff(false)} style={this.styleIconCancel} />
          <DoneOutlineOutlinedIcon onClick={() => playlistCheckoff(true)} style={this.styleIconDone} />
        </Fragment>
      )

    return (
      <StyledCard state={itemState} mode={playlistMode} done={itemDone}>
        <StyledText state={itemState} mode={playlistMode} done={itemDone}>
          {blocks[blockId].task}
        </StyledText>
        <StyledTextFinished state={itemState} mode={playlistMode}>
          Finished?
        </StyledTextFinished>
        <StyledContainerIcon state={itemState} mode={playlistMode}>
          {componentIcons}
        </StyledContainerIcon>
      </StyledCard>
    );
  }
};

PlaylistProgressItem.propTypes = {
  blockId: PropTypes.string.isRequired,
  blocks: PropTypes.object.isRequired,
  playlistMode: PropTypes.number.isRequired,
  focusFinished: PropTypes.array.isRequired,
  focusRemaining: PropTypes.array.isRequired,
  focusCurrent: PropTypes.string,
  completedBlocks: PropTypes.object.isRequired,
  playlistCheckoff: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  playlistMode: state.playlist.playlistMode,
  focusFinished: state.playlist.focusFinished,
  focusRemaining: state.playlist.focusRemaining,
  focusCurrent: state.playlist.focusCurrent,
  completedBlocks: state.playlist.completedBlocks,
});

export default connect(mapStateToProps, {playlistCheckoff})(withTheme(PlaylistProgressItem));
