import * as _ from 'lodash';

import { Validation } from 'validation';

const passwordLength = ({ password }) => _.isString(password) && password.length > 7;
const emailRegex = ({ email }) => _.isString(email) && !!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.exec(email);
const nameRegex = ({ name }) => _.isString(name); // && !!/^[a-z ,.'-]+$/.exec(name);

export const passwordLengthValidator = Validation.of(
    'your password must consist of at least 7 characters',
    passwordLength,
);

export const emailRegexValidator = Validation.of(
    'your email must be valid',
    emailRegex,
);

export const nameRegexValidator = Validation.of(
    'your name must be valid',
    nameRegex,
);
