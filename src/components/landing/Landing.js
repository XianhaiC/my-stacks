import React from 'react';
import styled from 'styled-components';
import {
  StyledDiv,
  StyledTitle,
  StyledArea,
  StyledCaption,
  StyledWrapper,
  StyledImage,
} from '../common/styles';
import LinkButton from '../../util/LinkButton';
import {BUTTON_SOLID, BUTTON_GRAY} from '../../util/constants';

const StyledMessage = styled(StyledCaption)`
  color: black;
  text-align: left;
  font-weight: bold;
  font-size: 1rem;
`;

const StyledDemo = styled(StyledWrapper)`
  padding: 1rem;
  width: 40rem;
  margin: -5rem 0 0 40rem;
`;

const LandingDisplay = (props) => {
  return (
    <StyledArea>
      <StyledDiv>
        <StyledTitle>MyStacks</StyledTitle>
        <StyledDemo>
          <StyledImage src="mystacks_demo.PNG" />
        </StyledDemo>
        <LinkButton to='/login' type={BUTTON_SOLID}>Login</LinkButton>
        <LinkButton to='/signup' type={BUTTON_GRAY}>Signup</LinkButton>
        <StyledMessage>Create a stack</StyledMessage>
        <StyledMessage>Fill it with tasks</StyledMessage>
        <StyledMessage>
          Conquer them one by one with the pomodoro technique
        </StyledMessage>
      </StyledDiv>
    </StyledArea>
  );
};

export default LandingDisplay;
