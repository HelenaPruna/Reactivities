import {User} from "./user.ts";

export interface IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
}

export class Profile implements IProfile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.Image;
    }
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
}