import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside';

import PopupStack from './PopupStack';

import {
  stackSetPopupVisibleStackCreate,
} from '../../redux/actions/stackActions';
import {dataStackCreate} from '../../redux/actions/dataActions';

import {STACK_COLORS} from '../../util/constants';

class PopupStackCreate extends Component {
  constructor() {
    super();

    this.handleStackCreate = this.handleStackCreate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleStackCreate(state) {
    const {name} = state;
    if (!name || name === '') return;
    this.props.dataStackCreate({...state});
    this.props.stackSetPopupVisibleStackCreate(false);
  }

  handleClickOutside(e) {
    this.props.stackSetPopupVisibleStackCreate(false);
  }

  render() {
    if (!this.props.popupVisibleStackCreate) return null;

    return (
      <PopupStack title={'Add stack'}
        name={''}
        backgroundColor={STACK_COLORS[0]}
        handleSubmit={this.handleStackCreate}
      />
    );
  }
}

PopupStackCreate.propTypes = {
  stacks: PropTypes.object.isRequired,
  dataStackCreate: PropTypes.func.isRequired,
  popupVisibleStackCreate: PropTypes.bool.isRequired,
  stackSetPopupVisibleStackCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  popupVisibleStackCreate: state.stack.popupVisibleStackCreate,
});

const mapDispatchToProps = {
  dataStackCreate,
  stackSetPopupVisibleStackCreate,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    onClickOutside(PopupStackCreate),
);
