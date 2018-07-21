import axios from 'axios';
import PropTypes from 'prop-types';

import { FETCH_PATIENT_BEGIN } from './patient';
import { FETCH_PATIENT_SUCCESS } from './patient';
import { FETCH_PATIENT_ERROR } from './patient';

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
    default:
      return state;
  }
  return newState;
};

export default appointmentsReducer;
