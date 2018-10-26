import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    created: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser & mongoose.Document>('users', UserSchema);
