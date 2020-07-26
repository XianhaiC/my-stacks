import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  FOCUS_NONE, FOCUS_HOVER, FOCUS_INFO, FOCUS_EDIT,
} from '../../util/constants';

import {dataBlockUpdate} from '../../redux/actions/dataActions';

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
    if (this.state.numBursts < 10) {
      this.setState({numBursts: this.state.numBursts + 1});
      this.handleBurstsUpdate();
    }
  }

  handleDecrementBursts() {
    if (this.state.numBursts > 1) {
      this.setState({numBursts: this.state.numBursts - 1});
      this.handleBurstsUpdate();
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
        {durationWork: e.target.value},
    );
  }

  handleChangeEditDurationBreak(e) {
    this.setState(
        {durationBreak: e.target.value},
    );
  }

  handleBlockUpdate(e) {
    e.preventDefault();
    this.setState({focusState: FOCUS_INFO});
    this.props.dataBlockUpdate({
      ...this.state,
      stackId: this.props.stackFocused,
      blockId: this.props.blockId,
    });
  }

  handleBurstsUpdate() {
    this.props.dataBlockUpdate({
      numBursts: this.state.numBursts,
      stackId: this.props.stackFocused,
      blockId: this.props.blockId,
    });
  }

  handleSwapBlocks(id, above) {
    const {stacks, stackFocused} = this.props;

    const blockIdsArray = stacks[stackFocused].order;
    const index = blockIdsArray.indexOf(id);
    if (index === 0 && above === true ||
      index === blockIdsArray.length - 1 && above === false) {
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
                {blocks[blockId].task}
              </span>
              <span style={{margin: '5px', float: 'right'}}>
                Burst length: [{blocks[blockId].durationWork}]
              </span>
              <span style={{margin: '5px', float: 'right'}}>
                Break length: [{blocks[blockId].durationBreak}]
              </span>
              <div className="block-item-description" >
                {blocks[blockId].description}
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
                required
              />

              <input
                type="number"
                placeholder="Duration"
                value={this.state.durationWork}
                onChange={this.handleChangeEditDurationWork}
                maxLength="255"
                required
              />

              <input
                type="number"
                placeholder="Break"
                value={this.state.durationBreak}
                onChange={this.handleChangeEditDurationBreak}
                maxLength="255"
                required
              />
              <input
                className="block-item-button"
                type="submit"
                value="Save"
              />
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
  dataBlockUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

const mapDispatchToProps = {
  dataBlockUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockItem);
