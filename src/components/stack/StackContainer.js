import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import BlockList from './BlockList';
import StackDock from './StackDock';
import PlaylistContainer from '../playlist/PlaylistContainer';

import {StyledBoxColumn} from '../common/styles';

import {DISPLAY_STACK} from '../../util/constants';

const StyledBoxDynamic = styled(StyledBoxColumn)`
  flex:
  ${(props) => props.display === DISPLAY_STACK ?
      '0' :
      '1'
};
  transition: all 0.5s ease-in-out;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StyledContainerInner = styled(StyledContainer)`
  height:
  ${(props) => props.display === DISPLAY_STACK ?
      '100%' :
      '80%'
};
`;

const StyledContainerStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: ${(props) => props.theme.primaryLight};
  transition: all 0.5s ease-in-out;
  flex:
  ${(props) => props.display === DISPLAY_STACK ?
      '1' :
      '0'
};
  height:
  ${(props) => props.display === DISPLAY_STACK ?
      '100%' :
      '0'
};
  visibility:
  ${(props) => props.display === DISPLAY_STACK ?
      'visible' :
      'hidden'
};
`;

const StyledContainerText = styled.div`
  display: flex;
  flex:
  ${(props) => props.display === DISPLAY_STACK ?
      '0 1 auto' :
      '1'
};
  height:
  ${(props) => props.display === DISPLAY_STACK ?
      '8rem' :
      'auto'
};
`;

const StyledTextName = styled.div`
  font-size: 1.75rem;
  font-weight: 500;
  margin: auto 0 0.5rem 7rem;
  color: ${(props) => props.theme.primaryLight};
`;

class StackContainer extends Component {
  render() {
    const {
      display,
      stacks,
      stackFocused,
      loadingStacks,
      loadingBlocks,
    } = this.props;

    const componentStack = loadingBlocks || loadingStacks ?
      null :
      (
        <Fragment>
          <BlockList />
          <StackDock />
        </Fragment>
      );


    return (
      <StyledContainer>
        <StyledContainerText display={display}>
          {!loadingStacks && <StyledTextName>{stacks[stackFocused].name}</StyledTextName>}
        </StyledContainerText>
        <StyledContainerInner display={display}>

          <StyledContainerStack display={display}>
            {componentStack}
          </StyledContainerStack>

          <PlaylistContainer />

        </StyledContainerInner>
        <StyledBoxDynamic display={display}/>
      </StyledContainer>
    );
  }
}

StackContainer.propTypes = {
  stacks: PropTypes.object,
  stackFocused: PropTypes.string,
  loadingStacks: PropTypes.bool.isRequired,
  loadingBlocks: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  display: state.session.display,
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  loadingStacks: state.session.loadingStacks,
  loadingBlocks: state.session.loadingBlocks,
});

export default connect(mapStateToProps)(StackContainer);
