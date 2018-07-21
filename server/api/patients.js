import { Router } from 'express';
import db from '../db';
import { MODELS } from '../db/db-constants';
import Api from '../db/db-api';

const userProperties = ['firstName', 'lastName', 'email'];

function hydratePatientData(patient) {
  return {
    ...patient,
    ...db
      .get(MODELS.USER)
      .find({ id: patient.user_id })
      .pick(userProperties)
      .value(),
    appointments: Api.Appointment.get({ patient_id: patient.id }),
    address: Api.Address.get({ id: patient.address_id })[0],
  };
}

export default Router()
  .get('/', (req, res) => {
    const allPatients = Api.Patient.get();
    res.status(200).send(allPatients.map(hydratePatientData));
  })
  .get('/:id', (req, res) => {
    const patient = Api.Patient.get({ id: req.params.id })[0];
    if (!patient) {
      return res.status(404).send('Patient not found');
    }
    res.status(200).send(hydratePatientData(patient));
  });
