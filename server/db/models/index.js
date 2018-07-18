import { MODELS } from '../db-constants';
import Address from './address';
import Appointment from './appointment';
import File from './file';
import Patient from './patient';
import User from './user';

const GLOBAL_SCHEMA = {
  id: {
    type: String,
    required: false,
  },
};

export default {
  [MODELS.ADDRESS]: {
    ...Address,
    schema: {
      ...Address.schema,
      ...GLOBAL_SCHEMA,
    },
  },
  [MODELS.APPOINTMENT]: {
    ...Appointment,
    schema: {
      ...Appointment.schema,
      ...GLOBAL_SCHEMA,
    },
  },
  [MODELS.FILE]: {
    ...File,
    schema: {
      ...File.schema,
      ...GLOBAL_SCHEMA,
    },
  },
  [MODELS.PATIENT]: {
    ...Patient,
    schema: {
      ...Patient.schema,
      ...GLOBAL_SCHEMA,
    },
  },
  [MODELS.USER]: {
    ...User,
    schema: {
      ...User.schema,
      ...GLOBAL_SCHEMA,
    },
  },
};

