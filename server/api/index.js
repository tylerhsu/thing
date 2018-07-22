import { Router } from 'express';

import auth from './auth';
import patients from './patients';
import appointments from './appointments';
import doctors from './doctors';
import me from './me';
import files from './files';
import { requireAuth } from './middleware';

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
  .use('/doctors', doctors)
  .use('/files', files);
// No routes matched

