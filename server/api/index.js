import { Router } from 'express';

import auth from './auth';
import patients from './patients';
import appointments from './appointments';
import doctors from './doctors';
import me from './me';
import requireAuth from '../middleware/requireAuth';

export default Router()
// Quick way to check that API route is getting hit
  .get('/heartbeat', (req, res) => {
    res.send({ OK: true });
  })
// List all APIs here
  .use('/auth', auth)
  .use('/me', me)
// login required below this point
  .use(requireAuth)
  .use('/patients', patients)
  .use('/appointments', appointments)
  .use('/doctors', doctors);
// No routes matched

