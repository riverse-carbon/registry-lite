import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const graphqlUri = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3001/graphql';

export function makeApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlUri,
    }),
  });
}

/** Short-lived client for React Server Components / route handlers (no shared cache with the browser). */
export function makeServerApolloClient() {
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlUri,
      fetchOptions: { cache: 'no-store' },
    }),
  });
}
