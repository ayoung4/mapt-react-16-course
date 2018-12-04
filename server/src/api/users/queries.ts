import { User } from './model';
import * as Future from 'fluture';

export const findByEmail =
    (email: string) =>
        Future.Future<{}, IUser>(
            (reject, resolve) => {
                User.findOne({ email })
                    .catch(reject)
                    .then(resolve as any)
            },
        );

export const findById =
    (id: string) =>
        Future.Future<{}, IUser>(
            (reject, resolve) => {
                User.findOne({ _id: id })
                    .catch(reject)
                    .then(resolve as any)
            },
        );
