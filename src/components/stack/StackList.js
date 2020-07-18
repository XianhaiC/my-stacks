import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import StackItem from './StackItem';

class StackList extends Component {
  render() {
    const {stacks, stackFocused} = this.props;
    const blockItems = stacks[stackFocused].order
        .map((blockId) =>
          <StackItem key={blockId} blockId={blockId} />,
        );

    return (
      <div>
        { blockItems }
        <button>Add task</button>
      </div>
    );
  }
}

StackList.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

const mapDispatchToProps = {
  // TODO
};

export default connect(mapStateToProps, mapDispatchToProps)(StackList);
