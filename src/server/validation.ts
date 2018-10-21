
import { Validation } from 'monet';

import { Webpart } from './webpart';

const validatePassword = ({ password, ...rest }) =>
    password.length < 7
        ? Validation.fail('your password must consist of at least 7 characters')
        : Validation.success({ password, ...rest });

const validateEmail = ({ email, ...rest }) =>
    !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.exec(email)
        ? Validation.fail('your email must be valid')
        : Validation.success({ email, ...rest });

const validateName = ({ name, ...rest }) =>
    !/^[a-z ,.'-]+$/.exec(name)
        ? Validation.fail('your name must be valid')
        : Validation.success({ name, ...rest });

export const validateLogin = Webpart.validate(
    (body) =>
        Validation.of(body)
            .chain(validatePassword)
            .chain(validateEmail),
);

export const validateRegister = Webpart.validate(
    (body) =>
        Validation.of(body)
            .chain(validatePassword)
            .chain(validateEmail)
            .chain(validateName),
);
