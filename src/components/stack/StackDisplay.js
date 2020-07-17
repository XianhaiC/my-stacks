import React from 'react';

import Background from '../common/Background';
import Sidebar from './Sidebar';
import StackContainer from './StackContainer';

const StackDisplay = (props) => {
  return (
    <Background>
      <Sidebar />
      <StackContainer />
    </Background>
  );
}

export default StackDisplay;
