import * as Future from 'fluture';
import * as R from 'ramda';
import { Either } from 'monet';

import * as Users from 'api/users';
import * as crypt from 'crypt';
import * as auth from 'auth';
import { Webpart } from 'webpart';

import { Validation } from 'validation';

import {
    passwordLengthValidator,
    emailRegexValidator,
} from './validators';

export const validateLogin = Webpart.validate(
    Validation.empty()
        .concat(emailRegexValidator)
        .concat(passwordLengthValidator)
);

const fail = (err: object) => Future.resolve(Either.Left(err));

const incorrectPassword = { password: 'incorrect password' };
const emailNotFound = { email: 'email not found' };
const tokenError = { message: 'failed to create token' };

type Login = (password: string) => (user: IUser) => Future.FutureInstance<{}, Either<any, any>>

const loginUserWithPassword: Login =
    (password) =>
        (user) =>
            !user

                ? fail(emailNotFound)

                : crypt.compare(password, user.password)
                    .chain((matches) =>
                        !matches

                            ? fail(incorrectPassword)

                            : auth.createToken(user._id)
                                .bimap(
                                    () => Either.Left(tokenError),
                                    (token) => Either.Right({ token }),
                                )

                    );

export const Login = Webpart.exec(({ req, res }) =>
    Users.findByEmail(req.body.email)
        .chain(loginUserWithPassword(req.body.password))
        .bimap(
            () => res.status(500).json({ message: 'internal server error' }),
            (login) => login.isRight()
                ? res.status(200).json(login.right())
                : res.status(400).json(login.left()),
        ),
);
