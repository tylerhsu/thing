import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchMe, shape as userShape } from '../reducers/auth';

class FetchMe extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.user.loading && !this.props.user.payload) {
      this.props.fetchMe();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = { fetchMe };

FetchMe.propTypes = {
  fetchMe: PropTypes.func,
  user: userShape.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchMe);
