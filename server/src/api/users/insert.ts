import * as gravatar from 'gravatar';
import * as Future from 'fluture';
import * as R from 'ramda';

import { User } from './model';
import * as crypt from 'crypt';

const insertUser =
    R.curry(
        (email: string, name: string, password: string) =>
            Future.Future<{}, any>(
                (reject, resolve) => {
                    new User({
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

export const register =
    (email: string, name: string, password: string) =>
        crypt.genHash(password)
            .chain(insertUser(email, name))