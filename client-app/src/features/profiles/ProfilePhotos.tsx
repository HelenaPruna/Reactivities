import {observer} from "mobx-react-lite";
import {Button, ButtonGroup, Card, CardGroup, Grid, GridColumn, Header, Image, TabPane} from "semantic-ui-react";
import {Photo, Profile} from "../../app/models/profile.ts";
import {useStore} from "../../app/stores/store.ts";
import {SyntheticEvent, useState} from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget.tsx";

interface Props {
    profile: Profile
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const {profileStore: {isCurrentUser, uploadPhoto, 
        uploading, loading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');
    
    function handlePhotoUpload(file: any) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }
    
    return(
        <TabPane>
            <Grid>
                <GridColumn width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add photo'} 
                        onClick={() => setAddPhotoMode(!addPhotoMode)} />
                    )}

                </GridColumn>
                <GridColumn width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <CardGroup itemsPerRow={5}>
                            {profile.photos?.map(photo=> (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <ButtonGroup>
                                            <Button
                                                basic
                                                color='green'
                                                content='Main'
                                                name={'main' + photo.id}
                                                loading={target === 'main' + photo.id && loading}
                                                disabled={photo.isMain}
                                                onClick={e => handleSetMainPhoto(photo, e)}
                                            />
                                            <Button
                                                name={photo.id}
                                                loading={loading && photo.id === target}
                                                onClick={(e) => handleDeletePhoto(photo, e)}
                                                basic
                                                color='red'
                                                icon='trash'
                                                disabled={photo.isMain}
                                            />
                                        </ButtonGroup>
                                    )}
                                </Card>
                            ))}
                        </CardGroup>
                    )}
                </GridColumn>
            </Grid>
            
        </TabPane>
    )
    
})