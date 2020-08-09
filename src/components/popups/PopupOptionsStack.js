import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

import {StyledPopupMenu, StyledMenuItem} from '../common/styles';

import {
  stackSetPopupVisibleOptionsStack,
  stackSetStackFocused,
}
  from '../../redux/actions/stackActions';
import {
  dataStackDelete,
  dataStackBlocksDelete,
} from '../../redux/actions/dataActions';

const StyledPopupMenuOptions = styled(StyledPopupMenu)`
  left: auto;
  right: 0;
`;

class PopupOptionsStack extends Component {
  constructor(props) {
    super(props);

    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  handleClickOutside(e) {
    this.props.stackSetPopupVisibleOptionsStack(false);
  }

  handleClickClear() {
    const {stackFocused, dataStackBlocksDelete} = this.props;

    this.props.dataStackBlocksDelete(stackFocused);
  }

  handleClickDelete() {
    const {stacks, stackFocused, dataStackDelete} = this.props;
    let stackInboxId = Object.values(stacks).find((stack) => {
      return stack.isInbox;
    }).id;
    this.props.stackSetStackFocused(stackInboxId);
    this.props.dataStackDelete(stackFocused);
  }

  handleClickEdit() {

  }

  render() {
    if (!this.props.popupVisibleOptionsStack) return null;
    return (
      <StyledPopupMenuOptions>
        <StyledMenuItem onClick={this.handleClickClear}>
          Clear stack
        </StyledMenuItem>
        <StyledMenuItem onClick={this.handleClickDelete}>
          Delete stack
        </StyledMenuItem>
        <StyledMenuItem onClick={this.handleClickEdit}>
          Edit stack
        </StyledMenuItem>
      </StyledPopupMenuOptions>
    );
  }
}

PopupOptionsStack.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  popupVisibleOptionsStack: PropTypes.bool.isRequired,
  stackSetPopupVisibleOptionsStack: PropTypes.func.isRequired,
  stackSetStackFocused: PropTypes.func.isRequired,
  dataStackDelete: PropTypes.func.isRequired,
  dataStackBlocksDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  popupVisibleOptionsStack: state.stack.popupVisibleOptionsStack,
});

const mapDispatchToProps = {
  stackSetPopupVisibleOptionsStack,
  stackSetStackFocused,
  dataStackDelete,
  dataStackBlocksDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    onClickOutside(PopupOptionsStack),
);
