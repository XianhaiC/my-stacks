import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {
  stackSetStackFocused,
} from '../../redux/actions/stackActions';

import {StyledDot} from '../common/styles';

const StyledItem = styled.button`
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  box-sizing: border-box;
  color: ${(props) => props.theme.primaryDark};

  background-color:
  ${(props) => props.focused ?
      props.theme.primaryLightSelected :
      props.theme.primaryLightDull
};

  border: none;
  border-left:
  ${(props) => props.focused ?
      `0.2rem solid ${props.theme.primaryDark}` :
      'none'
};
`;

const StyledText = styled.div`
  padding: 0.5em 2em;
`;

const StyledRoutineIndicator = styled(StyledDot)`
  margin-right: 1.5rem;
  background-color: ${(props) => props.theme.secondary};
`;

class StackItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('CLICK');
    this.setState({click: !this.state.click});
  }

  render() {
    const {
      stackId,
      loadingStacks,
      stacks,
      stackFocused,
      stackSetStackFocused,
    } = this.props;

    if (loadingStacks) return null;

    console.log('STACK ITEM', stackFocused, stacks);
    return (
      <StyledItem focused={stackId === stackFocused}
        onClick={() => stackSetStackFocused(stackId)}>
        <StyledText>{stacks[stackId].name}</StyledText>
        <StyledRoutineIndicator />
      </StyledItem>
    );
  }
};

StackItem.propTypes = {
  stackId: PropTypes.string.isRequired,
  loadingStacks: PropTypes.bool.isRequired,
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  stackSetStackFocused: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loadingStacks: state.session.loadingStacks,
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

export default
connect(mapStateToProps, {stackSetStackFocused})(StackItem);
