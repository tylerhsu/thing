import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import { login } from '../reducers/auth';

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
    const { attemptLogin, classes } = this.props;
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
              variant="raised"
              className={classes.button}
              color="primary"
              fullWidth
            >
              Log in
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (email, password) => {
    dispatch(login(email, password));
  },
});

Login.propTypes = {
  attemptLogin: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default connect(() => ({}), mapDispatchToProps)(withStyles(styles)(Login));
