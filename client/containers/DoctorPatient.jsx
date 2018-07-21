import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Appointments from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';

import { shape as patientShape, fetchPatient } from '../reducers/patient';

import { pendingAppts, pastAppts, files } from '../dummyData';

class Patient extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchPatient(this.props.match.params.id);
  }

  render() {
    const { patient } = this.props;
    if (patient.payload && !patient.error) {
      return (
        <div className="container">
          <h2>{patient.payload.firstName} {patient.payload.lastName}</h2>
          <PatientDetails patient={patient.payload} />
          <div>
            <h3>Appointment Requests</h3>
            <Appointments appointments={pendingAppts} />
          </div>
          <div>
            <h3>Upcoming Appointments</h3>
            <div>No upcoming appointments.</div>
          </div>
          <div>
            <h3>Past Appointments</h3>
            <Appointments appointments={pastAppts} />
          </div>
          <div>
            <h3>Patient Files</h3>
            <Files files={files} />
          </div>
        </div>
      );
    } else if (patient.error) {
      return (
        <div>{patient.payload.message}</div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = ({ patient }) => ({ patient });

const mapDispatchToProps = { fetchPatient };

Patient.propTypes = {
  patient: patientShape.isRequired,
  fetchPatient: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
