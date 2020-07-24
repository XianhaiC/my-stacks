import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import PlaylistProgressItem from './PlaylistProgressItem';

import {
  playlistCheckoff,
} from '../../redux/actions/playlistActions';

import {
  PLAYLIST_MODE_WORK,
  PLAYLIST_MODE_BREAK,
  PLAYLIST_MODE_GRACE,
} from '../../util/constants';

const StyledContainer = styled.div`
  margin-left: auto;
  position: relative;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  width: 300px;
`

class PlaylistProgressList extends Component {

  render() {
    const {blocks, playlistMode, focusInitial} = this.props;

    const blocksList = Object.values(focusInitial).map(blockId =>
      <PlaylistProgressItem 
      blockId={blockId} 
      key={blockId} />,
    );

    return (
      <StyledContainer>
        {blocksList}
      </StyledContainer>
    );
  }
}

PlaylistProgressList.propTypes = {
  blocks: PropTypes.object.isRequired,
  playlistMode: PropTypes.number.isRequired,
  focusInitial: PropTypes.array.isRequired,
  focusFinished: PropTypes.array.isRequired,
  focusRemaining: PropTypes.array.isRequired,
  focusCurrent: PropTypes.string,
  playlistCheckoff: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  playlistMode: state.playlist.playlistMode,
  focusInitial: state.playlist.focusInitial,
  focusFinished: state.playlist.focusFinished,
  focusRemaining: state.playlist.focusRemaining,
  focusCurrent: state.playlist.focusCurrent,
});

const mapDispatchToProps = {
  playlistCheckoff,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistProgressList);
