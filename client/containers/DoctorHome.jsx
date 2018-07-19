import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

import { shape as userShape } from '../reducers/auth';
import { shape as patientsShape, fetchPatients } from '../reducers/patients';

import PatientList from '../components/PatientList';

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
  error: {
    color: 'red'
  }
};

class DoctorHome extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.patients.loading && !this.props.patients.payload) {
      this.props.fetchPatients();
    }
  }

  render() {
    const { user, patients, classes } = this.props;
    return (
      <div className="container">
        <h2 className={classes.welcomeMessage}>Welcome back, Dr. {user.payload.lastName}.</h2>
        <div className={classes.patients}>
          { patients.payload && patients.payload.length && !patients.error &&
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
              <PatientList patients={patients.payload} />
            </div>
          }
          { patients.payload && !patients.payload.length && !patients.error &&
            <div>You don\'t have any patients.</div>
          }
          { patients.error &&
            <div className={classes.error}>There was an error retrieving patients</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({user, patients}) => ({
    user,
    patients
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatients: () => {
    dispatch(fetchPatients());
  },
});

DoctorHome.propTypes = {
  user: userShape.isRequired,
  patients: patientsShape.isRequired,
  fetchPatients: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DoctorHome));
