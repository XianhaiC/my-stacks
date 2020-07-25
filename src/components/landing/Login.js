import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {EMAIL_REGEX} from '../../util/constants';
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

          <input type="submit" value="Submit"/>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  sessionUserLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loadingLanding: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loadingLanding: state.session.loadingLanding,
});

const mapDispatchToProps = {
  sessionUserLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
