import { Strategy, ExtractJwt } from 'passport-jwt';
import * as passport from 'passport';
import * as Future from 'fluture';

import { Webpart } from './webpart';
import { User } from 'Server/models';

interface IAppSettings {
    secretOrKey: string;
}

const settings: IAppSettings = require('Config/keys.js');

const jwtStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: settings.secretOrKey,
}, (payload, done) =>
        User.findById(payload.id)
            .catch((err) => done(err, null))
            .then((user: any) => !!user
                ? done(null, user)
                : done(null, null))
);

export const pp = new passport.Passport().use(jwtStrategy);

export const Authenticate = Webpart.exec(({ req, res, next }) =>
    Future.Future(
        (reject, resolve) => {
            pp.authenticate(
                'jwt',
                { session: false },
                (err, user) =>
                    err
                        ? reject(res.status(500))
                        : !!user
                            ? resolve(user)
                            : reject(res.status(401)),
            )(req, res, next);
        },
    ),
);
