import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import PlaylistEnd from './PlaylistEnd';
import PlaylistDock from './PlaylistDock';
import PlaylistProgressList from './PlaylistProgressList';

import {StyledBox, StyledBoxColumn} from '../common/styles';

import {
  PLAYLIST_MODE_WORK,
} from '../../util/constants';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80%;
  width: 100%;
  background:
  ${props => props.mode === PLAYLIST_MODE_WORK
      ? props.theme.primaryLight
      : props.theme.primaryDark
      };
  transition: all 0.5s ease-in-out;
`

const PlaylistContainer = (props) => {
  return (
    <StyledContainer mode={props.playlistMode}>
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

const mapStateToProps = (state) => ({
  playlistMode: state.playlist.playlistMode,
});

export default connect(mapStateToProps)(PlaylistContainer);
