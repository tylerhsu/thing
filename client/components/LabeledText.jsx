import React from 'react';
import PropTypes from 'prop-types';

const LabeledText = ({ label, value }) => (
  <div className="labeled-text">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
  </div>
);

LabeledText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default LabeledText;
