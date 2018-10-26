import * as Users from 'Server/api/users';
import * as Future from 'fluture';
import { Either } from 'monet';

import * as crypt from 'Server/crypt';
import * as auth from 'Server/auth';
import { Webpart } from 'Server/webpart';

import { Validation } from 'Server/validation';

import {
    passwordLengthValidator,
    emailRegexValidator,
} from './validators';

export const validateLogin = Webpart.validate(
    Validation.empty()
        .concat(emailRegexValidator)
        .concat(passwordLengthValidator)
);

const loginUserWithPassword:
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
    Users.findByEmail(req.body.email)
        .chain(loginUserWithPassword(req.body.password))
        .bimap(
            () => res.status(500).json({ message: 'internal server error' }),
            (login) => login.isRight()
                ? res.status(200).json(login.right())
                : res.status(400).json(login.left()),
    ),
);
