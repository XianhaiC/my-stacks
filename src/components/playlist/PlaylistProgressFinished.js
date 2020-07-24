import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PlaylistProgressFinished = (props) => {
  return (
    <div>{props.blocks[props.blockId].task}</div>
  );
};

PlaylistProgressFinished.propTypes = {
  blockId: PropTypes.string.isRequired,
  blocks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
});

export default connect(mapStateToProps)(PlaylistProgressFinished);
