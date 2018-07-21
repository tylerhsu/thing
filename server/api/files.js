import { Router } from 'express';
import Api from '../db/db-api';
import Busboy from 'busboy';
import uuid from 'uuid/v4';
import fs from 'fs';
import { resolve, extname } from 'path';
import { promisify } from 'util';

const unlink = promisify(fs.unlink);

const ROOT_DIR = resolve(__dirname, '..', '..');

export default Router()
  .get('/', async (req, res) => {
    const result = await Api.File.get();
    res
      .status(result.error ? 500 : 200)
      .send(result);
  })

  .get('/:id', async (req, res) => {
    const result = await Api.File.get({ id: req.params.id });
    if (result.error) {
      res.status(500).send(result);
    } else if (!result.length) {
      res.status(404).send('File not found');
    } else {
      res.status(200).send(result[0]);
    }
  })

  .get('/:id/download', async (req, res, next) => {
    const result = await Api.File.get({ id: req.params.id });
    if (result.error) {
      res.status(500).send(result);
    } else if (!result.length) {
      res.status(404).send('File not found');
    } else {
      res.status(200);
      res.set({ 'Content-Disposition': `attachment; filename=${result[0].name}` })
      fs.createReadStream(resolve(ROOT_DIR, result[0].filepath))
        .on('error', (err) => {
          next(new Error(err));
        })
        .pipe(res);
    }
  })

  .post('/', async (req, res) => {
    const busboy = new Busboy({ headers: req.headers });
    let name, filepath, patient_id;

    req.pipe(busboy)
      .on('file', (fieldName, file, filename) => {
        name = filename;
        filepath = `files/${uuid()}${extname(filename)}`;
        file.pipe(fs.createWriteStream(resolve(ROOT_DIR, filepath)));
      })
      .on('field', (fieldname, val) => {
        if (fieldname === 'patient_id') {
          patient_id = val;
        }
      })
      .on('finish', async () => {
        const result = await Api.File.create({ name, filepath, patient_id });
        res
          .status(result.error ? 500 : 200)
          .send(result);
      })
      .on('error', (err) => {
        res.status(500).send(err);
      });
  })

  .delete('/:id', async (req, res, next) => {
    const file = await Api.File.get({ id: req.params.id });
    if (file.error) {
      res.status(500).send(result);
    } else if (!file.length) {
      res.status(404).send('File not found');
    } else {
      try {
        await unlink(resolve(ROOT_DIR, file[0].filepath));
      } catch (error) {
        return next(new Error(error));
      }
      const result = await Api.File.destroy(req.params.id);
      res
        .status(result.error ? 500 : 200)
        .send(result);
    }
  });
