import React from 'react';
import IRepository from '../../dtos/IRepository';
import { ActivityIndicator, FlatList } from 'react-native';

import {
    Container,
    Title,
    Loading,
    LoadingMore,
} from './styles';

import Repository from '../Repository';

interface RepositoryListTemplateProps{
    title: string;
    loading: boolean;
    loadingMore?: boolean;
    repositories: IRepository[] | undefined;
    endReach?: {
        onEndReached(): Promise<void>;
        onEndReachedThreshhold: number;
    }
    refreshParams?:{
        handleRefresh(): void;
        refreshing: boolean;
    }
    
}

const RepositoryListTemplate: React.FC<RepositoryListTemplateProps> = ({title, loading, repositories, endReach, loadingMore, refreshParams}) => {
  return (
    <Container>
        <Title>{title}</Title>
        {
            loading ? (
                <Loading>
                    <ActivityIndicator testID="repository-list-loading" size="large" color="#fff" />
                </Loading>
            ) : (repositories 
                && <FlatList
                        testID="repository-flat-list"
                        data={repositories}
                        keyExtractor={(repository) => String(repository.nameWithOwner)}
                        onEndReachedThreshold={endReach?.onEndReachedThreshhold}
                        onEndReached={endReach?.onEndReached}
                        ListFooterComponent={loadingMore ? <LoadingMore /> : null}
                        onRefresh={refreshParams?.handleRefresh}
                        refreshing={refreshParams?.refreshing}
                        renderItem={({item})=> (
                            <Repository item={item} />
                        )}
                    />
            )
        }
    </Container>
  );
}

export default RepositoryListTemplate;