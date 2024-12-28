import {observer} from "mobx-react-lite";
import { Label, List, ListItem, Popup} from "semantic-ui-react";
import {Profile} from "../../../app/models/profile.ts";
import {Link} from "react-router-dom";

interface Props{
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees}: Props) {
    return(
        <List horizontal>
            {attendees.map(attendee => (
                <Popup hoverable key={attendee.username} content={attendee.displayName} trigger={
                        <ListItem key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                            <Label circular color={attendee.icon} content={attendee.displayName[0]}
                                   style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "35px", // Adjust size as needed
                                    height: "35px", // Equal width and height ensure a perfect circle
                                    fontSize: "15px", // Adjust font size to fit inside
                                    padding: 0, // Remove any default padding
                                }} />
                        </ListItem>
                    }>
                </Popup>
            ))}
        </List>
    )
})