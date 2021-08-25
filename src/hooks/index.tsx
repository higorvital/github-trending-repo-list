import React from 'react';

// import { Container } from './styles';

import { FavoriteProvider } from './favorite';

const AppProvider: React.FC = ({children}) => {
  return (
    <FavoriteProvider>
        {children}
    </FavoriteProvider>
  );
}

export default AppProvider;