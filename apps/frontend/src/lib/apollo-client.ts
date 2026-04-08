import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const graphqlUri = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3001/graphql';

export function makeApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlUri,
    }),
  });
}
