import { Strategy, ExtractJwt } from 'passport-jwt';
import * as passport from 'passport';
import * as Future from 'fluture';

import { Webpart } from 'webpart';
import { User } from 'api/users';

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

export const authenticateRequest =
    ({ req, res, next }: Webpart.IRequest) =>
        Future.Future<{}, IUser>(
            (reject, resolve) => {
                pp.authenticate(
                    'jwt',
                    { session: false },
                    (err, user) =>
                        err
                            ? reject(err)
                            : resolve(user),
                )(req, res, next);
            },
        );

export const AuthPart = Webpart.exec(({ req, res, next }) =>
    authenticateRequest({ req, res, next })
        .chainRej(
            () => Future.reject(res.status(500))
        )
        .chain((user) => !!user
            ? Future.resolve(user)
            : Future.reject(
                res
                    .status(401)
                    .json({ message: 'unauthorized' }),
            ),
        ),
);

