import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled, {withTheme} from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import TextareaAutosize from 'react-textarea-autosize';

import {
  FOCUS_NONE, FOCUS_HOVER, FOCUS_INFO, FOCUS_EDIT,
  BUTTON_OUTLINE,
} from '../../util/constants';

import NumBursts from './NumBursts';

import {playlistStart} from '../../redux/actions/playlistActions';
import {
  dataBlockCreate,
  dataBlockUpdate,
  dataStackUpdate,
  dataBlockDelete,
} from '../../redux/actions/dataActions';

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
  constructor(props) {
    super(props);

    this.state = {
      task: '',
      description: '',
      durationWork: 25,
      durationBreak: 5,
      numBursts: 3,
      stackId: '',
      hover: false,
      focusState: props.blockCreate ? FOCUS_EDIT : FOCUS_NONE,
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleMouseEnterBlock = this.handleMouseEnterBlock.bind(this);
    this.handleMouseLeaveBlock = this.handleMouseLeaveBlock.bind(this);
    this.handleClickFocus = this.handleClickFocus.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleIncrementBursts = this.handleIncrementBursts.bind(this);
    this.handleDecrementBursts = this.handleDecrementBursts.bind(this);
    this.handleClickSwap = this.handleClickSwap.bind(this);
    this.swapBlocks = this.swapBlocks.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleBurstsUpdate = this.handleBurstsUpdate.bind(this);
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
    if (this.state.focusState === FOCUS_NONE ||
      this.state.focusState === FOCUS_HOVER) {
      this.setState({focusState: FOCUS_INFO});
    }
  }

  handleClickCancel(e) {
    e.preventDefault();
    const {blockCreate, closeBlock} = this.props;

    if (blockCreate) {
      closeBlock();
      return;
    }

    this.setState({focusState: FOCUS_INFO});
  }

  handleClickEdit() {
    const {blocks, blockId} = this.props;
    this.setState({
      focusState: FOCUS_EDIT,
      task: blocks[blockId].task,
      durationWork: blocks[blockId].durationWork / 60,
      durationBreak: blocks[blockId].durationBreak / 60,
      description: blocks[blockId].description,
    });
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

  handleClickSwap(up) {
    const {stacks, stackFocused, blockId} = this.props;
    const dir = up ? -1 : 1;
    const index = stacks[stackFocused].order.indexOf(blockId);
    this.swapBlocks(index, index + dir);
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

  handleClickSave() {
    const {
      blocks,
      blockId,
      dataBlockUpdate,
      blockCreate,
      closeBlock,
    } = this.props;

    if (blockCreate) {
      this.props.dataBlockCreate({
        task: this.state.task,
        description: this.state.description,
        durationWork: this.state.durationWork * 60,
        durationBreak: this.state.durationBreak * 60,
        numBursts: this.state.numBursts,
        stackId: this.props.stackFocused,
        userId: null,
        createdAt: null,
      });
      closeBlock();
      return;
    }

    this.setState({focusState: FOCUS_INFO});
    dataBlockUpdate(blockId, {
      ...blocks[blockId],
      task: this.state.task,
      description: this.state.description,
      durationWork: this.state.durationWork * 60,
      durationBreak: this.state.durationBreak * 60,
    });
  }

  handleClickPlay() {
    const {stacks, stackFocused, blockId, playlistStart} = this.props;
    const order = stacks[stackFocused].order;
    const index = order.indexOf(blockId);
    playlistStart(order.slice(index), false);
  }

  handleBurstsUpdate(newBurstsValue) {
    const {blocks, blockId} = this.props;
    this.props.dataBlockUpdate(blockId, {
      ...blocks[blockId],
      numBursts: newBurstsValue,
    });
    this.setState({numBursts: newBurstsValue});
  }

  handleBlockDelete() {
    const {stackFocused} = this.props;
    this.props.dataBlockDelete(this.props.blockId, stackFocused);
  }

  swapBlocks(currIndex, swapIndex) {
    const {stacks, stackFocused, dataStackUpdate} = this.props;

    // deep copy
    const blocksOrderNew = [...stacks[stackFocused].order];

    if (swapIndex < 0 || swapIndex >= blocksOrderNew.length) {
      return;
    }
    const temp = blocksOrderNew[currIndex];
    blocksOrderNew[currIndex] = blocksOrderNew[swapIndex];
    blocksOrderNew[swapIndex] = temp;

    dataStackUpdate(stackFocused, {
      ...stacks[stackFocused],
      order: blocksOrderNew,
    });
  }

  // Finite state machine
  render() {
    const {blocks, blockId, blockCreate} = this.props;

    const componentBursts = [];
    if (!blockCreate) {
      for (let i = 0; i < blocks[blockId].numBursts; i++) {
        componentBursts.push(
            <StyledDotBurst key={i} />,
        );
      }
    }

    let componentButtonsEnd = null;

    switch (this.state.focusState) {
      case FOCUS_HOVER:
        componentButtonsEnd = (
          <StyledContainerSwap>
            <KeyboardArrowUpRoundedIcon
              onClick={() => this.handleClickSwap(true)}
            />
            <KeyboardArrowDownRoundedIcon
              onClick={() => this.handleClickSwap(false)}
            />
          </StyledContainerSwap>
        );
        break;

      case FOCUS_INFO:
        componentButtonsEnd = (
          <StyledContainerMod>
            <StyledButtonMod solid={true} onClick={this.handleClickEdit}>
              Edit
            </StyledButtonMod>
          </StyledContainerMod>
        );
        break;
      case FOCUS_EDIT:
        componentButtonsEnd = (
          <StyledContainerMod>
            <StyledButtonSave
              solid={true}
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
          {this.state.focusState === FOCUS_HOVER &&
            <StyledContainerFront>
              <CloseRoundedIcon
                style={{color: this.props.theme.secondaryAlt}}
                onClick={this.handleBlockDelete} />
              <PlayArrowRoundedIcon
                style={{color: this.props.theme.secondary}}
                onClick={this.handleClickPlay} />
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
                    `${blocks[blockId].durationWork / 60}m`
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
                  placeholder="Break"
                  value={this.state.focusState === FOCUS_EDIT ?
                    this.state.durationBreak :
                    `${blocks[blockId].durationBreak / 60}m`
                  }
                  onChange={this.handleChangeEditDurationBreak}
                  maxLength="2"
                  required
                  disabled={this.state.focusState !== FOCUS_EDIT}
                />
              </StyledContainerDurations>

              {!blockCreate &&
                <NumBursts
                  focusState={this.state.focusState}
                  blockId={blockId}
                  handleBurstsUpdate={this.handleBurstsUpdate}
                />
              }
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
  blockCreate: PropTypes.bool,
  closeBlock: PropTypes.func,
  stacks: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  dataBlockCreate: PropTypes.func.isRequired,
  dataBlockUpdate: PropTypes.func.isRequired,
  dataStackUpdate: PropTypes.func.isRequired,
  dataBlockDelete: PropTypes.func.isRequired,
  playlistStart: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

const mapDispatchToProps = {
  dataBlockCreate,
  dataBlockUpdate,
  dataStackUpdate,
  dataBlockDelete,
  playlistStart,
};

export default
connect(mapStateToProps, mapDispatchToProps)(
    withTheme(onClickOutside(BlockItem)),
);
