import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Display extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

Display.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  // credentials: state.user.credentials
})

const mapDispatchToProps = {
  // redux actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
