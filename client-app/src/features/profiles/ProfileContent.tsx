import {Tab, TabPane} from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos.tsx";
import {Profile} from "../../app/models/profile.ts";
import {observer} from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout.tsx";

interface Props {
    profile: Profile
}

export default observer(function ProfileContent({profile}: Props) {
    const panes = [
        {menuItem: 'About', render: () => <ProfileAbout />},
        {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} />},
        {menuItem: 'Event', render: () => <TabPane>Event Content</TabPane>},
        {menuItem: 'Followers', render: () => <TabPane>Followers Content</TabPane>},
        {menuItem: 'Following', render: () => <TabPane>Following Content</TabPane>}
    ];
    
    return (
        <Tab menu={{fluid: true, vertical: true}} menuPosition={'right'} panes={panes} />
    )
})