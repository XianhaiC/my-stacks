import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import PlaylistEnd from './PlaylistEnd';
import PlaylistDock from './PlaylistDock';
import PlaylistProgressList from './PlaylistProgressList';

import {StyledBox, StyledBoxColumn} from '../common/styles';

import {
  DISPLAY_STACK,
  PLAYLIST_MODE_WORK,
} from '../../util/constants';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80%;
  width: 100%;
  flex:
  ${props => props.display === DISPLAY_STACK
      ? '0'
      : '1'
      };
  background:
  ${(props) => props.mode === PLAYLIST_MODE_WORK ?
      props.theme.primaryLight :
      props.theme.primaryDark
};
  transition: all 0.5s ease-in-out;
`;

const PlaylistContainer = (props) => {
  if (props.display === DISPLAY_STACK) return null;
  return (
    <StyledContainer display={props.display} mode={props.playlistMode}>
      <StyledBox>
        <PlaylistEnd />
      </StyledBox>
      <StyledBoxColumn>
        <PlaylistDock />
      </StyledBoxColumn>
      <StyledBox>
        <PlaylistProgressList />
      </StyledBox>
    </StyledContainer>
  );
};

PlaylistContainer.propTypes = {
  display: PropTypes.number.isRequired,
  playlistMode: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  display: state.session.display,
  playlistMode: state.playlist.playlistMode,
});

export default connect(mapStateToProps)(PlaylistContainer);
