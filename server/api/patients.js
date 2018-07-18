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
    address: Api.Address.get({ id: patient.address_id }),
  };
}

export default Router()
  .get('/', (req, res) => {
    const allPatients = Api.Patient.get();
    res.status(200).send(allPatients.map(hydratePatientData));
  })
  .get('/:id', (req, res) => {
    const patient = Api.Patient.get(req.params.id);
    res.status(200).send(hydratePatientData(patient));
  });
