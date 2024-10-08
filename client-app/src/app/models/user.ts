export interface User{
    username: string;
    displayName: string;
    token: string;
    Image?: string;
}

export interface UserFormValues{
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}