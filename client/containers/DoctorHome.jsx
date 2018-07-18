import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

import PatientList from '../components/PatientList';

import { patients } from '../dummyData';

const styles = {
  welcomeMessage: {
    color: 'black',
  },
  searchWrapper: {
    padding: '5px 10px',
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 7,
  },
  search: {
    fontSize: 11,
  },
  patients: {
    marginTop: 40,
  },
};

const DoctorHome = ({ classes }) => (
  <div className="container">
    <h2 className={classes.welcomeMessage}>Welcome back, Dr. McGonagall.</h2>
    <div className={classes.patients}>
      { patients ?
        <div>
          <Card className={classes.searchWrapper}>
            <Icon className={classes.searchIcon}>search</Icon>
            <TextField
              name="search"
              placeholder="Search patients"
              className={classes.search}
              inputProps={{ style: { fontSize: 12 } }}
            />
          </Card>
          <PatientList patients={patients} />
        </div>
          : <div>{'You don\'t have any patients.'}</div>
        }
    </div>
  </div>
);

DoctorHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DoctorHome);
