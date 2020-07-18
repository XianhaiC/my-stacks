import React, { Component } from 'react';
import { connect } from 'react-redux';

import StackList from './StackList';
import StackDock from './StackDock';

class StackContainer extends Component {
  render() {
    const { stacks, stackFocused } = this.props;

    return (
      <div>
        <h1>{stacks[stackFocused].name}</h1>
        <div>
          <StackList />
          <StackDock />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
})

export default connect(mapStateToProps)(StackContainer);
