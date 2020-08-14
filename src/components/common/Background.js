import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background: ${(props) => props.background};
  height: 100%;
`;

// background: linear-gradient(152deg, rgba(227,84,84,1) 0%, rgba(29,100,106,1) 57%, rgba(140,164,216,1) 100%);
const Background = (props) => {
  const {stacks, stackFocused} = props;

  return (
    <StyledContainer background={stackFocused !== null ?
        stacks[stackFocused].backgroundColor :
        'white'}
    >
      {props.children}
    </StyledContainer>
  );
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

export default connect(mapStateToProps)(Background);
