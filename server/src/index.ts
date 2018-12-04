import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { Webpart } from './webpart';

import { pp } from './auth/passport';

import { UsersApi } from './routes/users';
import { ProfilesApi } from './routes/profiles';

const settings: IAppSettings = require('Config/keys.js');

const server = express();

const PORT = process.env.PORT || 5000;

mongoose
    .connect(settings.mongoURI, { useNewUrlParser: true })
    .catch(console.warn)
    .then(() => console.log('mongo connected'));

server.use(express.static(__dirname + '/public/'));
server.use(pp.initialize());

server.use(bodyParser.urlencoded({ extended: true }));

const app = Webpart.match([
    ProfilesApi,
    UsersApi,
]);

// server.get('*', (req, res) => {
//     console.log('getting index');
// })

Webpart.load(server, app);

server.listen(PORT, () => console.log(`api listening on ${PORT}`));
