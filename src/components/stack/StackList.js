import React, { Component } from 'react';
import { connect } from 'react-redux';

import StackItem from './StackItem';

class StackList extends Component {
  render() {
    const { stacks, blocks, stackFocused } = this.props;
    const blockItems = stacks[stackFocused].order
      .map((blockId) =>
        <StackItem key={blockId} blockId={blockId} />
      );

    return (
      <div>
        { blockItems }
        <button>Add task</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  blocks: state.data.blocks,
  stackFocused: state.stack.stackFocused,
})

const mapDispatchToProps = {
  // TODO
}

export default connect(mapStateToProps, mapDispatchToProps)(StackList);
