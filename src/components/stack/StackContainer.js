import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import BlockList from './BlockList';
import StackDock from './StackDock';
import PlaylistContainer from '../playlist/PlaylistContainer';
import PopupOptionsStack from '../popups/PopupOptionsStack';

import {StyledBoxColumn, StyledButtonContainer} from '../common/styles';

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

import {DISPLAY_STACK} from '../../util/constants';

import {stackSetPopupVisibleOptionsStack}
  from '../../redux/actions/stackActions';

const StyledBoxDynamic = styled(StyledBoxColumn)`
  flex:
  ${(props) => props.display === DISPLAY_STACK ?
      '0' :
      '1'
};
  transition: all 0.4s ease-in-out;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StyledContainerInner = styled(StyledContainer)`
  position: relative;
  background: ${(props) => props.theme.primaryLight};
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  height: calc(100% - 8rem);
  transition: all 0.4s ease-in-out;
`;

const StyledContainerStack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) => props.theme.primaryLight};
  justify-content: space-between;
  height: 100%;
  opacity:
  ${(props) => props.display === DISPLAY_STACK ?
      '1' :
      '0'
};
  transition: all 0.4s ease-in-out;
`;

const StyledContainerText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;
  height: auto;
  transition: all 0.4s ease-in-out;
`;

const StyledTextName = styled.div`
  font-size: 1.75rem;
  font-weight: 500;
  margin: auto 0 0.5rem 7rem;
  color: ${(props) => props.theme.primaryLight};
`;

const StyledButtonContainerOptions = styled(StyledButtonContainer)`
  visibility:
  ${(props) => props.display === DISPLAY_STACK ?
      'visible' :
      'hidden'
};
`;

class StackContainer extends Component {
  constructor(props) {
    super(props);

    this.handleClickOptions = this.handleClickOptions.bind(this);
  }

  handleClickOptions() {
    this.props.stackSetPopupVisibleOptionsStack(true);
  }

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
          {!loadingStacks &&
            <Fragment>
              <StyledTextName>
                {stacks[stackFocused].name}
              </StyledTextName>
              <StyledButtonContainerOptions
                display={display}
                onClick={this.handleClickOptions} light={true}>
                <MoreVertRoundedIcon />
                <PopupOptionsStack />
              </StyledButtonContainerOptions>
            </Fragment>
          }
        </StyledContainerText>
        <StyledContainerInner display={display}>

          <StyledContainerStack display={display}>
            {componentStack}
          </StyledContainerStack>

          <PlaylistContainer />

        </StyledContainerInner>
      </StyledContainer>
    );
  }
}

StackContainer.propTypes = {
  display: PropTypes.number.isRequired,
  stacks: PropTypes.object,
  stackFocused: PropTypes.string,
  loadingStacks: PropTypes.bool.isRequired,
  loadingBlocks: PropTypes.bool.isRequired,
  stackSetPopupVisibleOptionsStack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  display: state.session.display,
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  loadingStacks: state.session.loadingStacks,
  loadingBlocks: state.session.loadingBlocks,
});

const mapDispatchToProps = {
  stackSetPopupVisibleOptionsStack,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackContainer);
