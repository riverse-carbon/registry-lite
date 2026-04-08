import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { graphqlUri } from '@/lib/apollo-client';

export const { getClient, query } = registerApolloClient(() => {
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlUri,
      fetchOptions: { cache: 'no-store' },
    }),
  });
});
