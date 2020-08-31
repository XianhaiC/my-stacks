import React, {Component} from 'react';
import styled from 'styled-components';

import {
  StyledAnimatedStack,
  StyledDot,
  StyledButton,
  StyledBoxColumn,
  media,
} from '../common/styles';

import {
  WAVE_SPEED_ONE,
  WAVE_SPEED_TWO,
  WAVE_OFFSET_ONE,
  WAVE_OFFSET_TWO,
  LANDING,
  LOGIN,
  SIGNUP,
} from '../../util/constants';

import {theme} from '../../styles/theme.js';

import Login from './Login.js';
import Signup from './Signup.js';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${(props) => props.theme.primaryDark};
`
const StyledCenterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  margin: 8% 0 0 0; 
  text-align: center;
  background: ${(props) => props.theme.primaryLight};

  ${media.m(`
    height: 70%;
  `)}
`;

const StyledContainerMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 0 0 8%;
`;

export const StyledTitle = styled.div`
  text-align: left;
  font-size: 5rem;
  color: ${(props) => props.theme.primaryDark};
  font-weight: 600;
  line-height: 1em;

  ${media.m(`
    font-size: 3rem;
  `)}
`;

const StyledContainerDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const StyledDescription = styled(StyledTitle)`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2em;

  ${media.m(`
    font-size: 1rem;
  `)}
`;

const StyledContainerRow = styled.div`
  display: flex;
  align-items: center;
`
const StyledDotBullet = styled(StyledDot)`
  display: inline;
  background: ${(props) => props.theme.secondaryAlt};
  margin-right: 0.5rem;
  min-width: 0.5rem;
  min-height: 0.5rem;
`;

const StyledButtonLogin = styled(StyledButton)`
  margin-bottom: 1rem;
  min-width: 8rem;
`

const StyledButtonBottom = styled(StyledButton)`
  min-width: 8rem;
  background: ${props => props.theme.primaryLight};
  color: ${props => props.theme.primaryDark};
  border-color: ${props => props.theme.primaryLight};
  margin: 1rem 0 0 8%;
`

const StyledImage = styled.img`
  image-rendering: high-quality;
  width: 70%;
  height: auto;
`;

const StyledDemo = styled.div`
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  align-self: center;
  margin-right: 8rem;
  width: 50%;

  ${media.m(`
    display: none;
  `)}
`;

const StyledBoxColumnAlign = styled(StyledBoxColumn)`
  align-items: flex-start;
  justify-content: flex-end;
`

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
    const {page} = this.state;
    let center;
    let bottomButton;

    switch (page) {
      case LANDING:
        center =
          <StyledContainerMessage>
            <StyledBoxColumnAlign>
              <StyledTitle>my</StyledTitle>
              <StyledTitle>stacks</StyledTitle>

              <StyledContainerDescription>
                <StyledContainerRow>
                  <StyledDotBullet />
                  <StyledDescription>Create a stack</StyledDescription>
                </StyledContainerRow>
                <StyledContainerRow>
                  <StyledDotBullet />
                  <StyledDescription>Fill it with tasks</StyledDescription>
                </StyledContainerRow>
                <StyledContainerRow>
                  <StyledDotBullet />
                  <StyledDescription>Finish with the pomodoro technique</StyledDescription>
                </StyledContainerRow>
              </StyledContainerDescription>
            </StyledBoxColumnAlign>

            <StyledBoxColumnAlign>
              <StyledButtonLogin
                onClick={this.handleClickLogin}
                solid={true}>
                Login
              </StyledButtonLogin>
            </StyledBoxColumnAlign>
          </StyledContainerMessage>;

        bottomButton = 
          <StyledButtonBottom
            onClick={this.handleClickSignup}
            solid={true}>
            Signup
          </StyledButtonBottom>;
        break;
      case LOGIN:
        center = <Login />;
        bottomButton = 
          <StyledButtonBottom
            onClick={this.handleClickSignup}
            solid={true}>
            Signup
          </StyledButtonBottom>;
        break;
      case SIGNUP:
        center = <Signup />;
        bottomButton = 
          <StyledButtonBottom
            onClick={this.handleClickLogin}
            solid={true}>
            Login
          </StyledButtonBottom>
        break;

      default:
        break;
    }

    return (
      <StyledContainer>
        <StyledCenterContainer>
          {center}
          <StyledDemo>
            <StyledImage src="mystacks_demo.PNG" />
          </StyledDemo>
        </StyledCenterContainer>
        {bottomButton}

        <StyledAnimatedStack
          speed={WAVE_SPEED_TWO}
          offset={WAVE_OFFSET_TWO}
          color={theme.secondaryAlt}></StyledAnimatedStack>
        <StyledAnimatedStack
          speed={WAVE_SPEED_ONE}
          offset={WAVE_OFFSET_ONE}
          color={theme.secondary}></StyledAnimatedStack>
      </StyledContainer>
    );
  }
}
export default LandingDisplay;
