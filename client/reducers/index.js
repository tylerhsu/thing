import { combineReducers } from 'redux';

import user from './auth';
import patients from './patients';

const rootReducer = combineReducers({
  user,
  patients
});

export default rootReducer;
