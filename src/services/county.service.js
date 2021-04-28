import {client} from '../config/client-graphql'
import { COUNTRIES } from '../graphql/queries';




export const getCounries  = async ()=>{
    const resp = await client.query({
        query:COUNTRIES
    });

    const data = await resp.data;

    const{Country} = data

    return Country

}