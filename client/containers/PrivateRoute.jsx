import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { shape as userShape } from '../reducers/auth';

const PrivateRoute = ({ component: Component, requiredRole, user, ...rest }) => (
  <Route
  {...rest}
  render={(props) => {
    if (user.loading) {
      return null;
    } else if (user.payload && user.payload.id) {
      if (requiredRole && user.payload.role !== requiredRole) {
        return <div className="container">You don't have permission to access this page.</div>;
      } else {
        return <Component {...props} />;
      }
    } else {
      return (
        <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }}
        />
      );
    }
  }}
  />
);

const mapStateToProps = ({ user }) => ({ user });

PrivateRoute.propTypes = {
  user: userShape,
  requiredRole: PropTypes.string
};

export default connect(mapStateToProps)(PrivateRoute);
