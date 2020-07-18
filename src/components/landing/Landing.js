import React from 'react';

import LinkButton from '../../util/LinkButton';

const LandingDisplay = (props) => {
  return (
    <div>
      <LinkButton to='/login'>Login</LinkButton>
      <LinkButton to='/signup'>Signup</LinkButton>
    </div>
  );
};

export default LandingDisplay;
