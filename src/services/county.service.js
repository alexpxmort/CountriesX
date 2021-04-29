import {client} from '../config/client-graphql'
import { COUNTRIES,COUNTRIES_BY_ALPHA_CODE,CLIENT_SIDE_COUNTRIES } from '../graphql/queries';
import {gql} from 'apollo-boost'



export const getCounries  = async ()=>{
    const resp = await client.query({
        query:COUNTRIES
    });

    console.log(resp)

    const data = await resp.data;

    const{Country} = data

    return Country

}


export const getCounriesByAlpha2Code  = async (alpha2Code)=>{

    const resp = await client.query({
        query:COUNTRIES_BY_ALPHA_CODE,
        variables:{alpha2Code}
    });

    const data = await resp.data;

    const{Country} = data

    return Country

    

}