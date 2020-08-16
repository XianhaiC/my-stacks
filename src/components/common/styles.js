import styled, {keyframes} from 'styled-components';

import {
  BUTTON_SOLID,
} from '../../util/constants';

export const StyledBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledBoxColumn = styled(StyledBox)`
  flex-direction: column;
`;

export const StyledButton = styled.a`
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 0.3rem;
  border: 0.11rem solid
  ${(props) => props.alt ? props.theme.secondaryAlt : props.theme.secondary};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  min-width: 3rem;
  text-align: center;
  color:
  ${(props) =>
    props.type === BUTTON_SOLID ?
      props.theme.primaryLight :
      (props.alt ? props.theme.secondaryAlt : props.theme.secondary)
};
  background-color:
  ${(props) => props.type === BUTTON_SOLID ?
    (props.alt ? props.theme.secondaryAlt : props.theme.secondary) :
    'none'
};
`;

export const StyledLandingButton = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 0.3rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  width: 8rem;
  text-align: center;
  color: ${(props) => props.type === BUTTON_SOLID ?
    props.theme.primaryLight : props.theme.primaryDark
};
  background-color:
  ${(props) => props.type === BUTTON_SOLID ?
    props.theme.secondary : props.theme.primaryLight
};
`;

// we use an <a> element here instead of <button>
// due to the line-height issues with <button>
export const StyledButtonContainer = styled.a`
  position: relative;
  outline: none;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  color:
  ${(props) => props.light ?
    props.theme.primaryLight :
    props.theme.primaryDark
};
`;

export const StyledPopup = styled.div`
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.primaryLight};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 0.5rem 0;
`;

export const StyledPopupMenu = styled(StyledPopup)`
  position: absolute;
  display: flex;
  transform: none;
  flex-direction: column;
  left: 0;
  top: 0;
  color: ${(props) => props.theme.primaryDark};
`;

export const StyledMenuItem = styled.div`
  padding: 0.5rem 2rem;
  width: 10rem;
  font-weight: 500;

  &:hover {
    background: ${(props) => props.theme.primaryLightDull};
    cursor: pointer;
  }
`;

export const StyledDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 1rem;
`;

/* landing page styled components */
export const StyledPopupContainer = styled.section`
  background: ${(props) => props.theme.primaryLight};
  width: 30rem;
  margin: 22rem 0 0 10rem;
  position: fixed;
  border-radius: 0.75rem;
  box-shadow: 0px 11px 35px 2px ${(props) => props.theme.boxShadow};
  align-items: center;
  text-align: center;
`;

export const StyledButtonWrapper = styled.div`
  text-align: left;
`;

export const StyledInput = styled.input`
  width: 20rem;
  border-radius: 0.75rem;
  padding: 1rem;
  margin: 5%;
  border: 1rem;
  font-size: 1rem;
  background: ${(props) => props.theme.landingInput};
  &:focus {
      outline: none;
  }
`;

export const StyledSubmit = styled.input`
  width: 50%;
  border-radius: 0.75rem;
  margin: 1rem;
  padding: 1rem;
  border: 1rem;
  font-size: 1rem;
  background: ${(props) => props.theme.secondary};
  color: white;
  outline: none;
  &:hover{
    cursor: pointer;
  }
`;

export const StyledForm = styled.form`
  text-align: center;
`;

export const StyledGreeting = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.greetingTitle};
  padding: 1rem;
`;

export const StyledCaption = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.greetingCaption};
`;

export const StyledError = styled.div`
  font-size: 1rem;
  text-align: center;
  color: ${(props) => props.theme.errorMessage};
`;


export const StyledTitle = styled.div`
  text-align: left;
  font-size: 3rem;
  color: ${(props) => props.theme.primaryDark};
  font-weight: bold;
  margin: -1rem;
`;

export const StyledBody = styled.body`
  width: 100%;
  height: 100%;
  position: fixed;
  border-bottom: 15rem solid ${(props) => props.theme.primaryDark};
  margin: -15rem 0 0 0;
`;

export const StyledLandingBackground = styled.div`
  background: ${(props) => props.theme.primaryDark};
  width: 100%;
  height: 20rem;
`;

export const StyledAnimatedStacks = styled.ul`
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
`;

/* landing page animation */
export const StyledWave = keyframes`
  0%{
      border-radius: 0.25rem;
      height: 0rem;
      margin: 0rem;
      opacity: 0.9;
  }
  
  50%{
      border-radius: 0.25rem;
      height: 4rem;
      margin: 0rem;
      opacity: 0.6;
  }

  100%{
      height: 0rem;
      border-radius: 0.25rem;
      margin: 0rem;
      opacity: 0.9;
  }
`;

export const StyledAnimatedStack = styled.li`
  position: absolute;
  list-style: none;
  height: 0;
  background: ${(props) => props.theme.primaryLight};
  animation-delay: 0s;
  animation: ${StyledWave} 7s infinite;
  &:nth-child(1){
    width: 100%;
    bottom: ${(props) => props.offset};
    animation-delay: 1s;
    background: ${(props) => props.theme.secondary};
  }
  &:nth-child(2){
    width: 100%;
    bottom: ${(props) => props.offset};
    animation-delay: 2s;
    background: ${(props) => props.theme.secondaryAlt};
  }
  &:nth-child(3){
    width: 100%;
    bottom: ${(props) => props.offset};
    animation-delay: 3s;
    background: ${(props) => props.theme.primaryLight};
  }
`;
