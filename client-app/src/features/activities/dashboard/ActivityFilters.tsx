import {Header, Menu, MenuItem} from "semantic-ui-react";
import Calendar from "react-calendar";

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size={'large'} style={{width: '100%', marginTop:25}}>
                <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
                <MenuItem content={'All activities'} />
                <MenuItem content={"I'm going"} />
                <MenuItem content={"I'm hosting"} />
            </Menu>
            <Header/>
            <Calendar />
        </>
    )
}