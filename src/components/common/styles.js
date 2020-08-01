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
