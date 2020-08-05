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
} from '../common/styles';

import {sessionUserLogin} from '../../redux/actions/sessionActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  handleChangePassword(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sessionUserLogin({...this.state}, this.props.history);
  }

  render() {
    if (this.props.loadingLanding) return (<h3>Loading</h3>);
    console.log(this.props.errors.general);

    let errorMessage = <StyledError></StyledError>;
    if (Object.keys(this.props.errors).length !== 0) {
      errorMessage = <StyledError>{this.props.errors.general}</StyledError>;
    }

    return (
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
            pattern=".{6,}"
            title="Must contain at least 6 or more characters"
            required />
          {errorMessage}
          <StyledSubmit type="submit" value="Login" />

        </StyledForm>
      </StyledWrapper >
    );
  }
}

Login.propTypes = {
  sessionUserLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loadingLanding: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loadingLanding: state.session.loadingLanding,
  errors: state.session.errors,
});

const mapDispatchToProps = {
  sessionUserLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
