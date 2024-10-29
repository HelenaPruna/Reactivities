import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {
    Card,
    CardGroup,
    CardHeader,
    Grid,
    GridColumn, Header,
    Image,
    Tab,
    TabPane,
    TabProps
} from "semantic-ui-react";
import {useEffect} from "react";
import {UserActivity} from "../../app/models/profile.ts";
import {Link} from "react-router-dom";
import {format} from "date-fns";


export default observer(function ProfileActivities(){
    const {profileStore} = useStore();
    const {profile, userActivities, loadingActivities, loadActivities } = profileStore;

    const panes = [
        {menuItem: 'Future activities', pane: {key: 'future'}},
        {menuItem: 'Past activities',  pane: {key: 'past'}},
        {menuItem: `Activities hosted by ${profile?.displayName}`, pane: {key: 'hosting'}}
    ];
    
    useEffect(() => {
        loadActivities(profile!.username).catch((error) => console.log(error));
    }, [loadActivities, profile]);
    
    const handleChangeTab = async (data: TabProps) => {
        await loadActivities(profile!.username, panes[data.activeIndex as number].pane.key)
    };
    
    return (
        <TabPane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Activities'} />
                </Grid.Column>
                <GridColumn width={16}>
                    <Tab 
                        menu={{ secondary: true, pointing: true }} panes={panes} 
                        onTabChange={(_, data) => handleChangeTab(data) } 
                    />
                    <br />
                    <CardGroup itemsPerRow={4}>
                        {userActivities.map((activity:UserActivity) => (
                            <Card as={Link} to={`/activities/${activity.id}`} key={activity.id}>
                                <Image src={`/assets/categoryImages/${activity.category}.jpg`} 
                                       style={{ minHeight: 100, objectFit: 'cover' }} />
                                <CardHeader textAlign='center'>{activity.title}</CardHeader>
                                <Card.Meta textAlign='center'>
                                    <div>{format(new Date(activity.date), 'do LLL yyyy')}</div>
                                    <div>{format(new Date(activity.date), 'H:mm')}</div>
                                </Card.Meta>                           
                            </Card>
                        ))}
                    </CardGroup>
                </GridColumn>
            </Grid>
        </TabPane>
    )
    
})