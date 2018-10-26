import * as Users from 'Server/api/users';
import * as Future from 'fluture';
import { Maybe } from 'monet';

import { Webpart } from 'Server/webpart';

import { Validation } from 'Server/validation';

import {
    passwordLengthValidator,
    nameRegexValidator,
    emailRegexValidator,
} from './validators';

export const validateRegister = Webpart.validate(
    Validation.empty()
        .concat(passwordLengthValidator)
        .concat(emailRegexValidator)
        .concat(nameRegexValidator)
);

export const Register = Webpart.exec(
    ({ req, res }) =>
        Users.findByEmail(req.body.email)
            .chain(
                (user) => user
                    ? Future.resolve(Maybe.None())
                    : Users.register(req.body.email, req.body.name, req.body.password)
                        .map((user) => Maybe.Some(user)),
        )
            .bimap(
                () => res.status(500).json({ message: 'internal server error' }),
                (registration) =>
                    registration.isSome()
                        ? res.status(200).json(registration.some())
                        : res.status(400).json({ email: 'email already exists' }),
        ),
);