import { observer } from 'mobx-react-lite'
import {Segment, Header, Comment} from 'semantic-ui-react'
import {useStore} from "../../../app/stores/store.ts";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {formatDistanceToNow} from "date-fns";

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({activityId}: Props) {
    const {commentStore} = useStore();
    useEffect(() => {
        if (activityId){
            commentStore.createHubConnection(activityId);
        }
        return () => commentStore.clearComments();
    }, [commentStore, activityId]);
    
    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'}/>
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                    {comment.displayName}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
            </Segment>
        </>

    )
})
