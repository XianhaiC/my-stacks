import styled from 'styled-components';

import {BUTTON_SOLID} from '../../util/constants';

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
  border: 0.11rem solid ${(props) => props.theme.secondary};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  min-width: 3rem;
  text-align: center;
  color:
  ${(props) => props.type === BUTTON_SOLID ?
    props.theme.primaryLight :
    props.theme.secondary
};
  background-color:
  ${(props) => props.type === BUTTON_SOLID ?
    props.theme.secondary :
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
  font-family: 'Roboto', sans-serif;
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
  font-family: 'Roboto', sans-serif;
`;

export const StyledCaption = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #AAAAAA;
  font-family: 'Roboto', sans-serif;
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
  font-family: 'Roboto', sans-serif;
`;

export const StyledTitle = styled.div`
  text-align: middle;
  font-size: 3rem;
  color: black;
`;

export const StyledLinkButton = styled.button`
  width: 10rem;
  border-radius: 0.75rem;
  margin: 1rem;
  padding: 1rem;
  border: 1rem;
  font-size: 1rem;
  font-family: Arial, sans-serif;
  background: #4CD2B2;
  color: white;
  &:hover{
    cursor: pointer;
  }
`;
