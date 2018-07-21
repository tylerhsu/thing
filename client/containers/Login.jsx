import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import { login, shape as userShape } from '../reducers/auth';

const styles = {
  textField: {
    marginBottom: 20,
  },
  button: {
    height: 40,
    color: 'white',
    fontWeight: 100,
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(type, value) {
    this.setState({ [type]: value });
  }

  render() {
    const { attemptLogin, user, location, classes } = this.props;

    if (user.payload && user.payload.id) {
      return (
        <Redirect to={location && location.state && location.state.from ? location.state.from : '/'} />
      );
    }
    
    return (
      <div className="login-container">
        <div>
          <h2 className="login-header">Log in</h2>
        </div>
        <form className="login-form-wrapper">
          <div>
            <TextField
              name="email"
              placeholder="Email address"
              value={this.state.email}
              onChange={(evt) => {
                this.onInputChange('email', evt.target.value);
              }}
              className={classes.textField}
              autoFocus
              fullWidth
            />
          </div>
          <div>
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(evt) => {
                this.onInputChange('password', evt.target.value);
              }}
              className={classes.textField}
              fullWidth
            />
          </div>
          <div>
            <Button
              onClick={(evt) => {
                evt.preventDefault();
                attemptLogin(this.state.email, this.state.password);
              }}
              type="submit"
              variant="raised"
              className={classes.button}
              color="primary"
              fullWidth
            >
              Log in
            </Button>
          </div>
        </form>
        { user.error &&
          <div className={classes.error}>{user.payload.response && user.payload.response.data || user.payload.message}</div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  attemptLogin: login
};

Login.propTypes = {
  attemptLogin: PropTypes.func,
  user: userShape.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
