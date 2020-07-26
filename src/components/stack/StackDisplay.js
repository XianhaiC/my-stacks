import React from 'react';
import styled from 'styled-components';

import Background from '../common/Background';
import Sidebar from './Sidebar';
import StackContainer from './StackContainer';
import PopupStackCreate from './PopupStackCreate';

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
`;

const StackDisplay = (props) => {
  return (
    <Background>
      <StyledContainer>
        <Sidebar />
        <StackContainer />
        <PopupStackCreate />
      </StyledContainer>
    </Background>
  );
};

export default StackDisplay;
