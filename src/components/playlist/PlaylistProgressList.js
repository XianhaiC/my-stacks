import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import PlaylistProgressItem from './PlaylistProgressItem';

import {
  playlistCheckoff,
} from '../../redux/actions/playlistActions';

import {
  DISPLAY_PLAYLIST,
  PLAYLIST_MODE_BREAK,
} from '../../util/constants';

const StyledContainer = styled.div`
  margin-left: auto;
  margin-right: 3em;
  position: relative;
  align-self: stretch;
  width: 24rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  filter:
  ${(props) => props.mode === PLAYLIST_MODE_BREAK ? 'blur(4px)' : 'none'};
  transition: all 0.5s ease-in-out;
`;

class PlaylistProgressList extends Component {
  render() {
    const {display, playlistMode, focusInitial} = this.props;

    if (display !== DISPLAY_PLAYLIST)
      return null;

    const blocksList = Object.values(focusInitial).map((blockId) =>
      <PlaylistProgressItem
        blockId={blockId}
        key={blockId} />,
    );

    return (
      <StyledContainer mode={playlistMode}>
        {blocksList}
      </StyledContainer>
    );
  }
}

PlaylistProgressList.propTypes = {
  playlistMode: PropTypes.number.isRequired,
  focusInitial: PropTypes.array.isRequired,
  focusFinished: PropTypes.array.isRequired,
  focusRemaining: PropTypes.array.isRequired,
  focusCurrent: PropTypes.string,
  display: PropTypes.number.isRequired,
  playlistCheckoff: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistMode: state.playlist.playlistMode,
  focusInitial: state.playlist.focusInitial,
  focusFinished: state.playlist.focusFinished,
  focusRemaining: state.playlist.focusRemaining,
  focusCurrent: state.playlist.focusCurrent,
  display: state.session.display,
});

const mapDispatchToProps = {
  playlistCheckoff,
};

export default
connect(mapStateToProps, mapDispatchToProps)(PlaylistProgressList);
