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
    appointments: _.sortBy(getAppointments(appts, ownProps.type, ownProps.viewer), 'datetime')
  };
};

function getAppointments(appts, type, viewer) {
  switch (type) {
    case TYPES.PENDING: return appts.filter(viewer === ROLES.PATIENT ? inStatus(STATUSES.PENDING, STATUSES.DECLINED) : inStatus(STATUSES.PENDING))
    case TYPES.UPCOMING: return appts.filter(inStatus(STATUSES.CONFIRMED)).filter(inFuture);
    case TYPES.PAST: return appts.filter(inStatus(STATUSES.CONFIRMED)).filter(inPast);
    default: return [];
  };
}

function inStatus(...statuses) {
  return (appt) => statuses.indexOf(appt.status) > -1 || (appt.undo && statuses.indexOf(appt.undo.status) > -1);
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
