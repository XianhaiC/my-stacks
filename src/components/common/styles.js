import styled from 'styled-components';

import {
  BUTTON_SOLID,
  BUTTON_GRAY,
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
  box-sizing: border-box;
  border-radius: 0.2rem;
  border: 0.11rem solid ${(props) =>
    props.type === BUTTON_GRAY ? 'gray' : props.theme.secondary};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  min-width: 3rem;
  text-align: center;
  color:
  ${(props) =>
    props.type === BUTTON_SOLID ?
      props.theme.primaryLight :
      props.theme.secondary
};
  background-color:
  ${(props) =>
    props.type === BUTTON_SOLID ?
      props.theme.secondary :
      props.type === BUTTON_GRAY ?
        'gray' :
        'none'
};
`;

// we use an <a> element here instead of <button>
// due to the line-height issues with <button>
export const StyledButtonContainer = styled.a`
  outline: none;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
`;

export const StyledPopup = styled.div`
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 20%;
  background: ${(props) => props.theme.primaryLight};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

export const StyledDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 1rem;
`;

/* login page styled components */
export const StyledWrapper = styled.section`
  background-color: #FFFFFF;
  width: 30rem;
  margin: 7rem 0 0 10rem;
  position: fixed;
  border-radius: 0.75rem;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  align-items: center;
  text-align: center;
`;

export const StyledInput = styled.input`
  width: 20rem;
  border-radius: 0.75rem;
  padding: 1rem;
  margin: 5%;
  border: 1rem;
  font-size: 1rem;
  background: #EEEEEE;
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
  background: #4CD2B2;
  color: white;
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
  color: #333333;
  padding: 1rem;
`;

export const StyledCaption = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #AAAAAA;
`;

export const StyledError = styled.div`
  font-size: 1rem;
  text-align: center;
  color: red;
`;

export const StyledDiv = styled.div`
  width: 30rem;
  margin: 7rem 0 0 10rem;
  position: fixed;
  text-align: center;
  font-size: 1rem;
`;

export const StyledTitle = styled.div`
  text-align: middle;
  font-size: 3rem;
  color: white;
  font-weight: bold;
  margin: 3rem;
`;

/* login page background styled components */
export const StyledArea = styled.div`
  background: linear-gradient(152deg, rgba(227,84,84,1) 0%, rgba(29,100,106,1) 57%, rgba(140,164,216,1) 100%);
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);  
  width: 100%;
  height: 100vh;
`;

export const StyledCircles = styled.ul`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledCircle = styled.li`
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation-delay: 0s;
  animation: animate 30s linear infinite;
  &:nth-child(1){
    left: 25rem;
    width: 10rem;
    height: 5rem;
    bottom: -30rem;
    animation-delay: 0s;
  }
  &:nth-child(2){
    left: 26rem;
    width: 10rem;
    height: 5rem;
    bottom: -26rem;
    animation-delay: 0s;
  }
  &:nth-child(3){
    left: 27rem;
    width: 10rem;
    height: 5rem;
    bottom: -22rem;
    animation-delay: 0s;
  }
  &:nth-child(4){
    left: 28rem;
    width: 10rem;
    height: 5rem;
    bottom: -18rem;
    animation-delay: 0s;
  }
  &:nth-child(5){
    left: 29rem;
    width: 10rem;
    height: 5rem;
    bottom: -14rem;
    animation-delay: 0s;
  }
`;
