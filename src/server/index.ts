import * as express from 'express';
import * as mongoose from 'mongoose';

import * as Users from 'Api/users';
import * as Profiles from 'Api/profiles';
import * as Routes from './routes';

interface IAppSettings {
    mongoURI: string;
}

const settings: IAppSettings = require('Config/keys.js');

const app = express();

const PORT = process.env.PORT || 3000;

mongoose
    .connect(settings.mongoURI)
    .catch(console.warn)
    .then(() => console.log('mongo connected'));

app.get('/', (req, res) => res.send('hello'));

app.use(Users.endpoint, Routes.users);

app.use(Profiles.endpoint, Routes.profiles);

app.listen(PORT, () => console.log(`listening on ${3000}`));
