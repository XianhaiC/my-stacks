import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

import { StyledPopupMenu, StyledMenuItem } from '../common/styles';
import { REPOSITORY_URL } from '../../util/constants';

import { stackSetPopupVisibleOptionsSidebar }
  from '../../redux/actions/stackActions';

import { sessionUserLogout } from '../../redux/actions/sessionActions';


const StyledPopupMenuOptions = styled(StyledPopupMenu)`
  left: auto;
  top: auto;
  right: 0;
  bottom: 0;
`;

class PopupOptionsSidebar extends Component {
  constructor(props) {
    super(props);

    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  handleClickOutside(e) {
    this.props.stackSetPopupVisibleOptionsSidebar(false);
  }

  handleClickGitHub() {
    window.open(REPOSITORY_URL, '_blank');
  }

  handleClickLogout(e) {
    console.log('logging out');
    this.props.sessionUserLogout();
    window.location.reload();
  }

  render() {
    if (!this.props.popupVisibleOptionsSidebar) return null;
    return (
      <StyledPopupMenuOptions>
        <StyledMenuItem onClick={this.handleClickLogout}>
          Log out
        </StyledMenuItem>
        <StyledMenuItem onClick={this.handleClickGitHub}>
          GitHub
        </StyledMenuItem>
      </StyledPopupMenuOptions>
    );
  }
}

PopupOptionsSidebar.propTypes = {
  popupVisibleOptionsSidebar: PropTypes.bool.isRequired,
  stackSetPopupVisibleOptionsSidebar: PropTypes.func.isRequired,
  sessionUserLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  popupVisibleOptionsSidebar: state.stack.popupVisibleOptionsSidebar,
});

const mapDispatchToProps = {
  stackSetPopupVisibleOptionsSidebar,
  sessionUserLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  onClickOutside(PopupOptionsSidebar),
);
