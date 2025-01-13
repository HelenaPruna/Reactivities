import {Header, Menu, MenuItem} from "semantic-ui-react";
import Calendar from "react-calendar";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store.ts";

export default observer(function ActivityFilters() {
    const{activityStore: {predicate, setPredicate}} = useStore();
    return (
        <>
            <Menu vertical size={'large'} style={{width: '100%', marginTop:25}}>
                <Header icon={'filter'} attached color={'teal'} content={'Filtres'} />
                <MenuItem 
                    content={'Totes les activitats'} 
                    active={predicate.has('all')} 
                    onClick={() => setPredicate('all', 'true')} 
                />
                <MenuItem 
                    content={"Participo"}
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                />
                <MenuItem 
                    content={"Sóc l\'organitzadora"}
                    active={predicate.has('isHost')}
                    onClick={() => setPredicate('isHost', 'true')}
                />
            </Menu>
            <Header/>
            <Calendar 
                onChange={(date) => setPredicate('startDate', date as Date)} 
                value={predicate.get('startDate') || new Date()}
                locale={"ca-CA"}
            />
        </>
    )
})