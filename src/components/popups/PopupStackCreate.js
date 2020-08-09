import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

import {StyledPopup, StyledMenuItem, StyledButton} from '../common/styles';

import {
  stackSetPopupVisibleStackCreate,
} from '../../redux/actions/stackActions';
import {dataStackCreate} from '../../redux/actions/dataActions';

import {BUTTON_SOLID, STACK_COLORS} from '../../util/constants';

const StyledTitle = styled(StyledMenuItem)`
  padding: 1rem 2rem 0.5rem 2rem;
  &:hover {
    background: none;
    cursor: default;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

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
`

const StyledButtonCreate = styled(StyledButton)`
  align-self: center;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`

const StyledContainerColor = styled.div`
  display: flex;
  justify-content: start;
  padding: 0 2rem;
  align-items: center;
  width: 100%;
`

const StyledColorOption = styled.a`
  box-sizing: border-box;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 1rem;
  margin-right: 0.5rem;
  margin-top: 0.3rem;
  background: ${props => props.selected
      ? 'none'
      : props.color
      };
  border: ${props => props.selected
      ? `0.25rem solid ${props.color}`
      : 'none'
      };

  &:hover {
    cursor: pointer;
  }
`

class PopupStackCreate extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isRoutine: false,
      durationGrace: 900,
      backgroundColor: STACK_COLORS[0],
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleStackCreate = this.handleStackCreate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickColor = this.handleClickColor.bind(this);
  }

  handleClickOutside(e) {
    this.props.stackSetPopupVisibleStackCreate(false);
  }

  handleChangeName(e) {
    this.setState({name: e.target.value});
  }

  handleStackCreate(e) {
    e.preventDefault();
    const {name} = this.state;
    if (!name || name === '') return;
    this.props.dataStackCreate({...this.state});
    this.props.stackSetPopupVisibleStackCreate(false);
    this.setState({name: '', backgroundColor: STACK_COLORS[0]});
  }

  handleClickOutside(e) {
    this.props.stackSetPopupVisibleStackCreate(false);
  }

  handleClickColor(color) {
    this.setState({backgroundColor: color});
  }

  render() {
    if (!this.props.popupVisibleStackCreate) return null;

    let componentsColor = STACK_COLORS.map(color => {
      const colorNew = color;
      const boundClickColor = this.handleClickColor.bind(this, colorNew);

      return (
        <StyledColorOption
          key={color}
          color={color}
          selected={color === this.state.backgroundColor}
          onClick={boundClickColor}
        />
      )
    });

    return (
      <StyledPopup>
        <StyledForm onSubmit={this.handleStackCreate}>
          <StyledTitle>Add stack</StyledTitle>
          <StyledInput
          type="text"
          placeholder="Stack name"
          value={this.state.name}
          onChange={this.handleChangeName}
          maxLength="255"
          required />

          <StyledTitle>Background color</StyledTitle>
          <StyledContainerColor>
            {componentsColor}
          </StyledContainerColor>

          <StyledButtonCreate onClick={this.handleStackCreate} type={BUTTON_SOLID}>
            Create
          </StyledButtonCreate>
        </StyledForm>
      </StyledPopup>
    );
  }
}

PopupStackCreate.propTypes = {
  stacks: PropTypes.object.isRequired,
  dataStackCreate: PropTypes.func.isRequired,
  popupVisibleStackCreate: PropTypes.bool.isRequired,
  stackSetPopupVisibleStackCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  popupVisibleStackCreate: state.stack.popupVisibleStackCreate,
});

const mapDispatchToProps = {
  dataStackCreate,
  stackSetPopupVisibleStackCreate,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    onClickOutside(PopupStackCreate)
);
