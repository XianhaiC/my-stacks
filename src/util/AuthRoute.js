import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Component is the actual referenceable variable
// component is the original name of the field
// the reason why we need to rename it is because react expects
// component names to be capitalized
// below is the syntax for renaming when destructuring
const AuthRoute = ({
  component: Component,
  authenticated,
  auth,
  redirect,
  ...rest
}) => (
  <Route
    // rest is simply the other props passed into AuthRoute, like exact, etc
    {...rest}
    // props here is being passed onto Component simply
    // not sure if needed
    render={
      (props) => authenticated === auth ?
        <Redirect to={redirect} /> :
        <Component {...props} />
    }
  />
)

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated
})

export default connect(mapStateToProps)(AuthRoute);
