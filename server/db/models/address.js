/**
 * @typedef Address
 * @property {string} address
 * @property {string} city
 * @property {string} state
 * @property {string} zip
 */

import { MODELS } from '../db-constants';

export default {
  name: MODELS.ADDRESS,
  schema: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: false,
    },
  },
};
