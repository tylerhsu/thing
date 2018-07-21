import axios from 'axios';
import PropTypes from 'prop-types';
import appointment from './appointment';

import {
  FETCH_PATIENT_BEGIN,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,
} from './patient';

export const UPDATE_APPOINTMENT_BEGIN = 'UPDATE_APPOINTMENT_BEGIN';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_ERROR = 'UPDATE_APPOINTMENT_ERROR';

const updateAppointmentBegin = (id, body) => ({
  type: UPDATE_APPOINTMENT_BEGIN,
  id,
  body
});

const updateAppointmentSuccess = (id, body, updatedAppointment) => ({
  type: UPDATE_APPOINTMENT_SUCCESS,
  id,
  body,
  payload: updatedAppointment
});

const updateAppointmentError = (id, body, error) => ({
  type: UPDATE_APPOINTMENT_ERROR,
  id,
  body,
  payload: error,
  error: true
});

export const updateAppointment = (id, body) =>
  (dispatch) => {
    dispatch(updateAppointmentBegin(id, body));
    axios.put(`/api/appointments/${id}`, body)
      .then((res) => dispatch(updateAppointmentSuccess(id, body, res.data)))
      .catch((error) => dispatch(updateAppointmentError(id, body, error)));
  }

const defaultState = {
  loading: null,
  payload: null,
  error: false
};

export const shape = PropTypes.shape({
  loading: PropTypes.bool,
  payload: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.instanceOf(Error)
  ]),
  error: PropTypes.bool
});

const appointmentsReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_PATIENT_BEGIN:
      newState = {
        loading: true,
        payload: null,
        error: false
      };
      break;
    case FETCH_PATIENT_SUCCESS:
      newState = {
        loading: false,
        payload: action.payload.appointments,
        error: false
      };
      break;
    case FETCH_PATIENT_ERROR:
      newState = {
        loading: false,
        payload: action.payload,
        error: true
      };
      break;
    case UPDATE_APPOINTMENT_BEGIN:
    case UPDATE_APPOINTMENT_SUCCESS:
    case UPDATE_APPOINTMENT_ERROR:
      newState = {
        ...state,
        payload: state.payload.map((appt) => appt.id === action.id ? appointment(appt, action) : appt)
      };
      break;
    default:
      return state;
  }
  return newState;
};

export default appointmentsReducer;
