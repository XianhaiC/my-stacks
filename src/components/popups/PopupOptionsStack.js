import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

import {StyledPopupMenu, StyledMenuItem} from '../common/styles';

import {stackSetPopupVisibleOptionsStack}
  from '../../redux/actions/stackActions';

const StyledPopupMenuOptions = styled(StyledPopupMenu)`
  left: auto;
  right: 0;
`;

class PopupOptionsStack extends Component {
  handleClickOutside(e) {
    this.props.stackSetPopupVisibleOptionsStack(false);
  }

  render() {
    if (!this.props.popupVisibleOptionsStack) return null;
    return (
      <StyledPopupMenuOptions>
        <StyledMenuItem>
          Clear stack
        </StyledMenuItem>
        <StyledMenuItem>
          Delete stack
        </StyledMenuItem>
        <StyledMenuItem>
          Edit stack
        </StyledMenuItem>
      </StyledPopupMenuOptions>
    );
  }
}

PopupOptionsStack.propTypes = {
  popupVisibleOptionsStack: PropTypes.bool.isRequired,
  stackSetPopupVisibleOptionsStack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  popupVisibleOptionsStack: state.stack.popupVisibleOptionsStack,
});

export default connect(mapStateToProps, {stackSetPopupVisibleOptionsStack})(
    onClickOutside(PopupOptionsStack),
);
