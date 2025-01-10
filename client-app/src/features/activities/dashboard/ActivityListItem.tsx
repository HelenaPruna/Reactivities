import {
    Button, Icon,
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemHeader, Label,
    Segment,
    SegmentGroup, SemanticCOLORS
} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Activity} from "../../../app/models/activity.ts";
import {format} from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee.tsx";


interface Props{
    activity: Activity
}
export default function ActivityListItem({activity}: Props) {
    return(
        <SegmentGroup>
            <Segment>
                {activity.isCancelled &&
                    <Label attached='top' color='red' content='Cancelled' style={{ textAlign: 'center' }} />
                }
                <ItemGroup>
                    <Item>
                        <Label circular  style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50px", // Adjust size as needed
                            height: "50px", // Equal width and height ensure a perfect circle
                            fontSize: "20px", // Adjust font size to fit inside
                            padding: 0, // Remove any default padding
                            }} 
                               color={activity.host?.icon as SemanticCOLORS} content={activity.host?.displayName[0]}  />
                        <ItemContent style={{marginLeft: 5}} >
                            <ItemHeader as={Link} to={`/activities/${activity.id}`} >{activity.title}</ItemHeader>
                            <ItemDescription>Hosted by <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link> </ItemDescription>
                            {activity.isHost && (
                                <ItemDescription>
                                    <Label basic color='orange' >
                                        You are hosting this activity
                                    </Label>
                                </ItemDescription>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <ItemDescription>
                                    <Label basic color='green' >
                                        You are going to this activity
                                    </Label>
                                </ItemDescription>
                            )}
                        </ItemContent>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color={'teal'}
                    floated={'right'}
                    content={'View'}
                />
            </Segment>
        </SegmentGroup>
    )
}