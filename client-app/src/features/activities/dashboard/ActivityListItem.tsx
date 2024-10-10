import {
    Button, Icon,
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemHeader, ItemImage, 
    Segment,
    SegmentGroup
} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Activity} from "../../../app/models/activity.ts";
import {format} from "date-fns";


interface Props{
    activity: Activity
}
export default function ActivityListItem({activity}: Props) {
    return(
        <SegmentGroup>
            <Segment>
                <ItemGroup>
                    <Item>
                        <ItemImage size={'tiny'} circular src='/assets/user.png' />
                        <ItemContent>
                            <ItemHeader as={Link} to={`/activities/${activity.id}`} >{activity.title}</ItemHeader>
                        </ItemContent>
                        <ItemDescription>Hosted by Bob</ItemDescription>
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
                Attendees go here
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