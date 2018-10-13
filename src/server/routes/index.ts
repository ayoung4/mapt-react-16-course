import * as express from 'express';

export const users = express.Router();

users.get('/test', (req, res)=> res.json({ payload: 'test' }));

export const profiles = express.Router();

profiles.get('/test', (req, res)=> res.json({ payload: 'test' }));
