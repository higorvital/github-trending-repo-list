import React from 'react';
import { GET_REPOSITORY } from '../../api/queries';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { 
  Container,
  Title,
  Owner,
  OwnerAvatar,
  OwnerName,
  Description,
  Info,
  InfoItem,
  InfoItemText,
  Loading,
  FavoriteButton,
  Url,
  InfoItemTop,
  InfoItemBottom
} from './styles';
import { useQuery } from '@apollo/client';
import { ActivityIndicator, Text } from 'react-native';
import IQueryRepositoryResponse from '../../dtos/IQueryRepositoryResponse';
import { useRoute } from '@react-navigation/native';
import { useFavorite } from '../../hooks/favorite';

interface RouteParams{
  name: string;
  owner: string;
}

const Repository: React.FC = () => {

  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const {name, owner} = routeParams;

  const {isFavorite, addFavorite} = useFavorite();

  const {loading, data} = useQuery<IQueryRepositoryResponse>(
    GET_REPOSITORY,
    {
      variables: {
        name,
        owner
      }
    }
  );

  return (
      <Container>
        {
          loading ? (
            <Loading>
              <ActivityIndicator testID="repository-loading" size={20} />
            </Loading>
          ) : data && <>
                <FavoriteButton onPress={()=>addFavorite(data.repository)}>
                    {
                        isFavorite(data.repository) 
                        ? <FontAwesomeIcon name="star" size={20} color="#ffc640" />
                        : <FontAwesomeIcon name="star-o" size={20} color="#ffc640" />
                    }
                </FavoriteButton>
                <Title>
                  {name}
                </Title>
                <Owner>
                  <OwnerAvatar source={
                      {
                        uri: data.repository.owner.avatarUrl
                      }
                    } 
                  />
                  <OwnerName>
                    {data.repository.owner.login}
                  </OwnerName>
                </Owner>
                <Url>
                  {data.repository.url}
                </Url>
                {
                  data.repository.description &&
                  <Description>
                    {data.repository.description}
                  </Description>
                }
                <Info>
                  <InfoItem>
                    <InfoItemTop>
                      <FontAwesomeIcon name="star" size={24} color="#333" />
                      <InfoItemText>
                        {data.repository.stargazerCount}
                      </InfoItemText>
                    </InfoItemTop>
                    <InfoItemBottom>
                      Estrelas
                    </InfoItemBottom>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemTop>
                      <FontAwesomeIcon name="code-fork" size={24} color="#333" />
                      <InfoItemText>
                        {data.repository.forkCount}
                      </InfoItemText>
                    </InfoItemTop>
                    <InfoItemBottom>
                      Forks
                    </InfoItemBottom>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemTop>
                      <FeatherIcon name="info" size={24} color="#333" />
                      <InfoItemText>
                        {data.repository.allIssues.totalCount}
                      </InfoItemText>
                    </InfoItemTop>
                    <InfoItemBottom>
                      Issues
                    </InfoItemBottom>
                  </InfoItem>
                </Info>
              </>
        }
      </Container>
  );
}

export default Repository;