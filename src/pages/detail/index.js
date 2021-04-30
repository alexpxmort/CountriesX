/**
 * Página de Detalhes do País
 * para ver os markers do paises mais próximos
 * reduza o zoom na tela
 * 
 */




import React,{useEffect,useState} from 'react'
import Spinner from '../../components/loading/loading.compont'
import Map from '../../components/map'
import { getCounriesByAlpha2Code } from '../../services/county.service'
import {empty} from '../../utils/string.utils'
import EditIcon from '@material-ui/icons/Edit';

import './styles.css'

const DetailPage  = ({match,history})=>{

    const [ loading,setLoading] = useState(true)
    const[country,setCountry] = useState(null)
   


    useEffect(()=>{
        initial()
    });

   

    const code =(empty(match))?window.location.href.split('/detail/')[0]: match.params.code;

    const initial = async ()=>{
      try{
        let data = await getCounriesByAlpha2Code(code)
        if(data.length > 0){
            setCountry(data[0])
        }

        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }

  
    const handleEdit = (code)=>{
        history.push(`/edit/${code}`)
    }

  
    if(loading){
        return (
            <Spinner/>
        )
    }else{
        return(
            <div className='container_card_detail' data-testid={`${code}detail`} id={`${code}detail`}>
               <img src={country.flag.svgFile}/>
               <span id={`${country.name}detail`}>Nome: {country.name}</span>
               <span id={`${country.capital}detail`}>Capital: {empty(country.capital)?'Não possuí':country.capital}</span>
               <span id={`${country.area}detail`}>Área: {empty(country.area)?'Não possuí':country.area} km²</span>
               <span id={`${country.population}detail`}>População: {country.population}</span>
                
               <span id={`${country}topLeveldetail`}>Top Leven Domains:</span>
               {
                country.topLevelDomains.map((val,idx)=>{
                    return (
                        <span id={`${country}topLeveldetailname`} key={idx}>{val.name}</span>
                    )
                })
               }
               <EditIcon onClick={()=>handleEdit(code)} style={{cursor:'pointer'}}/>
               <Map country={country} latitude={country.location.latitude} longitude={country.location.longitude}/>
            </div>
        )
    }
}


export default DetailPage;