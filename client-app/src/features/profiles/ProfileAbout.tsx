import {observer} from "mobx-react-lite";
import {Button, Grid, GridColumn, Header, TabPane} from "semantic-ui-react";
import {useStore} from "../../app/stores/store.ts";
import {useState} from "react";
import ProfileEditForm from "../form/ProfileEditForm.tsx";



export default observer(function ProfileAbout(){
    const {profileStore: {isCurrentUser, profile}} = useStore();
    
    const [editMode , setEditMode] = useState(false);

    return(
        <TabPane>
            <Grid>
                <GridColumn width={16}>
                    <Header floated='left' icon={'user'} content={ `About ${profile?.displayName}`} />
                    {isCurrentUser && (
                        <Button floated='right' basic content={editMode ? 'Cancel' : 'Edit Bio'}
                                onClick={() => setEditMode(!editMode)} />
                    )}
                </GridColumn>
                <GridColumn width={16}>
                    {editMode ? 
                        <ProfileEditForm setEditMode={setEditMode} />
                     : 
                        (<span style={{whiteSpace: 'pre-wrap'}}>{profile?.bio}</span>)
                    }
                </GridColumn>
            </Grid>
            
        </TabPane>
    )
})