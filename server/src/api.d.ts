interface IDocument {
    _id: string;
    id: string;
}

declare interface IAppSettings {
    apiSecret: string;
    mongoURI: string;
    secretOrKey: string;
}

declare interface IUser extends IDocument {
    name: string;
    password: string;
    email: string;
    increment: any;
    model: any;
}

declare interface IProfile extends IDocument {
    owner: string;
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
