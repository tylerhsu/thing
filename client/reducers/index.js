import { combineReducers } from 'redux';

import user from './auth';
import patients from './patients';
import patient from './patient';

const rootReducer = combineReducers({
  user,
  patients,
  patient
});

export default rootReducer;
