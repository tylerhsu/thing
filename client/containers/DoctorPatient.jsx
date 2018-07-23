import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Appointments, { TYPES as APPT_TYPES } from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';

import { shape as userShape } from '../reducers/auth';
import { shape as patientShape, fetchPatient } from '../reducers/patient';

class Patient extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchPatient(this.props.match.params.id);
  }

  render() {
    const { user, patient, pendingAppts, upcomingAppts, pastAppts } = this.props;
    if (patient.payload && !patient.error) {
      return (
        <div className="container">
          <h2>{patient.payload.firstName} {patient.payload.lastName}</h2>
          <PatientDetails patient={patient.payload} />
          <div>
            <h3>Appointment Requests</h3>
            <Appointments type={APPT_TYPES.PENDING} viewer={ROLES.DOCTOR} doctorId={user.payload.id} />
            <h3>Upcoming Appointments</h3>
            <Appointments type={APPT_TYPES.UPCOMING} viewer={ROLES.DOCTOR} doctorId={user.payload.id} />
            <h3>Past Appointments</h3>
            <Appointments type={APPT_TYPES.PAST} viewer={ROLES.DOCTOR} doctorId={user.payload.id} />
          </div>
          <div>
            <h3>Patient Files</h3>
            <Files mayDelete={true} />
          </div>
        </div>
      );
    } else if (patient.error) {
      return (
        <div className="container">{patient.payload.message}</div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = ({ user, patient }) => ({ user, patient });

const mapDispatchToProps = { fetchPatient };

Patient.propTypes = {
  user: userShape.isRequired,
  patient: patientShape.isRequired,
  fetchPatient: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
