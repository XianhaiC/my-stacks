import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import StackDisplay from './stack/StackDisplay';

class Display extends Component {
  render() {
    return <StackDisplay />;
  }
}

Display.propTypes = {
  display: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  display: state.session.display,
});

export default connect(mapStateToProps)(Display);
