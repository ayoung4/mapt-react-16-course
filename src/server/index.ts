import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as R from 'ramda';

import { Webpart } from './webpart';

import { Register, Login } from './routes/users';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { Either } from 'monet';
import * as Future from 'fluture';

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

server.use(passport.initialize());

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: settings.secretOrKey,
}, (payload, done) => {
    console.log('in strategy', payload);
    done(null, payload.id)
}));

server.use(bodyParser.urlencoded({ extended: true }));

// const Authenticate = Webpart.ofFuture(
//     (request) => {
//         console.log('auth');
//         return Future.reject({ message: 'bad token' });
//         // return Future.Future(
//         //     (reject, resolve) => {
//         //         console.log('in future');
//         //         passport.authenticate(
//         //             'jwt',
//         //             { session: false },
//         //             (err, auth) => {
//         //                 console.log(err, auth);
//         //                 err
//         //                     ? reject(err)
//         //                     : resolve(auth);
//         //             }
//         //         )(request.req, request.res)
//         //     })
//         // .map((x) => { console.log(x); return x; })
//         // .bimap(
//         //     () => request.res.status(401).write({ message: 'bad token' }),
//         //     () => request)
//     },
// );



export const Authenticate = Webpart.ofFuture((request) =>
    Future.Future(
        (reject, resolve) => {
            passport.authenticate(
                'jwt',
                { session: false },
                (err, auth) => {
                    console.log('in auth');
                    console.log(err, auth);
                    err
                        ? reject(err)
                        : auth
                            ? resolve(request)
                            : reject(request.res.status(401));
                }
            )(request.req, request.res);
        },
    ),
);

// server.get(
//     '/api/users/current/1',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//         res.status(300).end();
//     },
// )

const app = Webpart.choose([
    Webpart.path('/api/users/register')
        .concat(Webpart.POST)
        .concat(Register),
    Webpart.path('/api/users/login')
        .concat(Webpart.POST)
        .concat(Login),
    Webpart.path('/api/users/current')
        .concat(Webpart.GET)
        .concat(Authenticate)
        .concat(Webpart.OK('current'))
]);

Webpart.loadApp(server, app);

server.listen(PORT, () => console.log(`listening on ${3000}`));
