import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PlaylistProgressRemaining = (props) => {
  return (
    <div>{props.blocks[props.blockId].task}</div>
  );
};

PlaylistProgressRemaining.propTypes = {
  blockId: PropTypes.string.isRequired,
  blocks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
});

export default connect(mapStateToProps)(PlaylistProgressRemaining);
