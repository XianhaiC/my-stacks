import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PlaylistDisplay extends Component {
  render() {
    return (<div>Playlist</div>);
  }
}

PlaylistDisplay.propTypes = {
}

const mapStateToProps = (state) => ({
  // credentials: state.user.credentials
})

const mapDispatchToProps = {
  // redux actions
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDisplay);
