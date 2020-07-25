import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background: #666666;
  height: 100%;
`;

const Background = (props) => {
  return (
    <StyledContainer>
      { props.children }
    </StyledContainer>
  );
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
