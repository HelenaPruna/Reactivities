import {User} from "./user.ts";
import {SemanticCOLORS} from "semantic-ui-react";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    icon?: SemanticCOLORS;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[]
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
        this.icon = user.icon;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
    
}

export interface UserActivity {
    id: string;
    title: string;
    category: string;
    date: Date;
}