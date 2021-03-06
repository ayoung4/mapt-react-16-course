import { Webpart } from 'webpart';
import { authenticateRequest } from 'auth/passport';

export const CurrentUser = Webpart.exec(({ req, res, next }) =>
    authenticateRequest({ req, res, next })
        .bimap(
            () => res.status(500).json({ message: 'internal server error' }),
            (user) => user
                ? res.json(user)
                : res.status(400).json({ message: 'user not found' })
        ),
);