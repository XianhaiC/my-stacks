import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {
  PLAYLIST_ITEM_FINISHED,
  PLAYLIST_ITEM_CURRENT,
  PLAYLIST_ITEM_REMAINING,
} from '../../util/constants';

const StyledCard = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  width: 16em;
  border-radius: 5px;
  background:
  ${props => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return 'none';
        break;
      case PLAYLIST_ITEM_CURRENT:
        return props.theme.primaryLight;
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
        return '83%';
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
        return `0.11rem solid ${props.theme.secondary}`;
        break;
      default:
        return 'none';
        break;
    }
  }};
  transition: all 0.5s ease-in-out;
`

const StyledText = styled.div`
  font-size: 1em;
  font-weight: 600;
  color:
  ${props => {
    switch (props.state) {
      case PLAYLIST_ITEM_FINISHED:
        return props.theme.secondary;
        break;
      case PLAYLIST_ITEM_CURRENT:
        return props.theme.primaryDark;
        break;
      case PLAYLIST_ITEM_REMAINING:
        return props.theme.primaryLight;
        break;
      default:
        return 'none';
        break;
    }
  }};
`

class PlaylistProgressItem extends Component {
  constructor(props) {
    super(props);

    this.state = {click: false}

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
      focusFinished, 
      focusRemaining, 
      focusCurrent, 
    } = this.props;

    let top;
    let background;

    let itemState;

    if (focusFinished.includes(blockId))
      itemState = PLAYLIST_ITEM_FINISHED;
    else if (focusRemaining.includes(blockId))
      itemState = PLAYLIST_ITEM_REMAINING;
    else
      itemState = PLAYLIST_ITEM_CURRENT;

    return (
      <StyledCard state={itemState}>
        <StyledText state={itemState}>
          {blocks[blockId].task}
        </StyledText>
      </StyledCard>
    );
  }
};

PlaylistProgressItem.propTypes = {
  blockId: PropTypes.string.isRequired,
  blocks: PropTypes.object.isRequired,
  focusFinished: PropTypes.array.isRequired,
  focusRemaining: PropTypes.array.isRequired,
  focusCurrent: PropTypes.string,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  focusFinished: state.playlist.focusFinished,
  focusRemaining: state.playlist.focusRemaining,
  focusCurrent: state.playlist.focusCurrent,
});

export default connect(mapStateToProps)(PlaylistProgressItem);
