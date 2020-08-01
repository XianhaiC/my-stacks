import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import TextareaAutosize from 'react-textarea-autosize';

import {
  FOCUS_NONE, FOCUS_HOVER, FOCUS_INFO, FOCUS_EDIT,
  BUTTON_SOLID,
  BUTTON_OUTLINE,
} from '../../util/constants';


import {dataBlockUpdate, dataStackUpdate, dataBlockDelete}
  from '../../redux/actions/dataActions';

import {
  StyledButton,
  StyledBox,
  StyledDot,
} from '../common/styles';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import KeyboardArrowUpRoundedIcon
  from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon
  from '@material-ui/icons/KeyboardArrowDownRounded';

const StyledBoxButtonsFront = styled(StyledBox)`
  justify-content: flex-end;
`;

const StyledBoxButtonsEnd = styled(StyledBox)`
  justify-content: flex-start;
  align-self: flex-start;
  padding-top: 0.2rem;
`;

const StyledContainer = styled.a`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainerInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  border-radius: 0.3rem;
  transition: height 0.5s ease-in-out;
  box-shadow:
  ${(props) =>
  props.mode === FOCUS_INFO ||
  props.mode === FOCUS_EDIT ?
      '0px 0px 20px rgba(0, 0, 0, 0.15)' :
      'none'
};
  border:
  ${(props) => props.mode === FOCUS_EDIT ?
      `0.11rem solid ${props.theme.secondary}` :
      'none'
};
`;

const StyledHLine = styled.hr`
  border: 1px solid ${(props) => props.theme.primaryLightDull};
  width: 100%;
  background-color: ${(props) => props.theme.primaryLightDull};
`;

const StyledVLine = styled.div`
  border: 1px solid ${(props) => props.theme.primaryDark};
  background-color: ${(props) => props.theme.primaryDark};
  height: 1.5rem;
`;

const StyledContainerRow = styled.div`
  display: flex;
  align-items: center;
`;

const StyledContainerCol = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContainerDurations = styled(StyledContainerRow)`
  position: absolute;
  right: 0;
  opacity:
  ${(props) =>
  props.mode === FOCUS_INFO ||
  props.mode === FOCUS_EDIT ?
      '1' :
      '0'
};
`;

const StyledContainerBursts = styled(StyledContainerRow)`
  position: absolute;
  padding-right: 1rem;
  right: 0;
  opacity:
  ${(props) =>
  props.mode === FOCUS_NONE ||
  props.mode === FOCUS_HOVER ?
      '1' :
      '0'
};
`;

const StyledDotBurst = styled(StyledDot)`
  margin: 0.2rem;
  background: ${(props) => props.theme.secondary};
`;

const StyledFiller = styled.div`
  flex: 1;
`;

const StyledText = styled.input`
  border 0;
  font-size: 1rem;
  font-weight: 600;
  width: calc(100% - 18rem);
  margin-left: 2rem;
  padding: 0.8rem 0;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primaryDark};
  background: none;

  &:focus {
    outline: none;
  }
`;

const StyledTextDuration = styled(StyledText)`
  font-weight: 600;
  padding: 0.8rem 2rem;
  width: 4.25rem;
  margin: 0;
  text-align: center;
`;

const StyledDescription = styled(TextareaAutosize)`
  background-color: ${(props) => props.theme.primaryLightDull};
  border-radius: 0 0 0.3rem 0.3rem;
  border: 0;
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  overflow: auto;
  color: ${(props) => props.theme.midtone};
  padding: 
  ${(props) =>
  props.mode === FOCUS_INFO ||
  props.mode === FOCUS_EDIT ?
      '0.8rem' :
      '0'
} 2rem;
  height:
  ${(props) =>
  props.mode === FOCUS_INFO ||
  props.mode === FOCUS_EDIT ?
      '1rem' :
      '0'
};
  display:
  ${(props) =>
  props.mode === FOCUS_INFO ||
  props.mode === FOCUS_EDIT ?
      'block' :
      'none'
};
`;

const StyledContainerFront = styled.div`
  display: flex;

  & > * {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
`;

const StyledContainerSwap = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
`;

const StyledContainerMod = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1.5rem;
`;

const StyledButtonMod = styled(StyledButton)`
  width: 6rem;
`;

const StyledButtonSave = styled(StyledButtonMod)`
  margin-bottom: 0.6rem;
`;

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
    this.handleClickSave = this.handleClickSave.bind(this);
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

  handleClickOutside(e) {
    console.log('HOUT');
    if (this.state.focusState !== FOCUS_EDIT) {
      this.setState({focusState: FOCUS_NONE});
    }
  }

  handleMouseEnterBlock() {
    if (this.state.focusState === FOCUS_NONE) {
      this.setState({focusState: FOCUS_HOVER});
    }
  }

  handleMouseLeaveBlock() {
    if (this.state.focusState === FOCUS_HOVER) {
      this.setState({focusState: FOCUS_NONE});
    }
  }

  handleClickFocus() {
    if ( this.state.focusState === FOCUS_NONE ||
      this.state.focusState === FOCUS_HOVER) {
      this.setState({focusState: FOCUS_INFO});
    }
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

  handleClickSave() {
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
    const {blocks, blockId} = this.props;

    const componentBursts = [];
    for (let i = 0; i < blocks[blockId].numBursts; i++) {
      componentBursts.push(
          <StyledDotBurst key={i} />,
      );
    }

    let componentButtonsEnd = null;

    switch (this.state.focusState) {
      case FOCUS_HOVER:
        componentButtonsEnd = (
          <StyledContainerSwap>
            <KeyboardArrowUpRoundedIcon />
            <KeyboardArrowDownRoundedIcon />
          </StyledContainerSwap>
        );
        break;

      case FOCUS_INFO:
        componentButtonsEnd = (
          <StyledContainerMod>
            <StyledButtonMod type={BUTTON_SOLID} onClick={this.handleClickEdit}>
              Edit
            </StyledButtonMod>
          </StyledContainerMod>
        );
        break;
      case FOCUS_EDIT:
        componentButtonsEnd = (
          <StyledContainerMod>
            <StyledButtonSave
              type={BUTTON_SOLID}
              onClick={this.handleClickSave}>
              Save
            </StyledButtonSave>
            <StyledButtonMod
              type={BUTTON_OUTLINE}
              onClick={this.handleClickCancel}>
              Cancel
            </StyledButtonMod>
          </StyledContainerMod>
        );
        break;
      default:
        break;
    }

    return (
      <StyledContainer
        onMouseEnter={this.handleMouseEnterBlock}
        onMouseLeave={this.handleMouseLeaveBlock}
      >
        <StyledBoxButtonsFront>
          {this.state.focusState == FOCUS_HOVER &&
            <StyledContainerFront>
              <CloseRoundedIcon />
              <PlayArrowRoundedIcon />
            </StyledContainerFront>

          }
        </StyledBoxButtonsFront>

        <StyledContainerCol>
          <StyledContainerInner
            onClick={this.handleClickFocus}
            mode={this.state.focusState}>

            <StyledContainerRow>
              <StyledText
                type="text"
                placeholder="Task"
                value={this.state.focusState === FOCUS_EDIT ?
                    this.state.task :
                    blocks[blockId].task
                }
                onChange={this.handleChangeEditTask}
                maxLength="255"
                required
                disabled={this.state.focusState !== FOCUS_EDIT}
              />

              <StyledFiller />

              <StyledContainerDurations mode={this.state.focusState}>
                <StyledTextDuration
                  mode={this.state.focusState}
                  type="text"
                  placeholder="Duration"
                  value={this.state.focusState === FOCUS_EDIT ?
                      this.state.durationWork :
                      blocks[blockId].durationWork
                  }
                  onChange={this.handleChangeEditDurationWork}
                  maxLength="2"
                  required
                  disabled={this.state.focusState !== FOCUS_EDIT}
                />
                <StyledVLine />
                <StyledTextDuration
                  mode={this.state.focusState}
                  type="text"
                  placeholder="Duration"
                  value={this.state.focusState === FOCUS_EDIT ?
                      this.state.durationBreak :
                      blocks[blockId].durationBreak
                  }
                  onChange={this.handleChangeEditDurationBreak}
                  maxLength="2"
                  required
                  disabled={this.state.focusState !== FOCUS_EDIT}
                />
              </StyledContainerDurations>

              <StyledContainerBursts mode={this.state.focusState}>
                {componentBursts}
              </StyledContainerBursts>
            </StyledContainerRow>

            <StyledDescription
              mode={this.state.focusState}
              placeholder='Description'
              onChange={this.handleChangeEditDescription}
              disabled={this.state.focusState !== FOCUS_EDIT}
            >
              {this.state.focusState === FOCUS_EDIT ?
                  this.state.description :
                  blocks[blockId].description
              }
            </StyledDescription>

          </StyledContainerInner>
          {(this.state.focusState === FOCUS_NONE ||
              this.state.focusState === FOCUS_HOVER) &&
            <StyledHLine />
          }
        </StyledContainerCol>

        <StyledBoxButtonsEnd>
          {componentButtonsEnd}
        </StyledBoxButtonsEnd>
      </StyledContainer>
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

export default
connect(mapStateToProps, mapDispatchToProps)(onClickOutside(BlockItem));
