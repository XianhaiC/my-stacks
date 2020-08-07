import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  StyledWrapper,
  StyledInput,
  StyledSubmit,
  StyledForm,
  StyledGreeting,
  StyledCaption,
  StyledError,
  StyledArea,
} from '../common/styles';

import {sessionUserSignup} from '../../redux/actions/sessionActions';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      passwordsMatch: true,
      passwordError: '',
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm =
      this.handleChangePasswordConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  handleChangePassword(e) {
    const {passwordConfirm} = this.state;
    const passwordsMatch = e.target.value === passwordConfirm ||
      passwordConfirm.length === 0;

    // create the password requirements message
    const minLengthRegex = new RegExp('^.{6,}$');
    const minDigitRegex = new RegExp('(?=.*[0-9])');
    const minUpperRegex = new RegExp('(?=.*[A-Z])');
    const minLowerRegex = new RegExp('(?=.*[a-z])');
    const noSpacesRegex = new RegExp('(?=\\S+$)');
    const displayMinLengthError = !minLengthRegex.test(e.target.value);
    const displayMinDigitError = !minDigitRegex.test(e.target.value);
    const displayMinUpperError = !minUpperRegex.test(e.target.value);
    const displayMinLowerError = !minLowerRegex.test(e.target.value);
    const displayNoSpacesError = !noSpacesRegex.test(e.target.value);

    // for the message, just add new lines!
    let passwordError = '';

    if (displayMinLengthError) {
      passwordError += 'At least 6 characters long. ';
    }
    if (displayMinDigitError) {
      passwordError += 'At least 1 digit. ';
    }
    if (displayMinUpperError) {
      passwordError += 'At least one upper case letter. ';
    }
    if (displayMinLowerError) {
      passwordError += 'At least one lower case letter. ';
    }
    if (displayNoSpacesError) {
      passwordError += 'No white spaces. ';
    }

    this.setState({password: e.target.value, passwordsMatch, passwordError});
  }

  handleChangePasswordConfirm(e) {
    const {password} = this.state;
    const passwordsMatch = password === e.target.value;
    this.setState({passwordsMatch, passwordConfirm: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const {passwordsMatch, passwordError} = this.state;
    if (passwordsMatch && passwordError.length === 0) {
      this.props.sessionUserSignup({...this.state}, this.props.history);
    }
  }

  render() {
    let duplicateEmailMessage;
    if (Object.keys(this.props.errors).length) {
      duplicateEmailMessage =
        <StyledError>Email is already in use</StyledError>;
    }
    let passwordsMatchingMessage;
    if (!this.state.passwordsMatch) {
      passwordsMatchingMessage =
        <StyledError>Passwords do not match</StyledError>;
    }
    const passwordRequirementsMessage =
      <StyledError>{this.state.passwordError}</StyledError>;

    return (
      <StyledArea>
        <StyledWrapper>
          <StyledGreeting>Welcome!</StyledGreeting>
          <StyledCaption>Let's get things done today.</StyledCaption>
          <StyledForm onSubmit={this.handleSubmit}>
            <StyledInput
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              maxLength="255"
              title="Must provide a valid email"
              required />

            <StyledInput
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangePassword}
              title="Input a valid password that meets the requirements"
              required />

            <StyledInput
              type="password"
              placeholder="Confirm password"
              value={this.state.passwordConfirm}
              onChange={this.handleChangePasswordConfirm}
              required />
            {passwordRequirementsMessage}
            {passwordsMatchingMessage}
            {duplicateEmailMessage}
            <StyledSubmit type="submit" value="Submit" />
          </StyledForm>
        </StyledWrapper>
      </StyledArea>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
  sessionUserSignup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.session.errors,
});

const mapDispatchToProps = {
  sessionUserSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
