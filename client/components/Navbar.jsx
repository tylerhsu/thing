import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { shape as userShape } from '../reducers/auth';

const styles = {
  container: {
    display: 'flex',
  },
  button: {
    color: 'white',
    textDecoration: 'none',
  },
};

const Navbar = ({ user, classes }) => (
  <AppBar className={classes.container}>
    <Toolbar>
      <Button><Link to="/" className={classes.button}>Home</Link></Button>
      { user.payload && user.payload.id &&
        <Button><a href="/api/auth/logout" className={classes.button}>Log out</a></Button>
      }
    </Toolbar>
  </AppBar>
);

const mapStateToProps = ({ user }) => ({ user });

Navbar.propTypes = {
  user: userShape,
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(Navbar));
