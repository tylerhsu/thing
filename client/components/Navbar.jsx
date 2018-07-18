import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = {
  container: {
    display: 'flex',
  },
  button: {
    color: 'white',
    textDecoration: 'none',
  },
};

const Navbar = ({ classes }) => (
  <AppBar className={classes.container}>
    <Toolbar>
      <Button><Link to="/" className={classes.button}>Home</Link></Button>
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Navbar);
