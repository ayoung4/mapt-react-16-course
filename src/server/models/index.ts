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

interface IProfile extends mongoose.Document {
    user: string;
    company?: string;
    website?: string;
    location?: string;
    status?: string;
    skills: string[];
    bio?: string;
    githubUsername?: string;
    experience: Array<{
        title: string;
        company: string;
        location?: string;
        from: Date;
        to?: Date;
        description?: string;
    }>;
    education: Array<{
        school: string;
        degree: string;
        field: string;
        from: Date;
        to?: Date;
        description?: string;
    }>;
}

export const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
    },
    githubUsername: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            field: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            description: {
                type: String,
            },
        },
    ],
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

export const Profile = mongoose.model<IProfile>('profiles', ProfileSchema);
