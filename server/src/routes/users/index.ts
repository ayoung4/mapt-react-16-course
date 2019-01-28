import { Webpart } from 'webpart';
import { AuthPart } from 'auth/passport';

import { Register, validateRegister } from './register';
import { Login, validateLogin } from './login';
import { CurrentUser } from './current';

import { ROUTES } from './constants';

export const UsersApi = Webpart.match([

    Webpart.path(ROUTES.register)
        .concat(Webpart.POST)
        .concat(validateRegister)
        .concat(Register),

    Webpart.path(ROUTES.login)
        .concat(Webpart.POST)
        .concat(validateLogin)
        .concat(Login),

    Webpart.path(ROUTES.current)
        .concat(Webpart.GET)
        .concat(AuthPart)
        .concat(CurrentUser),

]);