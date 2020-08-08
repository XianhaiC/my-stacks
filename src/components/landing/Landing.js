import React from 'react';
import {
  StyledDiv,
  StyledTitle,
  StyledArea,
  StyledCircles,
  StyledCircle,
} from '../common/styles';

import LinkButton from '../../util/LinkButton';
import {BUTTON_SOLID, BUTTON_GRAY} from '../../util/constants';

const LandingDisplay = (props) => {
  return (
    <StyledArea>
      <StyledDiv>
        <StyledTitle>MyStacks</StyledTitle>
        <LinkButton to='/login' type={BUTTON_SOLID}>Login</LinkButton>
        <LinkButton to='/signup' type={BUTTON_GRAY}>Signup</LinkButton>
        <StyledCircles>
          <StyledCircle></StyledCircle>
          <StyledCircle></StyledCircle>
          <StyledCircle></StyledCircle>
          <StyledCircle></StyledCircle>
          <StyledCircle></StyledCircle>
        </StyledCircles>
      </StyledDiv>
    </StyledArea>
  );
};

export default LandingDisplay;
