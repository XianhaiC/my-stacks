import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  StyledPopupEntry,
  StyledError,
  StyledTitle,
  StyledForm,
  StyledInput,
  StyledButtonSubmit,
  StyledSubmitHidden,
} from '../common/styles';

import {
  sessionUserLogin,
  sessionAttemptSubmit,
} from '../../redux/actions/sessionActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  handleChangePassword(e) {
    this.setState({password: e.target.value});
  }

  handleClickSubmit(e) {
    e.preventDefault();
    this.props.sessionAttemptSubmit();
    this.props.sessionUserLogin({...this.state}, this.props.history);
  }

  render() {
    const errorMessage = <StyledError>{this.props.errors.general}</StyledError>;
    let center;

    if (this.props.loading) {
      center = <CircularProgress />;
    } else {
      center =
        <StyledForm onSubmit={this.handleClickSubmit}>
          <StyledTitle>Let's get things done today!</StyledTitle>
          <StyledInput
            type='text'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChangeEmail}
            maxLength='255'
            title="Must provide a valid email"
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
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

          <StyledButtonSubmit onClick={this.handleClickSubmit}
            solid={true}>
            OK
          </StyledButtonSubmit>
          <StyledSubmitHidden type="submit" value="Submit" />
        </StyledForm>;
    }

    return (
      <StyledPopupEntry>
        {center}
      </StyledPopupEntry>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  sessionUserLogin: PropTypes.func.isRequired,
  sessionAttemptSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loadingLanding: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loadingLanding: state.session.loadingLanding,
  errors: state.session.errors,
  loading: state.session.loading,
});

const mapDispatchToProps = {
  sessionUserLogin,
  sessionAttemptSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
