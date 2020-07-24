import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {StyledButtonOutline} from '../common/styles';

import {playlistEnd} from '../../redux/actions/playlistActions';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 2em;
`

const PlaylistEnd = (props) => {
  return (
    <StyledContainer>
      <StyledButtonOutline onClick={() => props.playlistEnd()}>End session</StyledButtonOutline>
    </StyledContainer>
  );
};

playlistEnd.propTypes = {
  playlistEnd: PropTypes.func.isRequired,
};

export default connect(null, {playlistEnd})(PlaylistEnd);
