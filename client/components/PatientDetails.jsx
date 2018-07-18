import React from 'react';
import PropTypes from 'prop-types';

import LabeledText from './LabeledText';

const PatientDetails = ({ patient }) => (
  <div className="patient-details">
    <LabeledText label="DOB" value={patient.DOB} />
    <LabeledText label="Email address" value={patient.email} />
    <LabeledText label="Phone" value={patient.phone} />
    <LabeledText label="Address" value={patient.address} />
  </div>
);

PatientDetails.propTypes = {
  patient: PropTypes.object,
};

export default PatientDetails;
