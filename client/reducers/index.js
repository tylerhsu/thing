import { combineReducers } from 'redux';

import user from './auth';
import patients from './patients';
import patient from './patient';
import appointments from './appointments';

const rootReducer = combineReducers({
  user,
  patients,
  patient,
  appointments
});

export default rootReducer;
