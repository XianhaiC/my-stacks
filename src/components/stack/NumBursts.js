import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {
  StyledDot,
  media,
} from '../common/styles';

import {
  FOCUS_NONE, FOCUS_HOVER,
} from '../../util/constants';

import {dataBlockUpdate} from '../../redux/actions/dataActions';

const StyledContainerBursts = styled.div`
  display: flex;
  align-items: center;
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

  ${media.xs(`
    display: none;
  `)}
`;

const StyledDotContainer = styled.div`
  height: 2.6rem;
  display: flex;
  align-items: center;
`;

const StyledDotBurst = styled(StyledDot)`
  margin: 0.2rem;
  background: ${(props) => props.theme.secondary};
`;

const StyledDotDim = styled(StyledDot)`
  margin: 0.2rem;
  background: ${(props) => props.theme.primaryLightDull};
`;

class NumBursts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numBurstsDim: 0,
      focusStatePrev: 0,
    };

    this.addDim = this.addDim.bind(this);
    this.handleClickDot = this.handleClickDot.bind(this);
  }

  componentDidUpdate() {
    const {focusState, blockId, blocks} = this.props;
    if (this.state.focusStatePrev !== focusState) {
      if (focusState === FOCUS_HOVER) {
        this.setState({
          numBurstsDim: blocks[blockId].numBursts >= 10 ? 0 : 1,
          focusStatePrev: focusState,
        });
      } else {
        this.setState({numBurstsDim: 0, focusStatePrev: focusState});
      }
    }
  }

  addDim() {
    const {blockId, blocks} = this.props;
    const total = blocks[blockId].numBursts + this.state.numBurstsDim;

    if (total >= 10) return;
    this.setState({numBurstsDim: this.state.numBurstsDim + 1});
  }

  handleClickDot(index, e) {
    e.stopPropagation();
    const {blockId, handleBurstsUpdate, blocks} = this.props;
    const total = blocks[blockId].numBursts + this.state.numBurstsDim;
    handleBurstsUpdate(total - index);
    this.setState({numBurstsDim: index});
  }

  render() {
    const {focusState, blockId, blocks} = this.props;
    const componentBursts = [];

    let i = 0;
    for (; i < this.state.numBurstsDim; i++) {
      const index = i;
      const boundClickDot = this.handleClickDot.bind(this, index);
      componentBursts.push(
          <StyledDotContainer onMouseEnter={i === 0 ? this.addDim : null}
            onClick={boundClickDot}
            key={i}>
            <StyledDotDim />
          </StyledDotContainer>,
      );
    }

    for (; i < blocks[blockId].numBursts + this.state.numBurstsDim; i++) {
      const index = i;
      const boundClickDot = this.handleClickDot.bind(this, index);
      componentBursts.push(
          <StyledDotContainer
            onClick={boundClickDot}
            key={i}>
            <StyledDotBurst />
          </StyledDotContainer>,
      );
    }

    return (
      <StyledContainerBursts mode={focusState}>
        {componentBursts}
      </StyledContainerBursts>
    );
  }
}

NumBursts.propTypes = {
  focusState: PropTypes.number.isRequired,
  blockId: PropTypes.string.isRequired,
  handleBurstsUpdate: PropTypes.func.isRequired,
  blocks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
});

const mapDispatchToProps = {
  dataBlockUpdate,
};


export default
connect(mapStateToProps, mapDispatchToProps)(NumBursts);
