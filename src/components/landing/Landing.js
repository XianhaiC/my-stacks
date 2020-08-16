import React, {Component} from 'react';
import styled from 'styled-components';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import {
  StyledTitle,
  StyledLandingBackground,
  StyledCaption,
  StyledPopupContainer,
  StyledButtonWrapper,
  StyledAnimatedStacks,
  StyledAnimatedStack,
  StyledBody,
} from '../common/styles';
<<<<<<< HEAD
import LinkButton from '../../util/LinkButton';
import { BUTTON_SOLID } from '../../util/constants';
=======

import {
  WAVE_SPEED_ONE,
  WAVE_SPEED_TWO,
  WAVE_SPEED_THREE,
  WAVE_OFFSET_ONE,
  WAVE_OFFSET_TWO,
  WAVE_OFFSET_THREE,
  LANDING,
  LOGIN,
  SIGNUP,
} from '../../util/constants';

import {BUTTON_SOLID, BUTTON_GRAY} from '../../util/constants';
import {theme} from '../../styles/theme.js';

import LinkButton from '../../util/LinkButton';
import Login from './Login.js';
import Signup from './Signup.js';
>>>>>>> Refactor landing page

const StyledCenterContainer = styled.div`
  width: 30rem;
  margin: 24rem 0 0 10rem;
  position: fixed;
  text-align: center;
  font-size: 1rem;
`;

const StyledMessage = styled(StyledCaption)`
  color: black;
  font-weight: light;
  font-size: 1rem;
  margin: -2rem;
`;

const StyledImage = styled.img`
  width: 38rem;
  height: 19.5rem;
  image-rendering: high-quality;
`;

const StyledDemo = styled(StyledPopupContainer)`
  padding: 1rem;
  width: 40rem;
  margin: -8rem 0 0 40rem;
`;

const StyledLoginWrapper = styled(StyledButtonWrapper)`
  margin: 15.25rem 0 0 -2rem;
`;

const StyledSignUpWrapper = styled(StyledButtonWrapper)`
  margin: 1rem 0 0 -2rem;
`;

const StyledBackButton = styled(KeyboardBackspaceIcon)`
  margin: 12.5rem 0 0 5rem;
  fontSize: 3rem;
  cursor: pointer;
`;

class LandingDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: LANDING,
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickSignup = this.handleClickSignup.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleClickLogin() {
    this.setState({page: LOGIN});
  }

  handleClickSignup() {
    this.setState({page: SIGNUP});
  }

  handleClickBack() {
    this.setState({page: LANDING});
  }

  render() {
    let center;
    let backButton;

    switch (this.state.page) {
      case LANDING:
        center =
          <StyledCenterContainer>
            <StyledTitle>my</StyledTitle>
            <StyledTitle>stacks</StyledTitle>
            <StyledDemo>
              <StyledImage src="mystacks_demo.PNG" />
            </StyledDemo>
            <StyledMessage>A playlist for tasks </StyledMessage>
            <StyledLoginWrapper>
              <LinkButton
                type={BUTTON_SOLID}
                onClick={this.handleClickLogin}>Login
              </LinkButton>
            </StyledLoginWrapper>
            <StyledSignUpWrapper>
              <LinkButton
                type={BUTTON_GRAY}
                onClick={this.handleClickSignup}>Sign Up
              </LinkButton>
            </StyledSignUpWrapper>
          </StyledCenterContainer>;
        break;
      case LOGIN:
        center = <Login></Login>;
        backButton = <StyledBackButton onClick={this.handleClickBack} />;
        break;
      case SIGNUP:
        center = <Signup></Signup>;
        backButton = <StyledBackButton onClick={this.handleClickBack} />;
        break;
    }

    return (
      <StyledBody>
        <StyledLandingBackground>
          {center}
          <StyledAnimatedStacks>
            <StyledAnimatedStack
              speed={WAVE_SPEED_ONE}
              offset={WAVE_OFFSET_ONE}
              color={theme.primaryLight}></StyledAnimatedStack>
            <StyledAnimatedStack
              speed={WAVE_SPEED_TWO}
              offset={WAVE_OFFSET_TWO}
              color={theme.secondary}></StyledAnimatedStack>
            <StyledAnimatedStack
              speed={WAVE_SPEED_THREE}
              offset={WAVE_OFFSET_THREE}
              color={theme.secondaryAlt}></StyledAnimatedStack>
          </StyledAnimatedStacks>
        </StyledLandingBackground>
        {backButton}
      </StyledBody>
    );
  }
}
export default LandingDisplay;
