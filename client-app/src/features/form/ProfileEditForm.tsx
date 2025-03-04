import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput.tsx";
import {Button} from "semantic-ui-react";


interface Props {
    setEditMode: (editMode: boolean) => void; 
}

export default observer(function ProfileEditForm({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore();
    return(
        <Formik 
            initialValues={{displayName: profile?.displayName}} 
            onSubmit={values => {
                    updateProfile(values).then(() => setEditMode(false));
                }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })} >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                    <MyTextInput
                        placeholder='Display Name'
                        name='displayName'
                    />
                    <Button
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    )
    
    
})