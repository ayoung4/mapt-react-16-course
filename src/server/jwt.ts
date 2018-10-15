import { Strategy, ExtractJwt } from 'passport-jwt';

export const jwtStrategy = (secretOrKey: string) => new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
}, (payload, done) => {
    done(null, payload)
});