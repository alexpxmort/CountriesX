
/**
 * Configuração inicial do React com ApolloProvider
 * e configuração do cache inicial do apollo-client
 * paar ser usado como local state management
 * 
 */



import React from 'react';
import ReactDOM from 'react-dom';
import{BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import RouterX from './routes/router.component';
import { ApolloProvider } from '@apollo/react-hooks';
import {client} from '../src/config/client-graphql'
import { GET_COUNTRIES_CLIENT } from './graphql/queries';



export const filter = client.cache.makeVar("");

client.writeQuery({
  query: GET_COUNTRIES_CLIENT,
  data: {
    countries: []
  }
});



ReactDOM.render(
 <ApolloProvider client={client}>
    <BrowserRouter>
     <RouterX/>
   </BrowserRouter>
 </ApolloProvider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();