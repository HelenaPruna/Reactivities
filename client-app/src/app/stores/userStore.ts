import {User, UserFormValues} from "../models/user.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {store} from "./store.ts";
import {router} from "../router/Routes.tsx";

const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
]

export default class UserStore {
    user: User | null = null;
    
    constructor() {
        makeAutoObservable(this)
    }
    
    get isLoggedIn(){
        return !!this.user;
    }
    
    login = async (creds: UserFormValues) => {
        const user = await agent.Account.login(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => {
            this.user = user;
            if (!this.user.icon) this.setIcon();
        });
        await router.navigate('/activities');
        store.modalStore.closeModal();
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
                this.setIcon();
            });
            await router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
    
    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }
    
    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(()=>this.user = user);
        } catch (error) {
            console.log(error)
        }
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

    setIcon = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        if (this.user) this.user.icon = colors[randomIndex];
    }
}