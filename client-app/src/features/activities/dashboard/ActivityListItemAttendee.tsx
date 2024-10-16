import {observer} from "mobx-react-lite";
import {Image, List, ListItem, Popup, PopupContent} from "semantic-ui-react";
import {Profile} from "../../../app/models/profile.ts";
import {Link} from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard.tsx";

interface Props{
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees}: Props) {
    return(
        <List horizontal>
            {attendees.map(attendee => (
                <Popup hoverable key={attendee.username} trigger={
                        <ListItem key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                            <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                        </ListItem>
                    }>
                    <PopupContent>
                        <ProfileCard profile={attendee} />
                    </PopupContent>
                </Popup>
            ))}
        </List>
    )
})