import React from 'react';
import { useFavorite } from '../../hooks/favorite';
import RepositoryListTemplate from '../../components/RepositoryListTemplate';

const Favorites: React.FC = () => {

  const {favorites} = useFavorite();

  return (
    <RepositoryListTemplate
      title="Favoritos"
      loading={false}
      repositories={favorites}
    />
  );

}

export default Favorites;