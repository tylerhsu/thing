import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Appointments from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';

import { shape as patientShape, fetchPatient } from '../reducers/patient';
import { shape as appointmentsShape } from '../reducers/appointments';

import { files } from '../dummyData';

class Patient extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchPatient(this.props.match.params.id);
  }

  render() {
    const { patient, pendingAppts, upcomingAppts, pastAppts } = this.props;
    if (patient.payload && !patient.error) {
      return (
        <div className="container">
          <h2>{patient.payload.firstName} {patient.payload.lastName}</h2>
          <PatientDetails patient={patient.payload} />
          <div>
            <h3>Appointment Requests</h3>
            { pendingAppts && pendingAppts.length ?
              <Appointments appointments={pendingAppts} /> :
              'No pending appointments'
            }
          </div>
          <div>
            <h3>Upcoming Appointments</h3>
            { upcomingAppts && upcomingAppts.length ?
              <Appointments appointments={upcomingAppts} /> :
              'No upcoming appointments'
            }
          </div>
          <div>
            <h3>Past Appointments</h3>
            { pastAppts && pastAppts.length ?
              <Appointments appointments={pastAppts} /> :
              'No past appointments'
            }
          </div>
          <div>
            <h3>Patient Files</h3>
            <Files files={files} />
          </div>
        </div>
      );
    } else if (patient.error) {
      return (
        <div className="container">{patient.payload.response.data || patient.payload.message}</div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = ({ patient, appointments }) => {
  let appts = appointments.payload && Array.isArray(appointments.payload) ? appointments.payload : [];
  return {
    patient,
    appointments,
    pendingAppts: appts.filter((appt) => appt.status === STATUSES.PENDING),
    upcomingAppts: appts.filter((appt) => appt.status === STATUSES.CONFIRMED && new Date(appt.datetime) > new Date()),
    pastAppts: appts.filter((appt) => appt.status === STATUSES.CONFIRMED && new Date(appt.datetime) <= new Date())
  };
};

const mapDispatchToProps = { fetchPatient };

Patient.propTypes = {
  patient: patientShape.isRequired,
  appointments: appointmentsShape.isRequired,
  pendingAppts: PropTypes.arrayOf(PropTypes.object),
  upcomingAppts: PropTypes.arrayOf(PropTypes.object),
  pasAppts: PropTypes.arrayOf(PropTypes.object),
  fetchPatient: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
