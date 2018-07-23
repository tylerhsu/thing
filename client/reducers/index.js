import { combineReducers } from 'redux';

import user from './auth';
import patients from './patients';
import patient from './patient';
import appointments from './appointments';
import files from './files';
import doctors from './doctors';

const rootReducer = combineReducers({
  user,
  patients,
  patient,
  appointments,
  files,
  doctors
});

export default rootReducer;
