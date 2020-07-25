import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  FOCUS_NONE,
} from '../../util/constants';

class BlockItem extends Component {
  constructor() {
    super();

    this.state = {
      hover: false,
      modTitle: null,
      modDescription: null,
      modDurationWork: null,
      modDurationBreak: null,
      focusState: FOCUS_NONE,
    };
  }

  render() {
    const {blocks, blockId} = this.props;

    return (
      <div>
        {blocks[blockId].task}
      </div>
    );
  }
}

BlockItem.propTypes = {
  blocks: PropTypes.object.isRequired,
  blockId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.data.blocks,
});

export default connect(mapStateToProps)(BlockItem);
