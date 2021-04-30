import {ApolloClient,InMemoryCache} from '@apollo/client';
import { URL_REQUEST } from '../requests/api/api';
import {typeDefs,resolvers} from '../graphql/mutations/index'


export const client = new ApolloClient({
  uri: URL_REQUEST.url,
  cache:new InMemoryCache(),
  typeDefs,
  resolvers
});
