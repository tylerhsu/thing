/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { resolve } from 'path';
import apiRoutes from './api';

module.exports = express()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(logger('tiny'))
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use('/api', apiRoutes)

  .get('/*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'public', 'index.html'));
  })
  .use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);
    res.status(err.status || 500).send('We have a problem!');
  })
  .listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
