import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {StyledPopup, StyledMenuItem, StyledButton} from '../common/styles';

import {BUTTON_SOLID, STACK_COLORS} from '../../util/constants';

const StyledTitle = styled(StyledMenuItem)`
  padding: 1rem 2rem 0.5rem 2rem;
  &:hover {
    background: none;
    cursor: default;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.primaryLightDull};
  box-sizing: border-box;
  border: 0;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  padding: 0.8rem 2rem;
  color: ${(props) => props.theme.midtone};
`;

const StyledButtonCreate = styled(StyledButton)`
  align-self: center;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const StyledContainerColor = styled.div`
  display: flex;
  justify-content: start;
  padding: 0 2rem;
  align-items: center;
  width: 100%;
`;

const StyledColorOption = styled.a`
  box-sizing: border-box;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 1rem;
  margin-right: 0.5rem;
  margin-top: 0.3rem;
  background: ${(props) => props.selected ?
      'none' :
      props.color
};
  border: ${(props) => props.selected ?
      `0.25rem solid ${props.color}` :
      'none'
};

  &:hover {
    cursor: pointer;
  }
`;

class PopupStack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      isRoutine: false,
      durationGrace: 900,
      backgroundColor: props.backgroundColor,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleClickColor = this.handleClickColor.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  handleChangeName(e) {
    this.setState({name: e.target.value});
  }

  handleClickColor(color) {
    this.setState({backgroundColor: color});
  }

  handleClickSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    // this.setState({name: '', backgroundColor: STACK_COLORS[0]});
  }

  render() {
    const {title, disableName} = this.props;

    const componentsColor = STACK_COLORS.map((color) => {
      const colorNew = color;
      const boundClickColor = this.handleClickColor.bind(this, colorNew);

      return (
        <StyledColorOption
          key={color}
          color={color}
          selected={color === this.state.backgroundColor}
          onClick={boundClickColor}
        />
      );
    });

    return (
      <StyledPopup>
        <StyledForm onSubmit={this.handleStackCreate}>
          <StyledTitle>{title}</StyledTitle>
          <StyledInput
            type="text"
            placeholder="Stack name"
            value={this.state.name}
            onChange={this.handleChangeName}
            maxLength="255"
            disabled={disableName}
            required />

          <StyledTitle>Background color</StyledTitle>
          <StyledContainerColor>
            {componentsColor}
          </StyledContainerColor>

          <StyledButtonCreate onClick={this.handleClickSubmit}
            solid={true}>
            OK
          </StyledButtonCreate>
        </StyledForm>
      </StyledPopup>
    );
  }
}

PopupStack.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disableName: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PopupStack;
