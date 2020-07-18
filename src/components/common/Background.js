import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Background = (props) => {
  return (
    <Fragment>
      { props.children }
    </Fragment>
  );
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
