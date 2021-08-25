import React from 'react';
import IRepository from '../../dtos/IRepository';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useFavorite } from '../../hooks/favorite';

import {
    Container,
    Header,
    Footer,
    Name,
    FooterItem,
    FooterItemText,
    Description,
    FavoriteButton
} from './styles';

interface RepositoryProps {
    item: IRepository;
}

const Repository: React.FC<RepositoryProps> = ({item}) => {

    const navigation = useNavigation();
    const {isFavorite, addFavorite} = useFavorite();

    return (
        <Container testID="repository-container" onPress={()=>{navigation.navigate('Repository', {
            name: item.name,
            owner: item.owner.login
        })}}
        >
            <Header>
                <Name>{item.nameWithOwner}</Name>
            </Header>
            <Description>
                {item.description}
            </Description>
            <Footer>
                <FooterItem>
                    <FontAwesomeIcon name="star" size={16} color="#000" />
                    <FooterItemText>
                        {item.stargazerCount}
                    </FooterItemText>
                </FooterItem>
                <FooterItem>
                    <FontAwesomeIcon name="code-fork" size={16} color="#000" />
                    <FooterItemText>
                        {item.forkCount}
                    </FooterItemText>
                </FooterItem>
            </Footer>
            <FavoriteButton testID="repository-favorite-button" onPress={()=>addFavorite(item)}>
                {
                    isFavorite(item) 
                    ? <FontAwesomeIcon name="star" size={20} color="#ffc640" />
                    : <FontAwesomeIcon name="star-o" size={20} color="#ffc640" />
                }
            </FavoriteButton>
        </Container>
    );
}

export default Repository;