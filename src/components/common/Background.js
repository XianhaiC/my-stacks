import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background: rgb(227,84,84);
  background: linear-gradient(152deg, rgba(227,84,84,1) 0%, rgba(29,100,106,1) 57%, rgba(140,164,216,1) 100%);
  height: 100%;
`;

const Background = (props) => {
  return (
    <StyledContainer>
      {props.children}
    </StyledContainer>
  );
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
