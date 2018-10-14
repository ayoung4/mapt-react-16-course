import * as express from 'express';

export const profiles = express.Router();

profiles.get('/test',
    (req, res) => res.json({ payload: 'test' }));
