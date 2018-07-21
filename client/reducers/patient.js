import axios from 'axios';
import PropTypes from 'prop-types';

const FETCH_PATIENT_BEGIN = 'FETCH_PATIENT_BEGIN';
const FETCH_PATIENT_SUCCESS = 'FETCH_PATIENT_SUCCESS';
const FETCH_PATIENT_ERROR = 'FETCH_PATIENT_ERROR';

const fetchPatientBegin = () => ({
  type: FETCH_PATIENT_BEGIN
});

const fetchPatientSuccess = (patient) => ({
  type: FETCH_PATIENT_SUCCESS,
  payload: patient
});

const fetchPatientError = (error) => ({
  type: FETCH_PATIENT_ERROR,
  payload: error,
  error: true
});

export const fetchPatient = (id) =>
  (dispatch) => {
    dispatch(fetchPatientBegin());
    axios.get(`/api/patients/${id}`)
      .then((res) => dispatch(fetchPatientSuccess(res.data)))
      .catch((error) => dispatch(fetchPatientError(error)));
  }

const defaultState = {
  loading: null,
  payload: null,
  error: false
};

export const shape = PropTypes.shape({
  loading: PropTypes.bool,
  payload: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Error)
  ]),
  error: PropTypes.bool
});

const patientReducer = (state = defaultState, action) => {
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
        payload: action.payload,
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

export default patientReducer;
