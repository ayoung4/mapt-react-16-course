import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';

import { Webpart } from './webpart';

import { Register, Login } from './routes/users';

import { pp, Authenticate } from './passport';

interface IAppSettings {
    mongoURI: string;
    secretOrKey: string;
}

const settings: IAppSettings = require('Config/keys.js');

const server = express();

const PORT = process.env.PORT || 3000;

mongoose
    .connect(settings.mongoURI, { useNewUrlParser: true })
    .catch(console.warn)
    .then(() => console.log('mongo connected'));

server.use(pp.initialize());

server.use(bodyParser.urlencoded({ extended: true }));

const app = Webpart.match([
    Webpart.path('/api/users/register')
        .concat(Webpart.POST)
        .concat(Register),
    Webpart.path('/api/users/login')
        .concat(Webpart.POST)
        .concat(Login),
    Webpart.path('/api/users/current')
        .concat(Webpart.GET)
        .concat(Authenticate)
        .concat(Webpart.log('authenticated'))
]);

Webpart.load(server, app);

server.listen(PORT, () => console.log(`listening on ${3000}`));
