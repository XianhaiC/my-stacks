import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  handleChangeEmail() {
  }

  handleChangePassword() {
  }

  handleClickLogin() {
    this.props.sessionUserLogin({}, this.props.history);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChangeEmail}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          maxLength="255"
          title="Must provide a valid email"
          required />

        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChangePassword}
          pattern=".{6,}"
          title="Must contain at least 6 or more characters"
          required />

        <button onClick={this.handleClickLogin}>Login</button>
      </div>
    );
  }
}

Login.propTypes = {
  sessionUserLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  sessionUserLogin,
};

export default connect(null, mapDispatchToProps)(Login);
