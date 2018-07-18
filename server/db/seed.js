/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import { STATUSES, ROLES } from './db-constants';
import Db from './db-api';

async function seedEverything() {
  /**
   * Entity creation
   */
  await Promise.all([
    {
      address: '10 Lovegood House',
      city: 'Ottery St Catchpole',
      state: 'IL',
      zip: '60660',
    },
    {
      address: 'Hogwarts Castle',
      city: 'Highlands',
      state: 'MN',
      zip: '55124',
    },
    {
      address: 'The Burrow',
      city: 'Devon',
      state: 'IL',
      zip: '60660',
    },
    {
      address: 'The Burrow',
      city: 'Devon',
      state: 'IL',
      zip: '60660',
    },
  ].map(Db.Address.create));

  await Promise.all([
    {
      firstName: 'Hermione',
      lastName: 'Granger',
      email: 'hermione@example.com',
      password: '1234',
      role: ROLES.DOCTOR,
    },
    {
      firstName: 'Luna',
      lastName: 'Lovegood',
      email: 'luna@example.com',
      password: '1234',
      role: ROLES.PATIENT,
    },
    {
      firstName: 'Albus',
      lastName: 'Dumbledore',
      email: 'dumblydore@example.com',
      password: '1234',
      role: ROLES.PATIENT,
    },
    {
      firstName: 'Fred',
      lastName: 'Weasley',
      email: 'fred@example.com',
      password: '1234',
      role: ROLES.PATIENT,
    },
    {
      firstName: 'Ginny',
      lastName: 'Weasley',
      email: 'ginny@example.com',
      password: '1234',
      role: ROLES.PATIENT,
    },
    {
      firstName: 'Minerva',
      lastName: 'McGonagall',
      email: 'mcg@example.com',
      password: '1234',
      role: ROLES.DOCTOR,
    },
  ].map(Db.User.create));

  await Promise.all([
    {
      dateOfBirth: new Date(1981, 2, 13),
      phoneNumber: '123-456-7890',
    },
    {
      dateOfBirth: new Date(1881, 6, 23),
      phoneNumber: '555-555-5555',
    },
    {
      dateOfBirth: new Date(1978, 4, 1),
      phoneNumber: '222-555-5555',
    },
    {
      dateOfBirth: new Date(1981, 8, 11),
      phoneNumber: '333-555-5555',
    },
  ].map(Db.Patient.create));

  await Promise.all([
    {
      datetime: new Date(2018, 1, 5, 12, 30),
      purpose: "I sleep walk, you see. That's why I wear shoes to bed.",
      status: STATUSES.CONFIRMED,
    },
    {
      datetime: new Date(2018, 8, 6, 14, 45),
      purpose: 'Alas! Earwax!',
      status: STATUSES.CONFIRMED,
    },
    {
      datetime: new Date(2018, 4, 29, 9, 0),
      purpose: "Ask us no questions and we'll tell you no lies.",
      status: STATUSES.CONFIRMED,
    },
    {
      datetime: new Date(2019, 7, 1, 10, 30),
      purpose: "Well, we're not sure, but we think he knocked himself out with his own bat.",
      status: STATUSES.PENDING,
    },
    {
      datetime: new Date(2017, 12, 14, 16, 15),
      purpose: 'I suspect Nargles are behind it.',
      status: STATUSES.CONFIRMED,
    },
    {
      datetime: new Date(2017, 12, 14, 16, 45),
      purpose: "I haven't blushed so much since Madam Pomfrey told me she liked my new earmuffs.",
      status: STATUSES.CONFIRMED,
    },
    {
      datetime: new Date(2017, 6, 30, 11, 30),
      purpose: 'I solemnly swear that I am up to no good.',
      status: STATUSES.CONFIRMED,
    },
    {
      datetime: new Date(2020, 7, 15, 9, 15),
      purpose: "I'm going to be expelled!",
      status: STATUSES.PENDING,
    },
  ].map(Db.Appointment.create));

  /**
   * Bundling
   */

  /**
   * add User.id to Patient when User.role === ROLES.PATIENT
   * add Address.id to Patient
   */
  const patients = await Db.Patient.get();
  const patientPromises = [];
  for (let i = 0; i < patients.length; i += 1) {
    const patient_id = patients[i].id;
    const user_id = Db.User.get({ role: ROLES.PATIENT })[i].id;
    const address_id = Db.Address.get(i).id;
    patientPromises[i] = Db.Patient.update(patient_id, { user_id, address_id });
  }

  const doctorUsers = await Db.User.get({ role: ROLES.DOCTOR });
  const appointments = await Db.Appointment.get();
  // associate Appointment with User where User.role === ROLES.DOCTOR and Patien
  const appointmentPromises = [];
  for (let i = 0, n = appointments.length; i < n; i += 1) {
    const appointment_id = appointments[i].id;
    const patient_id = patients[i % patients.length].id;
    const doctor_id = doctorUsers[i % doctorUsers.length].id;
    appointmentPromises[i] = Db.Appointment.update(appointment_id, { patient_id, doctor_id });
  }
  const users = Db.User.get();
  const userPromises = [];
  for (let i = 0, n = users.length; i < n; i += 1) {
    userPromises[i] = bcrypt.hash(users[i].password, 10, (error, hash) => {
      Db.User.update(users[i].id, { password_digest: hash });
    });
  }

  await Promise.all(patientPromises.concat(appointmentPromises).concat(userPromises));
}

export default seedEverything;
