import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';

import IQueryRepositoriesResponse from '../../dtos/IQueryRepositoriesResponse';

import { GET_TRENDING_REPOSITORIES } from '../../api/queries';
import RepositoryListTemplate from '../../components/RepositoryListTemplate';

const Trending: React.FC = () => {

    const [stars, ] = useState(100);
    const [forks, ] = useState(50);
    const [first, ] = useState(10);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [queryResponse, setQueryReponse] = useState<IQueryRepositoriesResponse>()

    const { loading, data, fetchMore } = useQuery<IQueryRepositoriesResponse>(
        GET_TRENDING_REPOSITORIES,
        {
            variables: {
                stars: 100,
                forks: 50,
                first: 10,
            }
        }
    );

    useEffect(()=>{
        setQueryReponse(data);
    },[loading, data])

    const endReach = useMemo(()=>{

        async function loadMoreRepositories(){

            setLoadingMore(true);

            if(queryResponse?.search.pageInfo.hasNextPage){
    
                const fetchData = await fetchMore({
                    variables: {
                        stars,
                        forks,
                        first,
                        after: queryResponse?.search.pageInfo.endCursor
                    }
                })

                if(fetchData){

                    const {pageInfo, repos: newRepos} = fetchData.data.search;
    
                    const curretRepos = queryResponse ? queryResponse.search.repos: [];

                    setQueryReponse({search: {
                        pageInfo,
                        repos: [
                            ...curretRepos,
                            ...newRepos
                        ]
                    }})

                }
            }

            setLoadingMore(false);

        }

        return {
            onEndReached: loadMoreRepositories,
            onEndReachedThreshhold: 0.1
        }

    },[data, fetchMore, queryResponse]);

    const refreshParams = useMemo(()=>{

        function handleRefresh() {
        
            setRefreshing(true);

            setQueryReponse(data);

            setRefreshing(false);

        }

        return{
            handleRefresh,
            refreshing: refreshing
        }
        
    },[data, refreshing]);

    const repositories = useMemo(()=>{
        // return data?.search.repos.map(repo => repo.repo);
        return queryResponse?.search.repos.map(repo => repo.repo);

    },[queryResponse]);

    return (
        <>
        <RepositoryListTemplate 
            title="Trending"
            loading={loading}
            loadingMore={loadingMore}
            repositories={repositories}
            endReach={endReach}
            refreshParams={refreshParams}
        />
        </>
    );
}

export default Trending;