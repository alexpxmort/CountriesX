import {useMutation,useQuery,gql} from '@apollo/client'
import { CLIENT_SIDE_COUNTRIES } from '../queries'




export const UPDATE_COUNTRY = gql`
  mutation updateCountry($code: String!) {
    updateCountry(alpha2Code: $code) @client {
     name
    }
  }
`;


 const useUpdateCoutry  = ()=>{
    const[updatedItem] = useMutation(UPDATE_COUNTRY,{
        update(cache,{data:updatedItem}){
            const {countries} = cache.readQuery({
                query:CLIENT_SIDE_COUNTRIES
            })

            cache.writeQuery({
                query:CLIENT_SIDE_COUNTRIES,
                data:{
                    countries:countries
                }
            })
        }
    })
}

export {useUpdateCoutry};