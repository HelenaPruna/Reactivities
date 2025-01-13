import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useStore} from "../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import LoginForm from "../users/LoginForm.tsx";
import RegisterForm from "../users/RegisterForm.tsx";


export default observer(function HomePage(){
    const {userStore, modalStore} = useStore();
    return(
        <Segment inverted textAlign={'center'} vertical className={'masthead'}>
            <Container text>
                <Header as={'h1'} inverted>
                    <Image size={'massive'} src={'/assets/logo.png'} alt={'logo'} style={{marginBottom:12}} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ?(
                    <>
                        <Header as={'h2'} inverted content={'Benvinguda a Reactivities'} />
                        <Button as={Link} to={'/activities'} size={'huge'} inverted>
                            Vés a les activitats!
                        </Button>
                    </>
                ) :(
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm/>)} size={'huge'} inverted>
                            Inicia sessió!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size={'huge'} inverted>
                            Registra't!
                        </Button>
                    </>
                    
                )}
                
            </Container>
        </Segment>
    )
})