/**
 * Mutations
 * 
 */




import {gql} from '@apollo/client'
import { GET_COUNTRIES_CLIENT } from '../queries'




export const UPDATE_COUNTRY = gql`
  mutation UpdateCountry($alpha2Code: String!,$updatedCountry:Object!){
    updateCountry(alpha2Code: $alpha2Code,,updatedCountry:$updatedCountry) @client
  }
`;

export const typeDefs = gql`
    extend type Mutation{
        UpdateCountry(alpha2Code: String!,updatedCountry:Object!):Array
    }
`

export const resolvers = {
    Mutation:{
        updateCountry:(_root,_args,{cache})=>{

            const {alpha2Code,updatedCountry} = _args
            
            let {countries} = cache.readQuery({
                query:GET_COUNTRIES_CLIENT
            });

            let _countries = [...countries]

            for(var cont = 0;cont<=_countries.length;cont++){
                if(_countries[cont]){
                    if(_countries[cont].alpha2Code === alpha2Code){
                        let _obj = {}

                        Object.assign(_obj, _countries[cont]);
                
                        for(var key in updatedCountry){
                            if(updatedCountry.hasOwnProperty(key)){
                                _obj[key] = updatedCountry[key]
                            }
                           
                        }

                        _countries[cont] = _obj
                    }
                }
               
            }


            cache.writeQuery({
                query:GET_COUNTRIES_CLIENT,
                data:{
                    countries:_countries
                }
            })
        }
    }
}
