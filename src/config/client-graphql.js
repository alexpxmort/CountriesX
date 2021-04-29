import {ApolloClient,InMemoryCache} from '@apollo/client';
import { URL_REQUEST } from '../requests/api/api';

export const client = new ApolloClient({
  uri: URL_REQUEST.url,
  cache:new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          getCountries:(existing,{args,readField})=>{
            const countries = readField('Country') || []
            return countries
          }
        }
      }
    }
  })
});
