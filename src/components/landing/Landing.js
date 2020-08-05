import React from 'react';
import {StyledDiv, StyledTitle} from '../common/styles';

import LinkButton from '../../util/LinkButton';

const LandingDisplay = (props) => {
  return (
    <StyledDiv>
      <StyledTitle>MyStacks</StyledTitle>
      <LinkButton to='/login'>Login</LinkButton>
      <LinkButton to='/signup'>Signup</LinkButton>
    </StyledDiv>
  );
};

export default LandingDisplay;
