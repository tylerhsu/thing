import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../containers/Login';

import { shape as userShape } from '../reducers/auth';

const Home = ({ user }) => (
  <Route
    path="/"
    render={(props) => {
      if (user.payload && user.payload.role === 'doctor') {
        return <Redirect to="/dashboard" />;
      } else if (user.payload && user.payload.role === 'patient') {
        return <Redirect to="/account" />;
      }
      return <Login {...props} />;
    }}
  />
);

const mapStateToProps = ({ user }) => ({ user });

Home.propTypes = {
  user: userShape
};

export default connect(mapStateToProps)(Home);
