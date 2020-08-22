import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import StackItem from './StackItem';
import PopupOptionsSidebar from '../popups/PopupOptionsSidebar';

import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import {StyledButtonContainer} from '../common/styles';

import {DISPLAY_STACK} from '../../util/constants';

import {
  stackSetSiderbarVisible,
  stackSetPopupVisibleStackCreate,
  stackSetPopupVisibleOptionsSidebar,
} from '../../redux/actions/stackActions';
import {dataStackCreate} from '../../redux/actions/dataActions';

const StyledContainer = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.primaryLightDull};
  overflow: hidden;
  width:
  ${(props) => props.visible ?
      '17rem' :
      '0'
};
};
  transition: all 0.25s ease-in-out;
`;

const StyledContainerList = styled(StyledContainer)`
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;

const StyledDot = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 1rem;
  margin-right: 0.75rem;
  background-color: ${(props) => props.theme.primaryDark};
`;

const StyledSeparator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
`;

const StyledContainerCloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 4rem;
`;

const StyledButtonContainerOpen = styled(StyledButtonContainer)`
  position: absolute;
  top: 0;
  color: ${(props) => props.theme.primaryLight};
  display: 
  ${(props) => props.visible && props.display === DISPLAY_STACK ?
      'block' :
      'none'
};
  transition: opacity 0.25s ease-in-out;
`;

const StyledContainerBottomButtons = styled(StyledContainerCloseButton)`
  justify-content: space-between;
`;

class Sidebar extends Component {
  constructor() {
    super();
    // TODO move this into the popup component
    this.state = {
      name: '',
      isRoutine: false,
      backgroundColor: 'default',
      durationGrace: 900,
      sidebarVisible: true,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleStackCreate = this.handleStackCreate.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
    this.handleClickToggle = this.handleClickToggle.bind(this);
  }

  handleChangeName(e) {
    this.setState({name: e.target.value});
  }

  handleStackCreate(e) {
    e.preventDefault();
    this.props.dataStackCreate({...this.state});
  }

  handleClickOptions() {
    this.props.stackSetPopupVisibleOptionsSidebar(true);
  }

  handleClickToggle() {
    // this.setState({sidebarVisible: !this.props.sidebarVisible});
    const {stackSetSiderbarVisible, sidebarVisible} = this.props;
    stackSetSiderbarVisible(!sidebarVisible);
  }

  render() {
    const {
      display,
      stacks,
      stackSetPopupVisibleStackCreate,
    } = this.props;

    let stackInbox;
    const stackItems = Object.values(stacks).map((stack) => {
      const component = <StackItem stackId={stack.id} key={stack.id} />;
      if (stack.isInbox) {
        stackInbox = component;
        return null;
      }
      return component;
    });

    const styleIconAdd = {
      fontSize: '2rem',
    };

    return (
      <Fragment>
        <StyledButtonContainerOpen
          visible={!this.props.sidebarVisible}
          display={display}
          onClick={this.handleClickToggle} >
          <ArrowRightRoundedIcon />
        </StyledButtonContainerOpen>

        <StyledContainer visible={this.props.sidebarVisible} display={display}>
          <StyledContainerCloseButton>
            <StyledButtonContainer onClick={this.handleClickToggle} >
              <ArrowLeftRoundedIcon />
            </StyledButtonContainer>
          </StyledContainerCloseButton>


          <StyledContainerList>
            {stackInbox}
            <StyledSeparator>
              <StyledDot />
              <StyledDot />
              <StyledDot />
            </StyledSeparator>
            {stackItems}
          </StyledContainerList>

          <StyledContainerBottomButtons>
            <div>
              <StyledButtonContainer
                onClick={() =>
                  stackSetPopupVisibleStackCreate(true)
                }>
                <AddRoundedIcon style={styleIconAdd} />
                Add stack
              </StyledButtonContainer>
            </div>

            <StyledButtonContainer onClick={this.handleClickOptions}>
              <SettingsRoundedIcon />
              <PopupOptionsSidebar />
            </StyledButtonContainer>
          </StyledContainerBottomButtons>
        </StyledContainer>
      </Fragment>
    );
  }
}

Sidebar.propTypes = {
  display: PropTypes.number.isRequired,
  stacks: PropTypes.object.isRequired,
  sidebarVisible: PropTypes.bool.isRequired,
  dataStackCreate: PropTypes.func.isRequired,
  popupVisibleStackCreate: PropTypes.bool.isRequired,
  stackSetSiderbarVisible: PropTypes.func.isRequired,
  stackSetPopupVisibleStackCreate: PropTypes.func.isRequired,
  stackSetPopupVisibleOptionsSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  display: state.session.display,
  stacks: state.data.stacks,
  sidebarVisible: state.stack.sidebarVisible,
  popupVisibleStackCreate: state.stack.popupVisibleStackCreate,
});

const mapDispatchToProps = {
  dataStackCreate,
  stackSetSiderbarVisible,
  stackSetPopupVisibleStackCreate,
  stackSetPopupVisibleOptionsSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
