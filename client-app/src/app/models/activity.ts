import {Profile} from "./profile.ts";

export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    venue: string;
    hostUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    organizers?: Profile[];
    attendees: Profile[]
}

export class Activity implements Activity {
    constructor(init?: ActivityFormValues) {
        Object.assign(this, init);
    }
}

export class ActivityFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date |null = null;
    venue: string = '';
    
    constructor(activity?: ActivityFormValues) {
        if (activity){
            this.id = activity.id;
            this.title = activity.title;
            this.category = activity.category;
            this.description = activity.description;
            this.date = activity.date;
            this.venue = activity.venue;
        }
    }
}