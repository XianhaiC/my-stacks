import React, { Component } from 'react';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
    this.handleClickSignup = this.handleClickSignup.bind(this);
  }

  handleChangeEmail() {
  }

  handleChangePassword() {
  }

  handleChangePasswordConfirm() {
  }

  handleClickSignup() {
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

        <input
          type="password"
          placeholder="Confirm password"
          value={this.state.passwordConfirm}
          onChange={this.handleChangePasswordConfirm}
          pattern=".{6,}"
          required />
        <button onClick={this.handleClickSignup}>Signup</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  // redux actions
}

export default connect(null, mapDispatchToProps)(Signup);
