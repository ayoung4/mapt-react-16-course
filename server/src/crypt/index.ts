import * as bcrypt from 'bcryptjs';
import * as Future from 'fluture';
import * as R from 'ramda';

export const genSalt =
    (seed = 10) =>
        Future.Future<{}, string>(
            (reject, resolve) =>
                bcrypt.genSalt(seed, (err, salt) =>
                    err
                        ? reject(err)
                        : resolve(salt)
                ),
        );

export const hash =
    R.curry(
        (str: string, salt: string) =>
            Future.Future<{}, string>(
                (reject, resolve) =>
                    bcrypt.hash(str, salt, (err, hash) =>
                        err
                            ? reject(err)
                            : resolve(hash)
                    ),
            ),
    );

export const genHash =
    (password: string) =>
        genSalt()
            .chain(hash(password))

export const compare =
    R.curry(
        (str: string, hash: string) =>
            Future.Future<{}, string>(
                (reject, resolve) =>
                    bcrypt.compare(str, hash, (err, isCollision) =>
                        err
                            ? reject(err)
                            : resolve(isCollision)
                    ),
            ),
    );