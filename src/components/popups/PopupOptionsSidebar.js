import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

import {StyledPopupMenu, StyledMenuItem} from '../common/styles';

import {stackSetPopupVisibleOptionsSidebar}
  from '../../redux/actions/stackActions';

const StyledPopupMenuOptions = styled(StyledPopupMenu)`
  left: auto;
  top: auto;
  right: 0;
  bottom: 0;
`;

class PopupOptionsSidebar extends Component {
  handleClickOutside(e) {
    this.props.stackSetPopupVisibleOptionsSidebar(false);
  }

  render() {
    if (!this.props.popupVisibleOptionsSidebar) return null;
    return (
      <StyledPopupMenuOptions>
        <StyledMenuItem>
          Log out
        </StyledMenuItem>
        <StyledMenuItem>
          Github
        </StyledMenuItem>
      </StyledPopupMenuOptions>
    );
  }
}

PopupOptionsSidebar.propTypes = {
  popupVisibleOptionsSidebar: PropTypes.bool.isRequired,
  stackSetPopupVisibleOptionsSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  popupVisibleOptionsSidebar: state.stack.popupVisibleOptionsSidebar,
});

export default connect(mapStateToProps, {stackSetPopupVisibleOptionsSidebar})(
    onClickOutside(PopupOptionsSidebar),
);
