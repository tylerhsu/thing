import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import LabeledText from './LabeledText';

const PatientDetails = ({ patient }) => (
  <div className="patient-details">
    <LabeledText label="DOB" value={moment(patient.dateOfBirth).format('MMMM Do, YYYY')} />
    <LabeledText label="Email address" value={patient.email} />
    <LabeledText label="Phone" value={patient.phoneNumber} />
    <LabeledText label="Address" value={`${patient.address.address}, ${patient.address.city}, ${patient.address.state} ${patient.address.zip}`} />
  </div>
);

PatientDetails.propTypes = {
  patient: PropTypes.object,
};

export default PatientDetails;
