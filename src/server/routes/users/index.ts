import * as Models from 'Server/models';
import * as gravatar from 'gravatar';
import * as Future from 'fluture';
import * as R from 'ramda';
import { Maybe, Either } from 'monet';

import * as crypt from 'Server/crypt';
import * as auth from 'Server/auth';
import { Webpart } from 'Server/webpart';

interface IUser {
    _id?: string
    name: string;
    password: string;
    email: string;
}

const findUserByEmail =
    (email: string) =>
        Future.Future<{}, IUser>(
            (reject, resolve) => {
                Models.User.findOne({ email })
                    .then(resolve)
                    .catch(reject)
            },
        );

const insertUser =
    R.curry(
        (email: string, name: string, password: string) =>
            Future.Future<{}, any>(
                (reject, resolve) => {
                    new Models.User({
                        name,
                        email,
                        avatar: gravatar.url(email, {
                            s: 200,
                            r: 'r',
                        }),
                        password,
                    })
                        .save()
                        .then(resolve)
                        .catch(reject)
                }
            )
    );

const register =
    (email: string, name: string, password: string) =>
        crypt.genHash(password)
            .chain(insertUser(email, name))

const registerIfNotUser:
    (email: string, name: string, password: string) => (user: IUser) => Future.FutureInstance<{}, Maybe<IUser>> =
    (email, name, password) =>
        (user) => user
            ? Future.resolve(Maybe.None())
            : register(email, name, password)
                .map((user) => Maybe.Some(user));

const checkAndRegister =
    (email: string, name: string, password: string) =>
        findUserByEmail(email)
            .chain(registerIfNotUser(email, name, password))

export const Register = Webpart.exec(({ req, res }) =>
    checkAndRegister(req.body.email, req.body.name, req.body.password)
        .bimap(
            () => res.status(500).json({ message: 'internal server error' }),
            (registration) =>
                registration.isSome()
                    ? res.status(200).json(registration.some())
                    : res.status(400).json({ email: 'email already exists' }),
    ));

const loginIfUser:
    (password: string) => (user: IUser) => Future.FutureInstance<{}, Either<any, any>> =
    (password) =>
        (user) =>
            !user
                ? Future.resolve(Either.Left({ email: 'email not found' }))
                : crypt.compare(password, user.password)
                    .chain((matches) => !matches
                        ? Future.resolve(Either.Left({ password: 'incorrect password' }))
                        : auth.createToken(user._id).bimap(
                            () => Either.Left({ message: 'failed to create token' }),
                            (token) => Either.Right({ token }),
                        )
                    );

export const Login = Webpart.exec(({ req, res }) =>
    findUserByEmail(req.body.email)
        .chain(loginIfUser(req.body.password))
        .bimap(
            () => res.status(500).json({ message: 'internal server error' }),
            (login) => login.isRight()
                ? res.status(200).json(login.right())
                : res.status(400).json(login.left()),
    ),
);