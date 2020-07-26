import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BlockItem from './BlockItem';

import { sessionBlockFetchData } from '../../redux/actions/sessionActions';
import { dataBlockCreate } from '../../redux/actions/dataActions';

class BlockList extends Component {
  constructor(props) {
    super(props);

    // these states should go inside of BlockItem.js
    this.state = {
      task: '',
      description: '',
      durationWork: 1500,
      durationBreak: 600,
      numBursts: 3,
      stackId: '',
    };

    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeDurationWork = this.handleChangeDurationWork.bind(this);
    this.handleChangeDurationBreak = this.handleChangeDurationBreak.bind(this);
    this.handleBlockCreate = this.handleBlockCreate.bind(this);
    this.fetchBlocks = this.fetchBlocks.bind(this);
  }

  handleChangeTask(e) {
    this.setState({ task: e.target.value });
  }

  handleChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  handleChangeDurationWork(e) {
    this.setState({ durationWork: e.target.value });
  }

  handleChangeDurationBreak(e) {
    this.setState({ durationBreak: e.target.value });
  }

  handleBlockCreate(e) {
    e.preventDefault();
    this.props.dataBlockCreate({
      ...this.state,
      stackId: this.props.stackFocused,
    });
  }

  fetchBlocks() {
    const { stacks, stackFocused, sessionBlockFetchData } = this.props;
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
    const { stacks, stackFocused } = this.props;

    if (!stacks[stackFocused].loaded) {
      return (<h3>Loading blocks</h3>);
    }
    const blockItems = stacks[stackFocused].order
      .map((blockId) =>
        <BlockItem key={blockId} blockId={blockId} />,
    );

    // this should be another component
    return (
      <div>
        {blockItems}
        <form style={{ margin: 10, border: '1px solid gray', padding: 5 }}
          onSubmit={this.handleBlockCreate}>

          <input
            type="text"
            placeholder="Task"
            value={this.state.task}
            onChange={this.handleChangeTask}
            maxLength="255"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChangeDescription}
            maxLength="255"
          />

          <input
            type="number"
            placeholder="Duration"
            value={this.state.durationWork}
            onChange={this.handleChangeDurationWork}
            maxLength="255"
            required
          />

          <input
            type="number"
            placeholder="Break"
            value={this.state.durationBreak}
            onChange={this.handleChangeDurationBreak}
            maxLength="255"
            required
          />
          <input type="submit" value="Add block" />
        </form>
      </div>
    );
  }
}

BlockList.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  loadingBlocks: PropTypes.bool.isRequired,
  sessionBlockFetchData: PropTypes.func.isRequired,
  dataBlockCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  loadingBlocks: state.session.loadingStacks,
});

const mapDispatchToProps = {
  sessionBlockFetchData,
  dataBlockCreate,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockList);
