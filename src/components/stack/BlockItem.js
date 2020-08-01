import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import {
  FOCUS_NONE, FOCUS_HOVER, FOCUS_INFO, FOCUS_EDIT,
} from '../../util/constants';

import {dataBlockUpdate} from '../../redux/actions/dataActions';

import {StyledBox, StyledDot} from '../common/styles';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

const StyledBoxButtonsFront = styled(StyledBox)`
  justify-content: flex-end;
`

const StyledBoxButtonsEnd = styled(StyledBox)`
  justify-content: flex-start;
`

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledContainerInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 70%;
  box-shadow:
  ${props =>
  props.mode === FOCUS_INFO
  || props.mode === FOCUS_EDIT
      ? '0px 0px 20px rgba(0, 0, 0, 0.15)'
      : 'none'
  };
  border-radius: 5px;
  transition: height 0.5s ease-in-out;
`

const StyledHLine = styled.hr`
  border: 1px solid ${props => props.theme.primaryLightDull};
  background-color: ${props => props.theme.primaryLightDull};
`

const StyledVLine = styled.div`
  border: 1px solid ${props => props.theme.primaryDark};
  background-color: ${props => props.theme.primaryDark};
  height: 1.5rem;
`

const StyledContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledContainerDurations = styled(StyledContainerRow)`
  position: absolute;
  right: 0;
  opacity:
  ${props => props.mode === FOCUS_INFO
      ? '1'
      : '0'
  };
  transition: all, 0.2s ease-in-out;
`

const StyledTextDuration = styled.div`
  font-weight: 500;
  padding: 0.8rem 2rem;
`

const StyledContainerBursts = styled(StyledContainerRow)`
  position: absolute;
  padding-right: 1rem;
  right: 0;
  opacity:
  ${props =>
  props.mode === FOCUS_NONE
  || props.mode === FOCUS_HOVER
      ? '1'
      : '0'
  };
  transition: all, 0.2s ease-in-out;
`

const StyledDotBurst = styled(StyledDot)`
  margin: 0.2rem;
  background: ${props => props.theme.secondary};
`

const StyledFiller = styled.div`
  flex: 1;
`

const StyledText = styled.div`
  font-weight: 500;
  margin-left: 2rem;
  padding: 0.8rem 0;
  color: ${props => props.theme.primaryDark};
`

const StyledDescription = styled.div`
  background-color: ${props => props.theme.primaryLightDull};
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom:
  ${props =>
  props.mode === FOCUS_INFO
  || props.mode === FOCUS_EDIT
      ? '0.8rem'
      : '0'
  };
  padding-top:
  ${props =>
  props.mode === FOCUS_INFO
  || props.mode === FOCUS_EDIT
      ? '0.8rem'
      : '0'
  };
  height:
  ${props =>
  props.mode === FOCUS_INFO
  || props.mode === FOCUS_EDIT
      ? '1rem'
      : '0'
  };
  opacity:
  ${props =>
  props.mode === FOCUS_INFO
  || props.mode === FOCUS_EDIT
      ? '1'
      : '0'
  };
  transition: height, 0.2s ease-in-out,
  opacity 0.1s ease-in-out,
  padding-top 0.2s ease-in-out,
  padding-bottom 0.2s ease-in-out;
`

const StyledContainerButtonsFront = styled.div`
  display: flex;

  & > * {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
`

const StyledContainerButtonsBack = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
`

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

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleMouseEnterBlock = this.handleMouseEnterBlock.bind(this);
    this.handleMouseLeaveBlock = this.handleMouseLeaveBlock.bind(this);
    this.handleClickFocus = this.handleClickFocus.bind(this);
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

  handleClickOutside(e) {
    console.log("HOUT")
    if (this.state.focusState !== FOCUS_EDIT)
      this.setState({focusState: FOCUS_NONE});
  }

  handleMouseEnterBlock() {
    if (this.state.focusState === FOCUS_NONE)
      this.setState({focusState: FOCUS_HOVER});
  }

  handleMouseLeaveBlock() {
    if (this.state.focusState === FOCUS_HOVER)
      this.setState({focusState: FOCUS_NONE});
  }

  handleClickFocus() {
    this.setState({focusState: FOCUS_INFO});
  }

  handleClickCancel(e) {
    e.preventDefault();
    this.setState({focusState: FOCUS_INFO});
  }

  handleClickEdit() {
    const {blocks, blockId} = this.props;
    this.setState({
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
      this.handleBurstsUpdate(this.state.numBursts + 1);
    }
  }

  handleDecrementBursts() {
    if (this.state.numBursts > 1) {
      this.handleBurstsUpdate(this.state.numBursts - 1);
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
      task: this.state.task,
      description: this.state.description,
      durationWork: this.state.durationWork,
      durationBreak: this.state.durationBreak,
    }, this.props.blockId);
  }

  handleBurstsUpdate(newBurstsValue) {
    this.props.dataBlockUpdate({
      numBursts: newBurstsValue,
    }, this.props.blockId);
    this.setState({numBursts: newBurstsValue});
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
    let componentBursts = []
    for (let i = 0; i < blocks[blockId].numBursts; i++)
      componentBursts.push(
        <StyledDotBurst key={i} />
      )

    return (
      <StyledContainer
        onMouseEnter={this.handleMouseEnterBlock}
        onMouseLeave={this.handleMouseLeaveBlock}
        >
        <StyledBoxButtonsFront>
          {this.state.focusState == FOCUS_HOVER &&
            <StyledContainerButtonsFront>
              <CloseRoundedIcon />
              <PlayArrowRoundedIcon />
            </StyledContainerButtonsFront>

          }
        </StyledBoxButtonsFront>

        <StyledContainerInner
          onClick={this.handleClickFocus}
          mode={this.state.focusState}>

          <StyledContainerRow>
            <StyledText>{blocks[blockId].task}</StyledText>

            <StyledFiller />

            <StyledContainerDurations mode={this.state.focusState}>
              <StyledTextDuration>{blocks[blockId].durationWork}m</StyledTextDuration>
              <StyledVLine />
              <StyledTextDuration>{blocks[blockId].durationBreak}m</StyledTextDuration>
            </StyledContainerDurations>

            <StyledContainerBursts mode={this.state.focusState}>
              {componentBursts}
            </StyledContainerBursts>
          </StyledContainerRow>

          <StyledDescription mode={this.state.focusState}>
            {blocks[blockId].description}
          </StyledDescription>

          <StyledHLine mode={this.state.focusState} />
        </StyledContainerInner>

        <StyledBoxButtonsEnd>
          {this.state.focusState == FOCUS_HOVER &&
            <StyledContainerButtonsBack>
              <KeyboardArrowUpRoundedIcon />
              <KeyboardArrowDownRoundedIcon />
            </StyledContainerButtonsBack>
          }
        </StyledBoxButtonsEnd>
      </StyledContainer>
    );

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
                onClick={this.handleClickFocus}>
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

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(BlockItem));
