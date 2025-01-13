import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {useStore} from "../../../app/stores/store.ts";
import {ca} from "date-fns/locale";

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer (function ActivityDetailedHeader({activity}: Props) {
    const {activityStore: {updateAttendance, loading, cancelActivityToggle }} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {activity.isCancelled &&
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                           ribbon color='red' content='Cancelled' />
                }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.date!, 'dd MMMMMM yyyy' , {locale: ca})}</p>
                                <p>
                                    Organitzat per <strong><Link to={`/profiles/${activity.host?.username}`} >{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <>
                        <Button
                            color={activity.isCancelled ? 'green' : 'red'}
                            floated='left' basic
                            content={activity.isCancelled ? 'Reactiva l\'activitat' : 'Cancel·la l\'Activitat'}
                            onClick={cancelActivityToggle}
                            loading={loading}
                        />
                        <Button as={Link} disabled={activity.isCancelled}
                                to={`/manage/${activity.id}`} color='orange' floated='right'>
                            Modifica l'activitat
                        </Button>
                    </>
                ) :  activity.isGoing? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel·la la participació</Button>
                ) : (
                    <Button disabled={activity.isCancelled} loading={loading} onClick={updateAttendance} color='teal'>
                        Apunta't a l'activitat!
                    </Button>
                )}
            </Segment>
        </Segment.Group>
    )
})

