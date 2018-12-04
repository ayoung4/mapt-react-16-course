import { Webpart } from 'webpart';
import { AuthPart } from 'auth/passport';

import { Register, validateRegister } from './register';
import { Login, validateLogin } from './login';
import { CurrentUser } from './current';

export const UsersApi = Webpart.match([
    Webpart.path('/api/users/register')
        .concat(Webpart.POST)
        .concat(validateRegister)
        .concat(Register),
    Webpart.path('/api/users/login')
        .concat(Webpart.POST)
        .concat(validateLogin)
        .concat(Login),
    Webpart.path('/api/users/current')
        .concat(Webpart.GET)
        .concat(AuthPart)
        .concat(CurrentUser),
]);