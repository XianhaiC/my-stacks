import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import StackItem from './StackItem';

import {sessionBlockFetchData} from '../../redux/actions/sessionActions';

class StackList extends Component {
  constructor(props) {
    super(props);
    this.fetchBlocks = this.fetchBlocks.bind(this);
  }

  fetchBlocks() {
    const {stacks, stackFocused, sessionBlockFetchData} = this.props;
    console.log(' SHOULD GET', stacks[stackFocused].loaded);
    console.log(' ET', stackFocused);
    if (!stacks[stackFocused].loaded) {
      sessionBlockFetchData(stackFocused);
    }
  }

  componentDidMount() {
    this.fetchBlocks();
  }

  componentDidUpdate() {
    this.fetchBlocks();
  }

  render() {
    const {loadingBlocks, stacks, stackFocused} = this.props;

    if (!stacks[stackFocused].loaded) {
      return (<h3>Loading blocks</h3>);
    }

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
  loadingBlocks: PropTypes.bool.isRequired,
  sessionBlockFetchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  loadingBlocks: state.session.loadingStacks,
});

const mapDispatchToProps = {
  sessionBlockFetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackList);
