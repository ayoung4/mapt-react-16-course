import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    created: { type: Date, default: Date.now },
});

interface IUser extends mongoose.Document {
    name: string;
    password: string;
    email: string;
    increment: any;
    model: any;
}

export const User = mongoose.model<IUser>('users', UserSchema);

export const ProfileSchema = new mongoose.Schema({
});