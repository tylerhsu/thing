import axios from 'axios';
import PropTypes from 'prop-types';

const FETCH_PATIENTS_BEGIN = 'FETCH_PATIENTS_BEGIN';
const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
const FETCH_PATIENTS_ERROR = 'FETCH_PATIENTS_ERROR';

const SEARCH_PATIENTS = 'SEARCH_PATIENTS';

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

export const searchPatients = (search) => ({
  type: SEARCH_PATIENTS,
  search
});

const defaultState = {
  loading: null,
  payload: null,
  search: '',
  error: false
};

export const shape = PropTypes.shape({
  loading: PropTypes.bool,
  payload: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.instanceOf(Error)
  ]),
  search: PropTypes.string,
  error: PropTypes.bool
});

const patientsReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_PATIENTS_BEGIN:
      newState = {
        loading: true,
        payload: null,
        search: state.search,
        error: false
      };
      break;
    case FETCH_PATIENTS_SUCCESS:
      newState = {
        loading: false,
        payload: action.payload,
        search: state.search,
        error: false
      };
      break;
    case FETCH_PATIENTS_ERROR:
      newState = {
        loading: false,
        payload: action.payload,
        search: state.search,
        error: true
      };
      break;
    case SEARCH_PATIENTS:
      newState = {
        ...state,
        search: (action.search || '').trim()
      };
      break;
    default:
      return state;
  }
  return newState;
};

export default patientsReducer;
