import { Router } from 'express';
import db from '../db';
import { ROLES, MODELS } from '../db/db-constants';

export default Router()
  .get('/', (req, res) => {
    res.status(200).send(db
      .get(MODELS.USER)
      .filter({ role: ROLES.DOCTOR })
      .value());
  });
