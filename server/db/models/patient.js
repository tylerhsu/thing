/**
 * @typedef Patient
 * @property {date} dateOfBirth
 * @property {string} phoneNumber
 * @property {uuid} address_id
 * @property {uuid} user_id
 */

import { MODELS } from '../db-constants';

export default {
  name: MODELS.PATIENT,
  schema: {
    dateOfBirth: {
      type: Date,
      required: false,
    },
    phoneNumber: {
      type: String,
    },
    address_id: {
      type: String,
      required: false,
    },
    user_id: String,
  },
};
