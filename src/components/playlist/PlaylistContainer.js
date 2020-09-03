import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import PlaylistEnd from './PlaylistEnd';
import PlaylistDock from './PlaylistDock';
import PlaylistProgressList from './PlaylistProgressList';

import {StyledBox, StyledBoxColumn, media} from '../common/styles';

import {
  DISPLAY_STACK,
  PLAYLIST_MODE_WORK,
} from '../../util/constants';

const StyledContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  opacity:
  ${(props) => props.display === DISPLAY_STACK ?
      '0' :
      '1'
};
  visibility:
  ${(props) => props.display === DISPLAY_STACK ?
      'hidden' :
      'visible'
};
  background:
  ${(props) => props.mode === PLAYLIST_MODE_WORK ?
      props.theme.primaryLight :
      props.theme.primaryDark
};
  transition: all 0.4s ease-in-out;

  ${media.m(`
    flex-direction: column;
  `)}
`;

const StyledBoxEnd = styled(StyledBox)`
  align-items: flex-start;

  @media only screen and (max-height: 700px) {
    flex: 0.4;
  }
`;

const PlaylistContainer = (props) => {
  return (
    <StyledContainer display={props.display} mode={props.playlistMode}>
      <StyledBoxEnd>
        <PlaylistEnd />
      </StyledBoxEnd>
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
