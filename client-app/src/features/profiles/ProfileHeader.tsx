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
                            <Label circular color={profile.icon} content={profile.displayName[0]}
                                   style={{
                                       display: "flex",
                                       justifyContent: "center",
                                       alignItems: "center",
                                       width: "36px", // Adjust size as needed
                                       height: "36px", // Equal width and height ensure a perfect circle
                                       fontSize: "20px", // Adjust font size to fit inside
                                       padding: 0, // Remove any default padding
                                   }}
                            />
                            <Item.Content style={{alignContent: "center"}}>
                                <Header as='h1' content={profile.displayName}  />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})