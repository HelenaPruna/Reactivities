import {Profile, UserActivity} from "../models/profile.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {store} from "./store.ts";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    loading = false;
    userActivities: UserActivity[] = [];
    loadingActivities = false;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    get isCurrentUser(){
        if(store.userStore.user && this.profile){
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }
    
    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
            
        } catch (error){
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !== store.userStore.user?.displayName){
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = {...this.profile, ...profile as Profile};
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadActivities = async (username: string, predicate?: string) => {
        this.loadingActivities = true;
        try {
            const userActivities = await agent.Profiles.listActivities(username, predicate!);
            runInAction(() => {
                this.userActivities = userActivities;
                this.loadingActivities = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingActivities = false);
        }
    }
    
}