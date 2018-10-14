import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as Future from 'fluture';

import * as Users from 'Api/users';
import * as Profiles from 'Api/profiles';
import { Webpart } from './webpart';

import { Register, Login } from './routes/users';

interface IAppSettings {
    mongoURI: string;
}

const settings: IAppSettings = require('Config/keys.js');

const server = express();

const PORT = process.env.PORT || 3000;

mongoose
    .connect(settings.mongoURI, { useNewUrlParser: true })
    .catch(console.warn)
    .then(() => console.log('mongo connected'));

server.use(bodyParser.urlencoded({ extended: true }));

server.use(passport.initialize());

const app = Webpart.POST.concat(
    Webpart.choose([
        Webpart.path('/api/users/register').concat(Register),
        Webpart.path('/api/users/login').concat(Login),
    ]),
);

Webpart.loadApp(server, app);

server.listen(PORT, () => console.log(`listening on ${3000}`));
