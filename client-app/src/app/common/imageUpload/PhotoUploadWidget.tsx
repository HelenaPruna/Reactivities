import {Button, Grid, GridColumn, Header} from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone.tsx";
import {useEffect, useState} from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper.tsx";
import {observer} from "mobx-react-lite";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default observer(function PhotoUploadWidget({loading, uploadPhoto}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    
    function onCrop(){
        if (cropper){
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }
    
    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])
    
    return(
        <Grid>
            <GridColumn width={4}>
                <Header sub color='teal' content='Step 1 - Add Photo' />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </GridColumn>
            <Grid.Column width={1} />

            <GridColumn width={4}>
                <Header sub color='teal' content='Step 2 - Resize image' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </GridColumn>
            <Grid.Column width={1} />

            <GridColumn width={4}>
                <Header sub color='teal' content='Step 3 - Preview and Upload' />
                {files && files.length > 0 &&
                    <>
                        <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group>
                    </>
                }

                
            </GridColumn>
            
            
        </Grid>
    )
})