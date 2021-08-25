import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {GITHUB_LINK} from '@env'

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

const authLink = setContext((_, { headers }) => {

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${GITHUB_LINK}` ,
      }
    }
  });

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    // uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache(
      {
        typePolicies: {
          Query: {
            fields: {
              feed: {
                // Don't cache separate results based on
                // any of this field's arguments.
                keyArgs: false,
                // Concatenate the incoming list items with
                // the existing list items.
                merge(existing = [], incoming) {
                  console.log("existing")
                  console.log(existing)
                  console.log("incoming")
                  console.log(incoming)
                  return [...existing, ...incoming];
                },
              }
            }
          }
        }
      }
    )
});

export default apolloClient;