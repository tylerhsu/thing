import axios from 'axios';
import PropTypes from 'prop-types';

const AUTHENTICATE_BEGIN = 'AUTHENTICATE_BEGIN';
const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR';

export const authenticateBegin = () => ({
  type: AUTHENTICATE_BEGIN
});

export const authenticateSuccess = (user) => ({
  type: AUTHENTICATE_SUCCESS,
  payload: user
});

export const authenticateError = (error) => ({
  type: AUTHENTICATE_ERROR,
  payload: error,
  error: true
});

export const login = (email, password) =>
  (dispatch) => {
    dispatch(authenticateBegin());
    axios.post(
      '/api/auth/login',
      { email, password },
    )
      .then((res) => dispatch(authenticateSuccess(res.data)))
      .catch((error) => dispatch(authenticateError(error)));
  }

const FETCH_ME_BEGIN = 'FETCH_ME_BEGIN';
const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS';
const FETCH_ME_ERROR = 'FETCH_ME_ERROR';

export const fetchMeBegin = () => ({
  type: FETCH_ME_BEGIN
});

export const fetchMeSuccess = (user) => ({
  type: FETCH_ME_SUCCESS,
  payload: user
});

export const fetchMeError = (error) => ({
  type: FETCH_ME_ERROR,
  payload: error,
  error: true
});

export const fetchMe = () =>
  (dispatch) => {
    dispatch(fetchMeBegin());
    axios.get('/api/me')
      .then((res) => dispatch(fetchMeSuccess(res.data || null)))
      .catch((error) => dispatch(fetchMeError(error)));
  }

const defaultState = {
  loading: null,
  payload: null,
  error: false
};

export const shape = PropTypes.shape({
  loading: PropTypes.bool,
  payload: PropTypes.oneOfType([
    PropTypes.shape({
      role: PropTypes.string
    }),
    PropTypes.instanceOf(Error)
  ]),
  error: PropTypes.bool
});

const authReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case AUTHENTICATE_BEGIN:
    case FETCH_ME_BEGIN:
      newState = {
        loading: true,
        payload: null,
        error: false
      };
      break;
    case AUTHENTICATE_SUCCESS:
    case FETCH_ME_SUCCESS:
      newState = {
        loading: false,
        payload: action.payload,
        error: false
      };
      break;
    case AUTHENTICATE_ERROR:
    case FETCH_ME_ERROR:
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

export default authReducer;
