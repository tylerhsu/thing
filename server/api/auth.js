import { Router } from 'express';
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import Db from '../db/db-api';

export default Router()
  .post('/register', async (req, res) => {
    const existingUser = Db.User.get({ email: req.body.email });
    if (existingUser.length) {
      return res.status(400).send('Email in use');
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const users = await Db.User.create({
      ...req.body,
      password_digest: hash,
    });
    const userCreated = _.find(users, { email: req.body.email });
    if (userCreated) {
      return res.status(200).send(_.omit(userCreated, ['password', 'password_digest']));
    }
    return res.status(500).send('User not created');
  })

  .post('/login', async (req, res) => {
    const user = Db.User.get({ email: req.body.email })[0];
    if (!user || user.error) {
      return res.status(404).send('Unknown email');
    }
    const result = await bcrypt.compare(req.body.password, user.password_digest);
    if (result) {
      return res.status(200).send(_.omit(user, ['password', 'password_digest']));
    }
    return res.status(401).send('Incorrect password');
  });
