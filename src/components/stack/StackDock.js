import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import StackDockGrace from './StackDockGrace';

import {dataStackUpdate} from '../../redux/actions/dataActions';
import {playlistStart} from '../../redux/actions/playlistActions';

import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';

import {StyledBox, StyledButton, media} from '../common/styles';

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 3rem;
  padding-bottom: 3rem;

  ${media.xs(`
    padding-bottom: 1rem;
  `)}
`;

const StyledBoxLeft = styled(StyledBox)`
  ${media.xs(`
    display: none;
  `)}
`;

const StyledBoxRight = styled(StyledBox)`
  justify-content: flex-end;
  padding-right: 3rem;

  ${media.xs(`
    display: none;
  `)}
`;

const StyledButtonIcon = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2rem;
  width: 2.2rem;
  padding: 0.4rem 0.4rem;
  margin-left: 1.5rem;
  min-width: initial;
`;

const StyledButtonIconRoutine = styled(StyledButtonIcon)`
  visibility: ${(props) => props.visible ? 'visible' : 'hidden'};
`;

class StackDock extends Component {
  constructor() {
    super();

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickShuffle = this.handleClickShuffle.bind(this);
    this.handleClickRoutine = this.handleClickRoutine.bind(this);
    this.playlistPreprocess = this.playlistPreprocess.bind(this);
  }

  handleClickStart() {
    this.playlistPreprocess(false);
  }

  handleClickShuffle() {
    this.playlistPreprocess(true);
  }

  handleClickRoutine() {
    const {stacks, stackFocused, dataStackUpdate} = this.props;
    const stack = stacks[stackFocused];
    dataStackUpdate(stackFocused, {
      ...stack,
      'isRoutine': !stack.isRoutine,
    });
  }

  // ----- helpers

  playlistPreprocess(shuffle) {
    const {stacks, stackFocused, playlistStart} = this.props;
    playlistStart(stacks[stackFocused].order, shuffle);
  }

  render() {
    const {stacks, stackFocused} = this.props;

    if (stacks[stackFocused].order.length <= 0) {
      return null;
    }

    const style = {
      fontSize: '1.15rem',
    };
    return (
      <StyledContainer>
        <StyledBoxLeft />

        <StyledBox>
          <StyledButton solid={true}
            onClick={this.handleClickStart}>Start</StyledButton>
          <StyledButtonIcon onClick={this.handleClickShuffle}>
            <ShuffleRoundedIcon style={style}/>
          </StyledButtonIcon>
        </StyledBox>

        <StyledBoxRight>
          <StackDockGrace />
          <StyledButtonIconRoutine visible={!stacks[stackFocused].isInbox}
            alt='true' solid={stacks[stackFocused].isRoutine}
            onClick={this.handleClickRoutine} >
            <LoopRoundedIcon style={style}/>
          </StyledButtonIconRoutine>
        </StyledBoxRight>
      </StyledContainer>
    );
  }
}

StackDock.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  dataStackUpdate: PropTypes.func.isRequired,
  playlistStart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

const mapDispatchToProps = {
  dataStackUpdate,
  playlistStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackDock);
