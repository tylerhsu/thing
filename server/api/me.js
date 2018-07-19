import { Router } from 'express';
import _ from 'lodash';
import Db from '../db/db-api';

export default Router()
  .get('/', async (req, res) => {
    const user = Db.User.get({ id: req.session.userId })[0];
    if (!user) {
      return res.status(200).send({});
    }
    return res.status(200).send(user);
  });
