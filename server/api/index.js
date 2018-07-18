import { Router } from 'express';

import auth from './auth';
import patients from './patients';
import appointments from './appointments';
import doctors from './doctors';

export default Router()
// Quick way to check that API route is getting hit
  .get('/heartbeat', (req, res) => {
    res.send({ OK: true });
  })
// List all APIs here
  .use('/auth', auth)
  .use('/patients', patients)
  .use('/appointments', appointments)
  .use('/doctors', doctors);
// No routes matched

