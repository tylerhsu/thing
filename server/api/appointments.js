import { Router } from 'express';
import Api from '../db/db-api';

export default Router()
  .get('/', async (req, res) => {
    const result = await Api.Appointment.get();
    res
      .status(result.error ? 500 : 200)
      .send(result);
  })

  .get('/:id', async (req, res) => {
    const result = await Api.Appointment.get({ id: req.params.id });
    if (result.error) {
      res.status(500).send(result);
    } else if (!result.length) {
      res.status(404).send('Appointment not found');
    } else {
      res.status(200).send(result[0]);
    }
  })

  .post('/', async (req, res) => {
    const result = await Api.Appointment.create(req.body);
    res
      .status(result.error ? 500 : 200)
      .send(result);
  })

  .put('/:id', async (req, res) => {
    const result = await Api.Appointment.update(req.params.id, req.body);
    res
      .status(result.error ? 500 : 200)
      .send(result);
  })

  .delete('/:id', async (req, res) => {
    const result = await Api.Appointment.destroy(req.params.id);
    res
      .status(result.error ? 500 : 200)
      .send(result);
  });
