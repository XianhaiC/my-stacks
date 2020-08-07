import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import styled from 'styled-components';
import {StyledButton} from '../components/common/styles';

const StyledLinkButton = styled(StyledButton)`
  color: white;
  margin: 1rem;
  &:hover{
    cursor: pointer;
  }
`;

export const LinkButton = (props) => {
  const {
    history,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;
  return (
    <StyledLinkButton type={props.type}
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event);
        history.push(to);
      }}
    />
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default withRouter(LinkButton);
