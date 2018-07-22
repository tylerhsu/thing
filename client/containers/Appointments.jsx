import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Appointment from '../components/Appointment';

export const TYPES = {
  PENDING: 'pending',
  UPCOMING: 'upcoming',
  PAST: 'past'
}

class Appointments extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { appointments, viewer, type } = this.props;
    return (
      <div>
        { appointments.length ?
          appointments.map((appt) => <Appointment key={appt.id} appt={appt} viewer={viewer} />) :
          `No ${type} appointments`
        }
      </div>
    );
  }
}

const mapStateToProps = ({ appointments }, ownProps) => {
  let appts = appointments.payload && Array.isArray(appointments.payload) ? appointments.payload : [];
  return {
    appointments: getAppointments(appts, ownProps.type)
  };
};

function getAppointments(appts, type) {
  switch (type) {
    case TYPES.PENDING: return appts.filter(inStatus(STATUSES.PENDING));
    case TYPES.UPCOMING: return appts.filter(inStatus(STATUSES.CONFIRMED)).filter(inFuture);
    case TYPES.PAST: return appts.filter(inStatus(STATUSES.CONFIRMED)).filter(inPast);
    default: return [];
  };
}

function inStatus(status) {
  return (appt) => appt.status === status || (appt.undo && appt.undo.status === status);
}

function inFuture(appt) {
  return new Date(appt.datetime) > new Date();
}

function inPast(appt) {
  return new Date(appt.datetime) <= new Date();
}

Appointments.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  viewer: PropTypes.oneOf(_.values(ROLES)).isRequired,
  type: PropTypes.oneOf(_.values(TYPES)).isRequired
};

export default connect(mapStateToProps)(Appointments);
