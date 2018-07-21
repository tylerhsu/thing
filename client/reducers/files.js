import axios from 'axios';
import PropTypes from 'prop-types';

import {
  FETCH_PATIENT_BEGIN,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,
} from './patient';

export const CREATE_FILE_BEGIN = 'CREATE_FILE_BEGIN';
export const CREATE_FILE_SUCCESS = 'CREATE_FILE_SUCCESS';
export const CREATE_FILE_ERROR = 'CREATE_FILE_ERROR';

const createFileBegin = (body) => ({
  type: CREATE_FILE_BEGIN,
  body
});

const createFileSuccess = (body, createdFile) => ({
  type: CREATE_FILE_SUCCESS,
  body,
  payload: createdFile
});

const createFileError = (body, error) => ({
  type: CREATE_FILE_ERROR,
  body,
  payload: error,
  error: true
});

export const createFile = (body) =>
  (dispatch) => {
    dispatch(createFileBegin(body));
    const data = new FormData();
    Object.keys(body).forEach((key) => {
      data.append([key], body[key]);
    });
    axios.post(`/api/files`, data)
      .then((res) => dispatch(createFileSuccess(body, res.data)))
      .catch((error) => dispatch(createFileError(body, error)));
  }

export const DELETE_FILE_BEGIN = 'DELETE_FILE_BEGIN';
export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS';
export const DELETE_FILE_ERROR = 'DELETE_FILE_ERROR';

const deleteFileBegin = (id) => ({
  type: DELETE_FILE_BEGIN,
  id
});

const deleteFileSuccess = (id) => ({
  type: DELETE_FILE_SUCCESS,
  id
});

const deleteFileError = (id, error) => ({
  type: DELETE_FILE_ERROR,
  id,
  payload: error,
  error: true
});

export const deleteFile = (id) =>
  (dispatch) => {
    dispatch(deleteFileBegin(id));
    axios.delete(`/api/files/${id}`)
      .then((res) => dispatch(deleteFileSuccess(id, res.data)))
      .catch((error) => dispatch(deleteFileError(id, error)));
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

const filesReducer = (state = defaultState, action) => {
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
        payload: action.payload.files,
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
    case CREATE_FILE_BEGIN:
      newState = {
        ...state,
        loading: true
      };
      break;
    case CREATE_FILE_SUCCESS:
      newState = {
        loading: false,
        payload: [
          ...state.payload,
          action.payload
        ],
        error: false
      };
      break;
    case CREATE_FILE_ERROR:
      newState = {
        loading: false,
        payload: action.payload,
        error: true
      };
      break;
    case DELETE_FILE_SUCCESS:
      newState = {
        ...state,
        payload: state.payload.filter(file => file.id !== action.id)
      };
      break;
    default:
      return state;
  }
  return newState;
};

export default filesReducer;
