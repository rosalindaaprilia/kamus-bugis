import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://kamus.if.unismuh.ac.id/graphql', 
  cache: new InMemoryCache(),
});

export default client;
