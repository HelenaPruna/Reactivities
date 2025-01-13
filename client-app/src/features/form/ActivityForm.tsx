import {Button, Header, Segment} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {useStore} from "../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ActivityFormValues} from "../../app/models/activity.ts";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";
import {v4 as uuid} from 'uuid';
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput.tsx";
import MyTextAreaInput from "../../app/common/form/MyTextArea.tsx";
import MySelectInput from "../../app/common/form/MySelectInput.tsx";
import {categoryOptions} from "../../app/common/options/categoryOptions.ts";
import MyDateInput from "../../app/common/form/MyDateInput.tsx";


export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loadActivity, loadingInitial} = activityStore; 
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('El títol de l\'activitat és necessàri'),
        category: Yup.string().required('La categoria de l\'activitat és necessària'),
        description: Yup.string().required('La descripció de l\'activitat és necessària'),
        date: Yup.string().required('La data de l\'activitat és necessària'), // this warning never appears, but still it won't let u submit unless u enter a date 
        venue: Yup.string().required('El lloc de l\'activitat és necessàri'),
    });
    
    
    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity]);
    
    function handleFormSubmit(activity: ActivityFormValues){
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))

        }
    }
    
    if(loadingInitial) return <LoadingComponent content='Loading activity...' />
    
    return (
        <Segment clearing>
            <Header content={'Detalls de l\'activitat'} sub color='teal'  />
            <Formik
                enableReinitialize 
                validationSchema={validationSchema}
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput placeholder='Títol'  name='title' />
                        <MyTextAreaInput rows={3} placeholder='Descripció'  name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Categoria'  name='category' />
                        <MyDateInput 
                            label={'Date'}
                            placeholderText='Data'  
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='d MMMM yyyy HH:mm'
                        />
                        <MyTextInput placeholder='Lloc'  name='venue' />
                        <Button 
                            disabled={isSubmitting|| !dirty || !isValid}
                            loading={isSubmitting} floated='right' 
                            positive type='submit' content='Crear' />
                        <Button as={Link} to={activity.id? `/activities/${activity.id}`:'/activities'} 
                                floated='right' content='Cancel·lar'
                        />
                    </Form>
                )} 
            </Formik>
           
        </Segment>
    )
})
