import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FOCUS_NONE, FOCUS_HOVER, FOCUS_INFO, FOCUS_EDIT
} from '../../util/constants';

class BlockItem extends Component {
  constructor() {
    super();

    //rename task => block
    this.state = {
      task: 'Title',
      description: 'A basic description should go here.',
      durationWork: 1500,
      durationBreak: 600,
      numBursts: 3,
      stackId: '',
      hover: false,
      modTitle: null, //title of the task block
      modDescription: null, //description of the task block
      modDurationWork: null, //time length in seconds of burst
      modDurationBreak: null, //time length in seconds of break
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
    this.handleOnClickSaveChanges = this.handleOnClickSaveChanges.bind(this);
    this.handleOnClickSaveChanges = this.handleOnClickSaveChanges.bind(this);
    this.handleMouseEnterButton = this.handleMouseEnterButton.bind(this);
    this.handleMouseLeaveButton = this.handleMouseLeaveButton.bind(this);

    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeDurationWork = this.handleChangeDurationWork.bind(this);
    this.handleChangeDurationBreak = this.handleChangeDurationBreak.bind(this);
  }

  //onMassEnter and onMassLeave
  //onhover, check what state it's in, based on that change the local state

  handleMouseEnterBlock() {
    document.body.style.cursor = 'grab';
    this.setState({ focusState: FOCUS_HOVER });
  }

  handleMouseLeaveBlock() {
    this.setState({ focusState: FOCUS_NONE });
    document.body.style.cursor = ''; //default arrow cursor
  }

  handleClickEye() {
    this.setState({ focusState: FOCUS_INFO });
  }

  handleClickCancel(e) {
    e.preventDefault();
    this.setState({ focusState: FOCUS_INFO });
  }

  handleClickEdit() {
    this.setState({ focusState: FOCUS_EDIT });
  }

  handleCloseInfo() {
    this.setState({ focusState: FOCUS_NONE });
  }

  handleIncrementBursts() {
    if (this.state.numBursts < 10) this.setState({ numBursts: this.state.numBursts + 1 });
  }

  handleDecrementBursts() {
    if (this.state.numBursts > 1) this.setState({ numBursts: this.state.numBursts - 1 });
  }

  handleMouseEnterButton() {
    //document.body.style.cursor = 'pointer'; //flickers on button edge?
  }

  handleMouseLeaveButton() {
    //document.body.style.cursor = '';
  }

  /* need to do a PATCH request to firebase and also update the store */
  handleOnClickSaveChanges() {
    //TODO, meet with Xianhai to discuss this
    this.setState({ focusState: FOCUS_INFO })
  }

  /* Input boxes change handlers */
  handleChangeTask(e) {
    this.setState({ task: e.target.value, modTitle: e.target.value });
  }

  handleChangeDescription(e) {
    this.setState({ description: e.target.value, modDescription: e.target.value });
  }

  handleChangeDurationWork(e) {
    this.setState({ durationWork: e.target.value, modDurationWork: e.target.value });
  }

  handleChangeDurationBreak(e) {
    this.setState({ durationBreak: e.target.value, modDurationBreak: e.target.value });
  }

  //Finite state machine
  render() {
    const { blocks, blockId } = this.props;
    let blockItem;

    switch (this.state.focusState) {
      case FOCUS_NONE:

        blockItem = (
          <center>
            <div className="block-item-div-or-form" onMouseEnter={this.handleMouseEnterBlock}>
              <h3 className="burst">{this.state.numBursts}</h3> {blocks[blockId].task}
            </div>
          </center>
        )
        break;

      case FOCUS_HOVER: //only shows play or up/down buttons
        blockItem = (
          <center>
            <div className="block-item-div-or-form" onMouseLeave={this.handleMouseLeaveBlock}>
              <h3 className="burst">{this.state.numBursts}</h3> {blocks[blockId].task}
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" onClick={this.handleClickEye}>👁</button>
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" onClick={this.handleIncrementBursts}>+</button>
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" onClick={this.handleDecrementBursts}>-</button>
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" onClick={() => this.props.onRearrange(this.props.blockId, true)}>⇧</button>
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" onClick={() => this.props.onRearrange(this.props.blockId, false)}>⇩</button>
            </div>
          </center>
        )
        break;

      //should not be a form, just displaying info about block item
      case FOCUS_INFO: //only shows play or up/down buttons
        blockItem = (
          <center>
            <div className="block-item-div-or-form" >
              <span style={{ margin: '5px', fontWeight: 'bold' }}>{this.state.task}</span>
              <span style={{ margin: '5px', float: 'right' }}>Burst length: [{this.state.durationWork}]</span>
              <span style={{ margin: '5px', float: 'right' }}>Break length: [{this.state.durationBreak}]</span>
              <div className="block-item-description" >{this.state.description}</div>
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" style={{ float: 'none' }} onClick={this.handleClickEdit}>Edit</button>
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" style={{ float: 'none' }} onClick={this.handleCloseInfo}>Close</button>
            </div >
          </center>
        )
        break;


      case FOCUS_EDIT: //weird bug, form submits if I click cancel
        blockItem = (
          <center>
            <form className="block-item-div-or-form" onSubmit={this.handleBlockCreate}>

              <input
                type="text"
                placeholder="Block task"
                value={this.state.task}
                onChange={this.handleChangeTask}
                maxLength="255"
                required
              />

              <input
                type="text"
                placeholder="Block description"
                value={this.state.description}
                onChange={this.handleChangeDescription}
                maxLength="255"
                required
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
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" onClick={this.handleOnClickSaveChanges}>Save</button>
              <button onMouseEnter={this.handleMouseEnterButton} onMouseLeave={this.handleMouseLeaveButton} className="block-item-button" onClick={this.handleClickCancel}>Cancel</button>
            </form>
          </center>
        )
        break;
    }

    return (
      blockItem
    );
  }
}

BlockItem.propTypes = {
  blocks: PropTypes.object.isRequired,
  blockId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
});

export default connect(mapStateToProps)(BlockItem);
