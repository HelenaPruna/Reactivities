import {observer} from "mobx-react-lite";
import {Image, List, ListItem, Popup} from "semantic-ui-react";
import {Profile} from "../../../app/models/profile.ts";
import {Link} from "react-router-dom";

interface Props{
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees}: Props) {
    const styles = {
        borderColor: 'orange',
        borderWidth: 2
    }
    return(
        <List horizontal>
            {attendees.map(attendee => (
                <Popup hoverable key={attendee.username} content={attendee.displayName} trigger={
                        <ListItem key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                            <Image 
                                size='mini' 
                                circular src={attendee.image || '/assets/user.png'} 
                                bordered
                                style={attendee.following ? styles : null}
                            />
                        </ListItem>
                    }>
                </Popup>
            ))}
        </List>
    )
})