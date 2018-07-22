import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

import Appointments, { TYPES as APPT_TYPES } from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';
import { withStyles } from 'material-ui/styles';

import { shape as patientShape, fetchPatient } from '../reducers/patient';
import { shape as userShape } from '../reducers/auth';

const styles = {
  buttonWrapper: {
    marginTop: 30,
  },
  button: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 12,
  },
};

class PatientHome extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { patient, fetchPatient } = this.props;
    if (!patient.payload && !patient.loading) {
      fetchPatient();
    }
  }
  
  render() {
    const { user, patient, classes } = this.props;
    return (
      <div className="container">
        <h2>Welcome back, {user.payload.firstName} {user.payload.lastName}.</h2>
        <div className="profile">
          {patient.payload && patient.payload.id && 
            <div>
              <h3>Your Profile</h3>
              <PatientDetails patient={patient.payload} />
            </div>
          }
          <div className={classes.buttonWrapper}>
            <Button variant="raised" color="primary">
              <Link to="/request-appointment" className={classes.button}>Request Appointment</Link>
            </Button>
          </div>
        </div>
        <div>
          <h3>Upcoming Appointments</h3>
          <Appointments type={APPT_TYPES.UPCOMING} viewer={ROLES.PATIENT} />
          <h3>Pending Appointments</h3>
          <Appointments type={APPT_TYPES.PENDING} viewer={ROLES.PATIENT} />
          <h3>Past Appointments</h3>
          <Appointments type={APPT_TYPES.PAST} viewer={ROLES.PATIENT} /> 
        </div>
        <div>
          <h3>Your Files</h3>
          <Files />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, patient }) => ({ user, patient });

const mapDispatchToProps = { fetchPatient };

PatientHome.propTypes = {
  user: userShape.isRequired,
  patient: patientShape.isRequired,
  fetchPatient: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientHome));
