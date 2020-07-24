import styled from 'styled-components';

export const StyledBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledButtonOutline = styled.button`
  border-radius: 0.3rem;
  border: 0.11rem solid;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  color: ${props => props.theme.secondary};
  background: none;
`
