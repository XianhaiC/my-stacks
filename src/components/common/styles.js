import styled, {keyframes} from 'styled-components';

import {
  BUTTON_SOLID,
} from '../../util/constants';

export const StyledBox = styled.div`
  flex: 1;
  display: flex;
  position: relative;
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
  ${(props) => props.solid ?
      props.theme.primaryLight :
      (props.alt ? props.theme.secondaryAlt : props.theme.secondary)
};
  background-color:
  ${(props) => props.solid ?
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

export const StyledPopupEntry = styled.div`
  background: ${(props) => props.theme.primaryLight};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 0.5rem 0;
  margin: 0 8% 0 8%;
  width: 25rem;
  height: min-content;
  align-self: center;
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

// catches inputs for disabled elements
// looking at you firefox
export const StyledClickCatcher = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

/* landing page styled components */
export const StyledPopupContainer = styled.section`
  background: ${(props) => props.theme.primaryLight};
  width: 30rem;
  margin: 22rem 0 0 10rem;
  position: fixed;
  border-radius: 0.5rem;
  box-shadow: 0px 11px 35px 2px ${(props) => props.theme.boxShadow};
  align-items: center;
  text-align: center;
`;

export const StyledButtonWrapper = styled.div`
  text-align: left;
`;

export const StyledTitle = styled(StyledMenuItem)`
  padding: 1rem 2rem 0.5rem 2rem;
  width: auto;
  &:hover {
    background: none;
    cursor: default;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledInput = styled.input`
  background-color: ${(props) => props.theme.primaryLightDull};
  box-sizing: border-box;
  border: 0;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  padding: 0.8rem 2rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.midtone};
`;

export const StyledButtonSubmit = styled(StyledButton)`
  align-self: center;
  justify-self: flex-end;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

export const StyledSubmitHidden = styled.input`
  display: none;
`

export const StyledError = styled.div`
  font-size: 1rem;
  text-align: left;
  padding: 0.5rem 2rem;
  color: ${(props) => props.theme.errorMessage};
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

/*
 * Media styles
 */

export const media = {
  xs: (styles) => `
    @media only screen and (max-width: 480px) {
      ${styles}
    }
  `,
  m: (styles) => `
    @media only screen and (max-width: 1200px) {
      ${styles}
    }
  `
};
