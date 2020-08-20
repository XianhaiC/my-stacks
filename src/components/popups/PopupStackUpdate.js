
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside';

import PopupStack from './PopupStack';

import {
  stackSetPopupVisibleStackUpdate,
} from '../../redux/actions/stackActions';
import {dataStackUpdate} from '../../redux/actions/dataActions';

class PopupStackUpdate extends Component {
  constructor() {
    super();

    this.handleStackUpdate = this.handleStackUpdate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleStackUpdate(state) {
    const {name} = state;
    const {stacks, stackFocused, dataStackUpdate} = this.props;
    if (!name || name === '') return;
    dataStackUpdate(stackFocused, {
      ...stacks[stackFocused],
      'name': state.name,
      'backgroundColor': state.backgroundColor,
    });
    this.props.stackSetPopupVisibleStackUpdate(false);
  }

  handleClickOutside(e) {
    this.props.stackSetPopupVisibleStackUpdate(false);
  }

  render() {
    const {stacks, stackFocused, popupVisibleStackUpdate} = this.props;
    if (stackFocused === null || !popupVisibleStackUpdate) return null;

    const stack = stacks[stackFocused];

    return (
      <PopupStack title={'Edit stack'}
        name={stack.name}
        backgroundColor={stack.backgroundColor}
        handleSubmit={this.handleStackUpdate}
        disableName={stack.isInbox}
      />
    );
  }
}

PopupStackUpdate.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string,
  dataStackUpdate: PropTypes.func.isRequired,
  popupVisibleStackUpdate: PropTypes.bool.isRequired,
  stackSetPopupVisibleStackUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  popupVisibleStackUpdate: state.stack.popupVisibleStackUpdate,
});

const mapDispatchToProps = {
  dataStackUpdate,
  stackSetPopupVisibleStackUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    onClickOutside(PopupStackUpdate),
);
