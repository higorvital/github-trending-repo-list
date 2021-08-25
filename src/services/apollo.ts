import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

const authLink = setContext((_, { headers }) => {

    return {
      headers: {
        ...headers,
        authorization: `Bearer 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` ,
      }
    }
  });

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(
      // {
      //   typePolicies: {
      //     Query: {
      //       fields: {
      //         feed: {
      //           keyArgs: false,
      //           merge(existing = [], incoming) {
      //             return [...existing, ...incoming];
      //           },
      //         }
      //       }
      //     }
      //   }
      // }
    )
});

export default apolloClient;