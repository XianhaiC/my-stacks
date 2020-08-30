import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {StyledButtonContainer} from '../common/styles';
import {playlistEnd} from '../../redux/actions/playlistActions';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;


const PlaylistEnd = (props) => {
  return (
    <StyledContainer>
      <StyledButtonContainer onClick={() => props.playlistEnd()}>
        <CloseRoundedIcon />
      </StyledButtonContainer>
    </StyledContainer>
  );
};

PlaylistEnd.propTypes = {
  playlistEnd: PropTypes.func.isRequired,
};

export default connect(null, {playlistEnd})(PlaylistEnd);
