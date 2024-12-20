import {Grid, GridColumn, Loader} from "semantic-ui-react";
import ActivityList from "./ActivityList.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import ActivityFilters from "./ActivityFilters.tsx";
import {PagingParams} from "../../../app/models/pagination.ts";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder.tsx";


export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }
    
    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities().catch((error) => console.log(error));
    }, [loadActivities, activityRegistry.size]);
    
    return(
        <Grid>
            <GridColumn width={'10'}>
                {activityStore.loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
                    <>
                        <ActivityListItemPlaceholder />
                        <ActivityListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <ActivityList/>
                    </InfiniteScroll>
                )}
            </GridColumn>
            <GridColumn width={'6'}>
                <ActivityFilters />
            </GridColumn>
            <GridColumn width={10}>
                <Loader active={loadingNext} />
            </GridColumn>
        </Grid>
    )
})