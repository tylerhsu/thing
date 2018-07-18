import React from 'react';
import PropTypes from 'prop-types';

import Appointment from '../components/Appointment';

const Appointments = ({ appointments }) => (
  <div>
    {
      appointments.map((appt) => <Appointment key={appt.id} appt={appt} />)
    }
  </div>
);

Appointments.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object),
};

export default Appointments;
