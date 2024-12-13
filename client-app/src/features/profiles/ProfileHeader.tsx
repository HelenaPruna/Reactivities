import { Grid, Header, Item, Label, Segment} from "semantic-ui-react";
import {Profile} from "../../app/models/profile.ts";
import {observer} from "mobx-react-lite";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Label circular color={'blue'} key={'blue'} content={profile.displayName[0]}/>
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})