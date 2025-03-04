import {
    Button,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Label,
    Menu,
    MenuItem,
    SemanticCOLORS
} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

export default observer(function NavBar(){
    const {userStore: {user, logout}} = useStore();
    return(
        <Menu inverted fixed={"top"}>
            <Container>
                <MenuItem as={NavLink} to='/' header>
                    <img src= "/assets/logo.png" alt={"logo"} style={{marginRight: '10px'}}/>
                    Reactivities
                </MenuItem>
                <MenuItem as={NavLink} to='/activities' name={"Activitats"}/>
                <MenuItem >
                    <Button as={NavLink} to='/createActivity' positive content={"Crea una activitat"}/>
                </MenuItem>
                <MenuItem position='right'>
                    <Label circular color={user?.icon as SemanticCOLORS} style={{marginRight: 5}} content={user?.displayName[0]} />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <DropdownMenu>
                            <DropdownItem as={Link} to={`/profiles/${user?.username}`} text='El meu perfil' icon='user' />
                            <DropdownItem onClick={logout} text='Tancar sessió' icon='power' />
                        </DropdownMenu>
                    </Dropdown>
                </MenuItem>
            </Container>
        </Menu>
    )
})