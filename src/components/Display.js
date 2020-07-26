import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PlaylistDisplay from './playlist/PlaylistDisplay';
import StackDisplay from './stack/StackDisplay';

import {
  DISPLAY_PLAYLIST,
  DISPLAY_STACK,
} from '../util/constants';

class Display extends Component {
  render() {
    /*
    let currentDisplay;

    switch (this.props.display) {
      case DISPLAY_PLAYLIST: currentDisplay = <PlaylistDisplay />; break;
      case DISPLAY_STACK: currentDisplay = <StackDisplay />; break;
      default: currentDisplay = <StackDisplay />; break;
    }
    */

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
