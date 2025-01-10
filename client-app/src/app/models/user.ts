export interface User{
    username: string;
    displayName: string;
    token: string;
    image?: string;
    icon?: string;
}

export interface UserFormValues{
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}

export interface UserIdentifier {
    username: string;
    displayName: string;
}