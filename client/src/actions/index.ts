import { LOGIN } from '../constants';

export const login =
    (username: string, password: string) => ({
        type: LOGIN,
        payload: {
            username,
            password,
        },
    });
