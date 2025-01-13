import {User} from "./user.ts";

export interface Profile {
    username: string;
    displayName: string;
    icon?: String;
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.icon = user.icon;
    }
}


export interface UserActivity {
    id: string;
    title: string;
    category: string;
    date: Date;
}