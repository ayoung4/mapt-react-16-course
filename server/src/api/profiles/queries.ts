import { Profile } from './model';
import * as Future from 'fluture';

export const findByOwner =
    (owner: string) =>
        Future.Future<{}, IProfile>(
            (reject, resolve) => {
                Profile.findOne(
                    { owner },
                    (err, profile) =>
                        err
                            ? reject(err)
                            : resolve(profile),
                )
            },
        );
