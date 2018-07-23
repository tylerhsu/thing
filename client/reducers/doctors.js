import axios from 'axios';
import PropTypes from 'prop-types';

const FETCH_DOCTORS_BEGIN = 'FETCH_DOCTORS_BEGIN';
const FETCH_DOCTORS_SUCCESS = 'FETCH_DOCTORS_SUCCESS';
const FETCH_DOCTORS_ERROR = 'FETCH_DOCTORS_ERROR';

const fetchDoctorsBegin = () => ({
  type: FETCH_DOCTORS_BEGIN
});

const fetchDoctorsSuccess = (doctors) => ({
  type: FETCH_DOCTORS_SUCCESS,
  payload: doctors
});

const fetchDoctorsError = (error) => ({
  type: FETCH_DOCTORS_ERROR,
  payload: error,
  error: true
});

export const fetchDoctors = () =>
  (dispatch) => {
    dispatch(fetchDoctorsBegin());
    axios.get('/api/doctors')
      .then((res) => dispatch(fetchDoctorsSuccess(res.data)))
      .catch((error) => dispatch(fetchDoctorsError(error)));
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
  search: PropTypes.string,
  error: PropTypes.bool
});

const doctorsReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_DOCTORS_BEGIN:
      newState = {
        loading: true,
        payload: null,
        error: false
      };
      break;
    case FETCH_DOCTORS_SUCCESS:
      newState = {
        loading: false,
        payload: action.payload,
        error: false
      };
      break;
    case FETCH_DOCTORS_ERROR:
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

export default doctorsReducer;
