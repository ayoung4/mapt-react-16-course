import * as jwt from 'jsonwebtoken';

import * as Future from 'fluture';

const settings: IAppSettings = require('Config/keys.js');

export const createToken =
    (id: string) =>
        Future.Future<{}, string>(
            (reject, resolve) =>
                jwt.sign(
                    { id },
                    settings.apiSecret,
                    { expiresIn: 3600 },
                    (err, token) =>
                        err
                            ? reject(err)
                            : resolve(`Bearer ${token}`)
                ),
        );

