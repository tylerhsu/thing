/**
 * @typedef User
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} password_digest
 * @property {string} role - enum[doctor, patient]
 * @property {string} email
 */

import bcrypt from 'bcryptjs';
import { ROLES, MODELS } from '../db-constants';

const ROLES_SET = [ROLES.DOCTOR, ROLES.PATIENT];

export default {
  name: MODELS.USER,
  schema: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password_digest: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: ROLES_SET,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
};

//   indexes: [{ fields: ['email'], unique: true }],
//   hooks: {
//     beforeBulkCreate: bulkSetEmailAndPassword,
//     beforeCreate: setEmailAndPassword,
//     beforeUpdate: setEmailAndPassword,
//   },
//   instanceMethods: {
//     authenticate(plaintext) {
//       return new Promise((resolve, reject) =>
//         bcrypt.compare(plaintext, this.password_digest,
//           (err, result) =>
//           err ? reject(err) : resolve(result))
//       );
//     }
//   }
// });

/**
 * encrypt - creates User.password_digest
 * @param {string} password
 */
export const encrypt = async (password) =>
  bcrypt.hash(password, 10, (error, hash) => ({ error, hash }));

/**
 * authenticate
 * @param {string} password
 * @param {string} password_digest - from database
 * @returns {object} - result of authentication
 */
export const authenticate = async (password, passwordDigest) => {
  const { error, result } = await bcrypt.compare(
    password,
    passwordDigest,
    (err, res) => ({ error: err, result: res }),
  );

  if (error) {
    throw new Error(error);
  } else {
    return result;
  }
};
//
// function bulkSetEmailAndPassword(userArr) {
//   return Promise.all(userArr.map(user => setEmailAndPassword(user)));
// }
//
//
