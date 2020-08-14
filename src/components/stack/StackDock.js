import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import StackDockGrace from './StackDockGrace';

import {playlistStart} from '../../redux/actions/playlistActions';

import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';

import {StyledBox, StyledButton} from '../common/styles';
import {BUTTON_SOLID} from '../../util/constants';

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 3rem;
  padding-bottom: 3rem;
`;
const StyledBoxRight = styled(StyledBox)`
  justify-content: flex-end;
  padding-right: 3rem;
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

class StackDock extends Component {
  constructor() {
    super();

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickShuffle = this.handleClickShuffle.bind(this);
    this.playlistPreprocess = this.playlistPreprocess.bind(this);
  }

  handleClickStart() {
    this.playlistPreprocess(false);
  }

  handleClickShuffle() {
    this.playlistPreprocess(false);
  }

  // ----- helpers

  playlistPreprocess(shuffle) {
    const {stacks, stackFocused, playlistStart} = this.props;
    playlistStart(stacks[stackFocused].order, shuffle);
  }

  render() {
    const style = {
      fontSize: '1.15rem',
    };
    return (
      <StyledContainer>
        <StyledBox />

        <StyledBox>
          <StyledButton type={BUTTON_SOLID}
            onClick={this.handleClickStart}>Start session</StyledButton>
          <StyledButtonIcon onClick={this.handleClickShuffle}>
            <ShuffleRoundedIcon style={style}/>
          </StyledButtonIcon>
        </StyledBox>

        <StyledBoxRight>
          <StackDockGrace />
          <StyledButtonIcon alt='true'>
            <LoopRoundedIcon style={style}/>
          </StyledButtonIcon>
        </StyledBoxRight>
      </StyledContainer>
    );
  }
}

StackDock.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  playlistStart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

export default connect(mapStateToProps, {playlistStart})(StackDock);
