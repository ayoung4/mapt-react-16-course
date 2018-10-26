import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { Webpart } from './webpart';

import { pp } from './passport';

import { UsersApi } from './routes/users';
import { ProfilesApi } from './routes/profiles';

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
    ProfilesApi,
    UsersApi,
]);

Webpart.load(server, app);

server.listen(PORT, () => console.log(`listening on ${3000}`));
