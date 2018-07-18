/**
 * @typedef File
 * @property {string} name
 * @property {string} filepath
 * @property {uuid} patient_id
 */

import { MODELS } from '../db-constants';

export default {
  name: MODELS.FILE,
  schema: {
    name: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    patient_id: {
      type: String,
    },
  },
};

// module.exports.associations = (File, { Patient }) => {
//   File.belongsTo(Patient);
// };
