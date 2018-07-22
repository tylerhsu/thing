import { Router } from 'express';
import _ from 'lodash';
import Api from '../db/db-api';
import { getPatient } from './patients';

export default Router()
  .get('/', (req, res) => {
    const user = Api.User.get({ id: req.session.userId })[0];
    if (!user) {
      return res.status(204).send({});
    }
    return res.status(200).send(user);
  })
  .get('/patient', (req, res) => {
    const patient = Api.Patient.get({ user_id: req.session.userId })[0];
    if (!patient) {
      return res.sendStatus(204);
    }
    getPatient(patient.id, req, res);
  });
