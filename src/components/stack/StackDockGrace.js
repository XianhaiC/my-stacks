import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import {dataStackUpdate} from '../../redux/actions/dataActions';

import {StyledClickCatcher} from '../common/styles';

import {
  FOCUS_NONE, FOCUS_EDIT,
} from '../../util/constants';

const StyledContainer = styled.div`
  position: relative;
`

const StyledText = styled.input`
  border 0;
  font-size: 1rem;
  font-weight: 600;
  width: 4.25rem;
  margin: 0;
  border-radius: 0.3rem;
  text-align: center;
  padding: 0.8rem 2rem;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primaryDark};
  background: none;

  &:focus {
    outline: none;
  }

  box-shadow:
  ${(props) =>
  props.mode === FOCUS_EDIT ?
      '0px 0px 20px rgba(0, 0, 0, 0.15)' :
      'none'
};
  border:
  ${(props) => props.mode === FOCUS_EDIT ?
      `0.11rem solid ${props.theme.secondary}` :
      'none'
};
`;

class StackDockGrace extends Component {
  constructor() {
    super();

    this.state = {
      durationGrace: 0,
      focusState: FOCUS_NONE,
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleChangeDurationGrace = this.handleChangeDurationGrace.bind(this);
    this.save = this.save.bind(this);
  }

  handleClickOutside(e) {
    if (this.state.focusState === FOCUS_EDIT) {
      this.setState({focusState: FOCUS_NONE});
      this.save();
    }
  }

  handleClickEdit() {
    const {stacks, stackFocused} = this.props;
    this.setState({
      focusState: FOCUS_EDIT,
      durationGrace: stacks[stackFocused].durationGrace / 60,
    });
  }

  handleChangeDurationGrace(e) {
    this.setState(
        {durationGrace: e.target.value},
    );
  }

  save() {
    const {stacks, stackFocused, dataStackUpdate} = this.props;

    dataStackUpdate(stackFocused, {
      ...stacks[stackFocused],
      durationGrace: this.state.durationGrace * 60,
    });
  }

  render() {
    const {stacks, stackFocused} = this.props;
    return (
      <StyledContainer onClick={this.handleClickEdit}>
        <StyledText
          mode={this.state.focusState}
          type="text"
          placeholder="Grace"
          value={this.state.focusState === FOCUS_EDIT ?
              this.state.durationGrace :
              `${stacks[stackFocused].durationGrace / 60}m`
          }
          onChange={this.handleChangeDurationGrace}
          maxLength="2"
          required
          disabled={this.state.focusState !== FOCUS_EDIT}
        />

        {this.state.focusState !== FOCUS_EDIT &&
          <StyledClickCatcher onClick={this.handleClickFocus}/>
        }
      </StyledContainer>
    );
  }
}

StackDockGrace.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  dataStackUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
});

export default
connect(mapStateToProps, {dataStackUpdate})(onClickOutside(StackDockGrace));
