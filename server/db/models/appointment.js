/**
 * @typedef Appointment
 * @property {string} status - enum[STATUSES.PENDING, STATUSES.CONFIRMED, STATUSES.DECLINED]
 * @property {date} datetime
 * @property {uuid} patient_id
 * @property {uuid} doctor_id
 * @property {string} [purpose]
 * @property {string} [message]
 */

import { STATUSES, MODELS } from '../db-constants';

const STATUSES_SET = [
  STATUSES.PENDING,
  STATUSES.CONFIRMED,
  STATUSES.DECLINED,
];

export default {
  name: MODELS.APPOINTMENT,
  schema: {
    status: {
      type: String,
      enum: STATUSES_SET,
      default: () => STATUSES.PENDING,
    },
    datetime: {
      type: Date,
      required: true,
    },
    purpose: String,
    message: String,
    patient_id: String,
    doctor_id: String,
  },
};

// module.exports.associations = (Appointment, { Patient, User }) => {
//   Appointment.belongsTo(Patient);
//   Appointment.belongsTo(User, { as: 'doctor' });
// };
