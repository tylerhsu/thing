import axios from 'axios';
import PropTypes from 'prop-types';

import { FETCH_PATIENT_BEGIN } from './patient';
import { FETCH_PATIENT_SUCCESS } from './patient';
import { FETCH_PATIENT_ERROR } from './patient';

export const UPDATE_APPOINTMENT_BEGIN = 'UPDATE_APPOINTMENT_BEGIN';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_ERROR = 'UPDATE_APPOINTMENT_ERROR';

const updateAppointmentBegin = () => ({
  type: UPDATE_APPOINTMENT_BEGIN
});

const updateAppointmentSuccess = (appointment) => ({
  type: UPDATE_APPOINTMENT_SUCCESS,
  payload: appointment
});

const updateAppointmentError = (error) => ({
  type: UPDATE_APPOINTMENT_ERROR,
  payload: error,
  error: true
});

export const updateAppointment = (id, body) =>
  (dispatch) => {
    dispatch(updateAppointmentBegin());
    axios.put(`/api/appointments/${id}`, body)
      .then((res) => dispatch(updateAppointmentSuccess(res.data)))
      .catch((error) => dispatch(updateAppointmentError(error)));
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
    case UPDATE_APPOINTMENT_SUCCESS:
      newState = {
        ...state,
        payload: state.payload.map(appt => appt.id === action.payload.id ? action.payload : appt)
      };
    default:
      return state;
  }
  return newState;
};

export default appointmentsReducer;
