import * as jwt from 'jsonwebtoken';

import * as Future from 'fluture';

interface IAppSettings {
    apiSecret: string;
}

const settings: IAppSettings = require('Config/keys.js');

export const sign =
    (id: string, name: string, avatar: string) =>
        Future.Future(
            (reject, resolve) =>
                jwt.sign(
                    { id, name, avatar },
                    settings.apiSecret,
                    { expiresIn: 3600 },
                    (err, token) =>
                        err
                            ? reject(err)
                            : resolve(token)
                ),
        );
