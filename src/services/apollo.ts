import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import {GITHUB_TOKEN} from '@env';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // console.log(GITHUB_TOKEN)
    return {
      headers: {
        ...headers,
        authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}`: `` ,
      }
    }
  });

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default apolloClient;