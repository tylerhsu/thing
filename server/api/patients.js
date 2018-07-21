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
    files: Api.File.get({ patient_id: patient.id })
  };
}

export default Router()
  .get('/', (req, res) => {
    const allPatients = Api.Patient.get();
    res.status(200).send(allPatients.map(hydratePatientData));
  })
  .get('/:id', (req, res) => {
    const result = Api.Patient.get({ id: req.params.id });
    if (result.error) {
      res.status(500).send(result);
    } else if (!result.length) {
      res.status(404).send('Patient not found');
    } else {
      res.status(200).send(hydratePatientData(result[0]));
    }
  });
