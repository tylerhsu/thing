import { combineReducers } from 'redux';

import user from './auth';
import patients from './patients';
import patient from './patient';
import appointments from './appointments';
import files from './files';

const rootReducer = combineReducers({
  user,
  patients,
  patient,
  appointments,
  files
});

export default rootReducer;
