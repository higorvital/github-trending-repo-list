import React from 'react';
import {StatusBar} from 'react-native';
import {ApolloProvider} from "@apollo/client";

import apolloClient from './services/apollo';
import AppProvider from './hooks';
import Routes from './routes/routes';

const App = () => {
   return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
    <ApolloProvider client={apolloClient}>
        <AppProvider>
            <Routes />
        </AppProvider>
    </ApolloProvider>
    </>
   );
};


 export default App;
