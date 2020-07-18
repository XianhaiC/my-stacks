import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import StackList from './StackList';
import StackDock from './StackDock';

class StackContainer extends Component {
  render() {
    const {stacks, stackFocused} = this.props;

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
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

export default connect(mapStateToProps)(StackContainer);
