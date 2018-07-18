import axios from 'axios';
import PropTypes from 'prop-types';

const FETCH_PATIENTS_BEGIN = 'FETCH_PATIENTS_BEGIN';
const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
const FETCH_PATIENTS_ERROR = 'FETCH_PATIENTS_ERROR';

const fetchPatientsBegin = () => ({
  type: FETCH_PATIENTS_BEGIN
});

const fetchPatientsSuccess = (patients) => ({
  type: FETCH_PATIENTS_SUCCESS,
  payload: patients
});

const fetchPatientsError = (error) => ({
  type: FETCH_PATIENTS_ERROR,
  payload: error,
  error: true
});

export const fetchPatients = () =>
  (dispatch) => {
    dispatch(fetchPatientsBegin());
    axios.get('/api/patients')
      .then((res) => dispatch(fetchPatientsSuccess(res.data)))
      .catch((error) => dispatch(fetchPatientsError(error)));
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

const patientsReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_PATIENTS_BEGIN:
      newState = {
        loading: true,
        payload: null,
        error: false
      };
      break;
    case FETCH_PATIENTS_SUCCESS:
      newState = {
        loading: false,
        payload: action.payload,
        error: false
      };
      break;
    case FETCH_PATIENTS_ERROR:
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

export default patientsReducer;
