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
        title: Yup.string().required('The event title is required'),
        category: Yup.string().required('The event category is required'),
        description: Yup.string().required(),
        date: Yup.string().required(), // this warning never appears, but still it won't let u submit unless u enter a date 
        venue: Yup.string().required(),
        city: Yup.string().required(),
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
            <Header content='Activity details' sub color='teal'  />
            <Formik
                enableReinitialize 
                validationSchema={validationSchema}
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput placeholder='Title'  name='title' />
                        <MyTextAreaInput rows={3} placeholder='Description'  name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category'  name='category' />
                        <MyDateInput 
                            label={'Date'}
                            placeholderText='Date'  
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='d MMMM yyyy h:mm aa'
                        />
                        <Header content='Location details' sub color='teal'  />
                        <MyTextInput placeholder='City'  name='city' />
                        <MyTextInput placeholder='Venue'  name='venue' />
                        <Button 
                            disabled={isSubmitting|| !dirty || !isValid}
                            loading={isSubmitting} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to={'activities'} floated='right' content='Cancel' />
                    </Form>
                )} 
            </Formik>
           
        </Segment>
    )
})
