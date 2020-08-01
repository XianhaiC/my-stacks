import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  FOCUS_NONE, FOCUS_HOVER, FOCUS_INFO, FOCUS_EDIT,
} from '../../util/constants';


import {dataBlockUpdate, dataStackUpdate, dataBlockDelete}
  from '../../redux/actions/dataActions';

class BlockItem extends Component {
  constructor() {
    super();

    this.state = {
      task: 'Title',
      description: 'A basic description should go here.',
      durationWork: 1500,
      durationBreak: 600,
      numBursts: 3,
      stackId: '',
      hover: false,
      focusState: FOCUS_NONE,
    };

    this.handleMouseEnterBlock = this.handleMouseEnterBlock.bind(this);
    this.handleMouseLeaveBlock = this.handleMouseLeaveBlock.bind(this);
    this.handleClickEye = this.handleClickEye.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleCloseInfo = this.handleCloseInfo.bind(this);
    this.handleIncrementBursts = this.handleIncrementBursts.bind(this);
    this.handleDecrementBursts = this.handleDecrementBursts.bind(this);
    this.handleSwapBlocks = this.handleSwapBlocks.bind(this);
    this.handleBlockUpdate = this.handleBlockUpdate.bind(this);
    this.handleBurstsUpdate = this.handleBurstsUpdate.bind(this);
    this.handleOrderUpdate = this.handleOrderUpdate.bind(this);
    this.handleBlockDelete = this.handleBlockDelete.bind(this);

    this.handleChangeEditTask = this.handleChangeEditTask.bind(this);
    this.handleChangeEditDescription =
      this.handleChangeEditDescription.bind(this);
    this.handleChangeEditDurationWork =
      this.handleChangeEditDurationWork.bind(this);
    this.handleChangeEditDurationBreak =
      this.handleChangeEditDurationBreak.bind(this);
  }

  handleMouseEnterBlock() {
    document.body.style.cursor = 'grab';
    this.setState({focusState: FOCUS_HOVER});
  }

  handleMouseLeaveBlock() {
    this.setState({focusState: FOCUS_NONE});
    document.body.style.cursor = ''; // default arrow cursor
  }

  handleClickEye() {
    this.setState({focusState: FOCUS_INFO});
  }

  handleClickCancel(e) {
    e.preventDefault();
    this.setState({focusState: FOCUS_INFO});
  }

  handleClickEdit() {
    const {blocks, blockId} = this.props;
    this.setState(
        {
          focusState: FOCUS_EDIT,
          task: blocks[blockId].task,
          durationWork: blocks[blockId].durationWork,
          durationBreak: blocks[blockId].durationBreak,
          description: blocks[blockId].description,
        });
  }

  handleCloseInfo() {
    this.setState({focusState: FOCUS_NONE});
  }

  handleIncrementBursts() {
    const {blocks, blockId} = this.props;
    if (this.state.numBursts < 10) {
      this.handleBurstsUpdate(blocks[blockId].numBursts + 1);
    }
  }

  handleDecrementBursts() {
    const {blocks, blockId} = this.props;
    if (this.state.numBursts > 1) {
      this.handleBurstsUpdate(blocks[blockId].numBursts - 1);
    }
  }

  /* Input boxes change handlers */
  handleChangeEditTask(e) {
    this.setState({task: e.target.value});
  }

  handleChangeEditDescription(e) {
    this.setState(
        {description: e.target.value},
    );
  }

  handleChangeEditDurationWork(e) {
    this.setState(
        {durationWork: e.target.value * 60},
    );
  }

  handleChangeEditDurationBreak(e) {
    this.setState(
        {durationBreak: e.target.value * 60},
    );
  }

  handleBlockUpdate(e) {
    e.preventDefault();
    this.setState({focusState: FOCUS_INFO});
    const {blocks, blockId} = this.props;
    this.props.dataBlockUpdate({
      ...blocks[blockId],
      task: this.state.task,
      description: this.state.description,
      durationWork: this.state.durationWork,
      durationBreak: this.state.durationBreak,
    }, this.props.blockId);
  }

  handleBurstsUpdate(newBurstsValue) {
    const {blocks, blockId} = this.props;
    this.props.dataBlockUpdate({
      ...blocks[blockId],
      numBursts: newBurstsValue,
    }, this.props.blockId);
    this.setState({numBursts: newBurstsValue});
  }

  handleOrderUpdate(newOrder) {
    const {stacks, stackFocused} = this.props;
    this.props.dataStackUpdate({
      ...stacks[stackFocused],
      order: newOrder,
    }, this.props.stackFocused);
  }

  handleBlockDelete() {
    const {stackFocused} = this.props;
    this.props.dataBlockDelete(this.props.blockId, stackFocused);
  }

  handleSwapBlocks(currIndex, swapIndex) {
    const {stacks, stackFocused} = this.props;

    // deep copy
    const blocksOrderNew = [...stacks[stackFocused].order];

    if (swapIndex < 0 || swapIndex >= blocksOrderNew.length) {
      return;
    }
    const temp = blocksOrderNew[currIndex];
    blocksOrderNew[currIndex] = blocksOrderNew[swapIndex];
    blocksOrderNew[swapIndex] = temp;
    this.handleOrderUpdate(blocksOrderNew);
  }

  // Finite state machine
  render() {
    const {blocks, blockId, stacks, stackFocused} = this.props;
    const blocksOrder = stacks[stackFocused].order;
    const currIndex = blocksOrder.indexOf(blockId);
    let blockItem;

    // when you get response from firebase, update it on firebase,

    switch (this.state.focusState) {
      case FOCUS_NONE:
        blockItem = (
          <center>
            <div className="block-item-div-or-form"
              onMouseEnter={this.handleMouseEnterBlock}>
              <h3 className="burst">{blocks[blockId].numBursts}</h3>
              {blocks[blockId].task}
            </div>
          </center>
        );
        break;

      case FOCUS_HOVER:
        blockItem = (
          <center>
            <div className="block-item-div-or-form"
              onMouseLeave={this.handleMouseLeaveBlock}>
              <h3 className="burst">{blocks[blockId].numBursts}</h3>
              {blocks[blockId].task}

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                style={{float: 'left'}}
                onClick={this.handleBlockDelete}>
                ❌
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={this.handleClickEye}>
                👁️‍🗨️
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={this.handleIncrementBursts}>
                ➕
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={this.handleDecrementBursts}>
                ➖
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={() => this.handleSwapBlocks(currIndex, currIndex - 1)}>
                ☝️
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={() => this.handleSwapBlocks(currIndex, currIndex + 1)}>
                👇
              </button>

            </div>
          </center>
        );
        break;

      // should not be a form, just displaying info about block item
      case FOCUS_INFO: // only shows play or up/down buttons
        blockItem = (
          <center>
            <div className="block-item-div-or-form" >
              <span style={{margin: '5px', fontWeight: 'bold'}}>
                {blocks[blockId].task}
              </span>
              <span style={{margin: '5px', float: 'right'}}>
                <b>{blocks[blockId].durationWork / 60}</b> min burst
              </span>
              <span style={{margin: '5px', float: 'right'}}>
                <b>{blocks[blockId].durationBreak / 60}</b> min break
              </span>
              <div className="block-item-description" >
                {blocks[blockId].description}
              </div>
              <button
                className="block-item-button"
                style={{float: 'none', color: 'black'}}
                onClick={this.handleClickEdit}>
                Edit
              </button>
              <button
                className="block-item-button"
                style={{float: 'none', color: 'black'}}
                onClick={this.handleCloseInfo}>
                Close
              </button>
            </div >
          </center>
        );
        break;

      case FOCUS_EDIT:
        blockItem = (
          <center>
            <form className="block-item-div-or-form"
              onSubmit={this.handleBlockUpdate}>

              <input
                type="text"
                placeholder="Task"
                value={this.state.task}
                onChange={this.handleChangeEditTask}
                maxLength="255"
                required
              />

              <input
                type="text"
                placeholder="Description"
                value={this.state.description}
                onChange={this.handleChangeEditDescription}
                maxLength="255"
              />

              <input
                type="number"
                placeholder="Duration"
                value={this.state.durationWork / 60}
                onChange={this.handleChangeEditDurationWork}
                maxLength="255"
                min="1"
                max="60"
                required
              />

              <input
                type="number"
                placeholder="Break"
                value={this.state.durationBreak / 60}
                onChange={this.handleChangeEditDurationBreak}
                maxLength="255"
                min="1"
                max="60"
                required
              />
              <div>
                <input
                  className="block-item-button"
                  type="submit"
                  value="Save"
                  style={{color: 'black', float: 'right'}}
                />
                <button
                  className="block-item-button"
                  onClick={this.handleClickCancel}
                  style={{color: 'black', float: 'right'}}>
                  Cancel
                </button>
              </div>
            </form>
          </center>
        );
        break;
    }

    return (
      blockItem
    );
  }
}

BlockItem.propTypes = {
  blockId: PropTypes.string.isRequired,
  stacks: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  dataBlockUpdate: PropTypes.func.isRequired,
  dataStackUpdate: PropTypes.func.isRequired,
  dataBlockDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

const mapDispatchToProps = {
  dataBlockUpdate,
  dataStackUpdate,
  dataBlockDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockItem);
