import React, {Component} from 'react';
import {connect} from 'react-redux';

import {EMAIL_REGEX} from '../../util/constants';
import {sessionUserSignup} from '../../redux/actions/sessionActions';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
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
    this.setState({password: e.target.value});
  }

  handleChangePasswordConfirm(e) {
    this.setState({passwordConfirm: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sessionUserSignup({...this.state}, this.props.history);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  sessionUserSignup,
};

export default connect(null, mapDispatchToProps)(Signup);
