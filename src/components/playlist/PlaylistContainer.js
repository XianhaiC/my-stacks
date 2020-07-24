import React from 'react';
import styled from 'styled-components';

import PlaylistEnd from './PlaylistEnd';
import PlaylistDock from './PlaylistDock';
import PlaylistProgressList from './PlaylistProgressList';

import {StyledBox} from '../common/styles';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80%;
  width: 100%;
  background: ${props => props.theme.primaryDark};
`

const PlaylistContainer = (props) => {
  return (
    <StyledContainer>
      <StyledBox>
        <PlaylistEnd />
      </StyledBox>
      <StyledBox>
        <PlaylistDock />
      </StyledBox>
      <StyledBox>
        <PlaylistProgressList />
      </StyledBox>
    </StyledContainer>
  );
};

export default PlaylistContainer;
