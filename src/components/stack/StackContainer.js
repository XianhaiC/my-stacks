import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import StackList from './StackList';
import StackDock from './StackDock';

class StackContainer extends Component {
  render() {
    const {
      loadingStacks, loadingBlocks,
      stacks, stackFocused,
    } = this.props;

    if (loadingStacks || loadingBlocks) return (<h3>Loading stacks</h3>);

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

StackContainer.propTypes = {
  stacks: PropTypes.object,
  stackFocused: PropTypes.string,
  loadingStacks: PropTypes.bool.isRequired,
  loadingBlocks: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  loadingStacks: state.session.loadingStacks,
  loadingBlocks: state.session.loadingBlocks,
});

export default connect(mapStateToProps)(StackContainer);
