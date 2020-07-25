import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  FOCUS_NONE, FOCUS_HOVER, FOCUS_INFO, FOCUS_EDIT,
} from '../../util/constants';

class BlockItem extends Component {
  constructor() {
    super();

    // rename task => block
    this.state = {
      editTask: 'Title',
      editDescription: 'A basic description should go here.',
      editDurationWork: 1500,
      editDurationBreak: 600,
      numBursts: 3,
      stackId: '',
      hover: false,
      modTitle: null, // title of the task block
      modDescription: null, // description of the task block
      modDurationWork: null, // time length in seconds of burst
      modDurationBreak: null, // time length in seconds of break
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
    this.handleClickSaveChanges = this.handleClickSaveChanges.bind(this);
    this.handleSwapBlocks = this.handleSwapBlocks.bind(this);

    this.handleChangeEditTask = this.handleChangeTask.bind(this);
    this.handleChangeEditDescription = this.handleChangeDescription.bind(this);
    this.handleChangeDurationEditWork =
      this.handleChangeDurationWork.bind(this);
    this.handleChangeDurationEditBreak =
      this.handleChangeDurationBreak.bind(this);
  }

  // onMassEnter and onMassLeave
  // onhover, check what state it's in, based on that change the local state

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
    this.setState({focusState: FOCUS_EDIT});
  }

  handleCloseInfo() {
    this.setState({focusState: FOCUS_NONE});
  }

  handleIncrementBursts() {
    if (this.state.numBursts < 10) {
      this.setState({numBursts: this.state.numBursts + 1});
    }
  }

  handleDecrementBursts() {
    if (this.state.numBursts > 1) {
      this.setState({numBursts: this.state.numBursts - 1});
    }
  }

  /* need to do a PATCH request to firebase and also update the store */
  handleClickSaveChanges() {
    // TODO, meet with Xianhai to discuss this
    this.setState({focusState: FOCUS_INFO});
  }

  /* Input boxes change handlers */
  handleChangeTask(e) {
    this.setState({editTask: e.target.value, modTitle: e.target.value});
  }

  handleChangeDescription(e) {
    this.setState(
        {editDescription: e.target.value, modDescription: e.target.value},
    );
  }

  handleChangeDurationWork(e) {
    this.setState(
        {editDurationWork: e.target.value, modDurationWork: e.target.value},
    );
  }

  handleChangeDurationBreak(e) {
    this.setState(
        {editDurationBreak: e.target.value, modDurationBreak: e.target.value},
    );
  }

  handleSwapBlocks(id, above) {
    const {stacks, stackFocused} = this.props;

    const blockIdsArray = stacks[stackFocused].order;
    const index = blockIdsArray.indexOf(id);
    if (index === 0 && above === true ||
      index === blockIdsArray.length - 1 && above === false) {
      console.log('returned for ' + id);
      return;
    }
    if (above) {
      const temp = blockIdsArray[index];
      blockIdsArray[index] = blockIdsArray[index - 1];
      blockIdsArray[index - 1] = temp;
    } else {
      const temp = blockIdsArray[index];
      blockIdsArray[index] = blockIdsArray[index + 1];
      blockIdsArray[index + 1] = temp;
    }
    stacks[stackFocused].order = blockIdsArray;
  }

  // Finite state machine
  render() {
    const {blocks, blockId} = this.props;
    let blockItem;

    switch (this.state.focusState) {
      case FOCUS_NONE:
        blockItem = (
          <center>
            <div className="block-item-div-or-form"
              onMouseEnter={this.handleMouseEnterBlock}>
              <h3 className="burst">{this.state.numBursts}</h3>
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
              <h3 className="burst">{this.state.numBursts}</h3>
              {blocks[blockId].task}

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={this.handleClickEye}>
                👁
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={this.handleIncrementBursts}>
                +
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={this.handleDecrementBursts}>
                -
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={() => this.handleSwapBlocks(blockId, true)}>
                ⇧
              </button>

              <button
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
                className="block-item-button"
                onClick={() => this.handleSwapBlocks(blockId, false)}>
                ⇩
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
                {this.state.editTask}
              </span>
              <span style={{margin: '5px', float: 'right'}}>
                Burst length: [{this.state.editDurationWork}]
              </span>
              <span style={{margin: '5px', float: 'right'}}>
                Break length: [{this.state.editDurationBreak}]
              </span>
              <div className="block-item-description" >
                {this.state.editDescription}
              </div>
              <button
                className="block-item-button"
                style={{float: 'none'}}
                onClick={this.handleClickEdit}>
                Edit
              </button>
              <button
                className="block-item-button"
                style={{float: 'none'}}
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
              onSubmit={this.handleBlockCreate}>

              <input
                type="text"
                placeholder="Task"
                value={this.state.editTask}
                onChange={this.handleChangeTask}
                maxLength="255"
                required
              />

              <input
                type="text"
                placeholder="Description"
                value={this.state.editDescription}
                onChange={this.handleChangeDescription}
                maxLength="255"
                required
              />

              <input
                type="number"
                placeholder="Duration"
                value={this.state.editDurationWork}
                onChange={this.handleChangeDurationWork}
                maxLength="255"
                required
              />

              <input
                type="number"
                placeholder="Break"
                value={this.state.editDurationBreak}
                onChange={this.handleChangeDurationBreak}
                maxLength="255"
                required
              />
              <button
                className="block-item-button"
                onClick={this.handleClickSaveChanges}>
                Save
              </button>
              <button
                className="block-item-button"
                onClick={this.handleClickCancel}>
                Cancel
              </button>
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
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

export default connect(mapStateToProps)(BlockItem);
