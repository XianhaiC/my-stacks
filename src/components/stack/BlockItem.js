import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FOCUS_NONE, FOCUS_SHOW_BUTTONS, FOCUS_SHOW_INFO, FOCUS_EDIT
} from '../../util/constants';

class BlockItem extends Component {
  constructor() {
    super();

    this.state = {
      hover: false,
      modTitle: null, //title of the task block
      modDescription: null, //description of the task block
      modDurationWork: null, //time length in seconds of burst
      modDurationBreak: null, //time length in seconds of break
      focusState: FOCUS_NONE,
    };

    this.handleOnHover = this.handleOnHover.bind(this);
    this.handleOnNotHover = this.handleOnNotHover.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //onMassEnter and onMassLeave
  //onhover, check what state it's in, based on that change the local state

  handleOnHover = () => {
    document.body.style.cursor = 'grab';
    //check what state we are in first, then determine what's next like
    //a finite state machine
    this.setState({ focusState: FOCUS_SHOW_BUTTONS });
  }

  handleOnNotHover = () => {
    console.log("MOUSE EXITED");
    this.setState({ focusState: FOCUS_NONE });
    //document.body.style.cursor = ''; //default arrow cursor
  }

  handleOnClick = () => {
    this.setState({ focusState: FOCUS_SHOW_INFO });
  }

  handleCancel = () => {
    this.setState({ focusState: FOCUS_SHOW_INFO });
  }

  handleEdit = () => {
    this.setState({ focusState: FOCUS_EDIT });
  }

  handleClose = () => {
    this.setState({ focusState: FOCUS_NONE });
  }

  render() {
    const { blocks, blockId } = this.props;
    let jsxRendering;

    switch (this.state.focusState) {
      case FOCUS_NONE:

        jsxRendering = (
          <div style={{ margin: 20, border: '2px solid red', padding: 20 }} onMouseEnter={this.handleOnHover} onClick={this.handleOnClick}>
            {blocks[blockId].task}
          </div>
        )
        break;

      case FOCUS_SHOW_BUTTONS: //only shows play or up/down buttons
        jsxRendering = (
          <div style={{ margin: 20, border: '2px solid red', padding: 20 }} onMouseLeave={this.handleOnNotHover} onClick={this.handleOnClick}>
            {blocks[blockId].task} <button>+</button><button>-</button>
          </div>
        )
        break;

      case FOCUS_SHOW_INFO: //only shows play or up/down buttons
        jsxRendering = (
          <form onSubmit={this.handleBlockCreate}>

            <input
              type="text"
              placeholder="Block task"
              value={this.state.task}
              onChange={this.handleChangeTask}
              maxLength="255"
              contentEditable='false'
              required readonly />

            <input
              type="text"
              placeholder="Block description"
              value={this.state.description}
              onChange={this.handleChangeDescription}
              maxLength="255"
              required readonly />

            <input
              type="number"
              placeholder="Duration"
              value={this.state.durationWork}
              onChange={this.handleChangeDurationWork}
              maxLength="255"
              required readonly />

            <input
              type="number"
              placeholder="Break"
              value={this.state.durationBreak}
              onChange={this.handleChangeDurationBreak}
              maxLength="255"
              required readonly />
            <button onClick={this.handleEdit}>Edit</button>
            <button onClick={this.handleClose}>Close</button>
            <input type="submit" value="Add block" />
          </form>
        )
        break;


      case FOCUS_EDIT:
        jsxRendering = (
          <form onSubmit={this.handleBlockCreate}>

            <input
              type="text"
              placeholder="Block task"
              value={this.state.task}
              onChange={this.handleChangeTask}
              maxLength="255"
              required />

            <input
              type="text"
              placeholder="Block description"
              value={this.state.description}
              onChange={this.handleChangeDescription}
              maxLength="255"
              required />

            <input
              type="number"
              placeholder="Duration"
              value={this.state.durationWork}
              onChange={this.handleChangeDurationWork}
              maxLength="255"
              required />

            <input
              type="number"
              placeholder="Break"
              value={this.state.durationBreak}
              onChange={this.handleChangeDurationBreak}
              maxLength="255"
              required />
            <button>Save</button>
            <button onClick={this.handleCancel}>Cancel</button>
            <input type="submit" value="Add block" />
          </form>
        )
        break;

      case FOCUS_EDIT:
        jsxRendering = (
          <div>
            <p>TODO</p>
          </div>
        )
        break;

      default:
        jsxRendering = (
          <div onMouseEnter={this.handleOnHover} onMouseLeave={this.handleOnNotHover}>
            {blocks[blockId].task}
          </div>
        )
        break;
    }

    return (
      jsxRendering
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
