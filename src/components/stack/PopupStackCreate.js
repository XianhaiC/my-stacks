import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {StyledPopup} from '../common/styles';

import {
  stackSetPopupVisibleStackCreate,
} from '../../redux/actions/stackActions';
import {dataStackCreate} from '../../redux/actions/dataActions';

class PopupStackCreate extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isRoutine: false,
      backgroundColor: 'default',
      durationGrace: 900,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleStackCreate = this.handleStackCreate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleChangeName(e) {
    this.setState({name: e.target.value});
  }

  handleStackCreate(e) {
    e.preventDefault();
    this.props.dataStackCreate({...this.state});
  }

  handleClickOutside(e) {
    this.props.stackSetPopupVisibleStackCreate(false);
  }

  render() {
    if (!this.props.popupVisibleStackCreate) return null;
    return (
      <StyledPopup>
        <form onSubmit={this.handleStackCreate}>
          <input
            type="text"
            placeholder="Stack name"
            value={this.state.name}
            onChange={this.handleChangeName}
            maxLength="255"
            required />
          <input type="submit" value="Add stack"/>
        </form>
      </StyledPopup>
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

export default connect(mapStateToProps, mapDispatchToProps)(PopupStackCreate);
