import React, { Component } from 'react';
import { connect } from 'react-redux';

class StackContainer extends Component {
  render() {
    const { stacks, blocks, stack_focused } = this.props;
    console.log("CONT", stacks, blocks, stack_focused)
    const blockItems = stacks[stack_focused].order
      .map((blockId) =>
      <p key={blockId}>{blocks[blockId].task}</p>
    );

    return (
      <div>
        { blockItems }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  blocks: state.data.blocks,
  stack_focused: state.stack.stack_focused,
})

const mapDispatchToProps = {
  // TODO
}

export default connect(mapStateToProps, mapDispatchToProps)(StackContainer);
