import {
  UPDATE_APPOINTMENT_BEGIN,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_ERROR,
} from './appointments';

const appointmentReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_APPOINTMENT_SUCCESS:
      newState = action.payload;
      if (action.payload.status === STATUSES.DECLINED) {
        newState.offerUndo = true;
      }
      break;
    default:
      return state;
  }
  return newState;
};

export default appointmentReducer;
