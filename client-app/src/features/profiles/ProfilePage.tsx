import {Grid} from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader.tsx";
import ProfileContent from "./ProfileContent.tsx";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {useStore} from "../../app/stores/store.ts";
import {useEffect} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";

export default observer(function ProfilePage() {
    const {username} = useParams<{ username: string }>();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile} = profileStore;
    
    useEffect(() =>{
        if (username != null) {
            loadProfile(username);
        }
    }, [loadProfile, username])
    
    if(loadingProfile) return <LoadingComponent content={'Loading profile'} />
    
    return(
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>
                }
            </Grid.Column>
        </Grid>

    )
})