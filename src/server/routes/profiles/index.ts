import * as Future from 'fluture';

import * as Profiles from 'Server/api/profiles';
import { Webpart } from 'Server/webpart';
import { AuthPart } from 'Server/passport';

const LoggedInUserProfile = Webpart.exec(
    ({ req, res }) =>
        Future.Future(
            (reject, resolve) =>
                Profiles.findByOwner(req.user.id)
                    .bimap(
                        () => reject(res.status(500).write('error finding profile')),
                        (profile: any) =>
                            profile
                                ? resolve(profile)
                                : reject(res.status(404)),
                ) as any
        )
);

export const ProfilesApi = Webpart.path('api/profile/current')
    .concat(Webpart.GET)
    .concat(AuthPart)
    .concat(LoggedInUserProfile);
