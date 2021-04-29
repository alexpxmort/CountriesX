import React,{useEffect,useState} from 'react'
import Spinner from '../../components/loading/loading.compont'
import { getCounriesByAlpha2Code } from '../../services/county.service'

import './styles.css'

const DetailPage  = ({match})=>{

    const [ loading,setLoading] = useState(true)
    const[country,setCountry] = useState(null)

    useEffect(()=>{
        initial()
    });

    const code = match.params.code;

    const initial = async ()=>{
      try{
        let data = await getCounriesByAlpha2Code(code)
        if(data.length > 0){
            setCountry(data[0])
            console.log(data)
        }
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }
  
    if(loading){
        return (
            <Spinner/>
        )
    }else{
        return(
            <div className='container_card_detail' data-testid={`${country.name}detail`}>
               <img src={country.flag.svgFile}/>
               <span id={`${country.name}detail`}>Nome: {country.name}</span>
               <span id={`${country.capital}detail`}>Capital: {country.capital}</span>
               <span id={`${country.area}detail`}>Área: {country.area}</span>
               <span id={`${country.population}detail`}>População: {country.population}</span>
                
               <span id={`${country}topLeveldetail`}>Top Leven Domains:</span>
               {
                country.topLevelDomains.map((val,idx)=>{
                    return (
                        <span id={`${country}topLeveldetailname`} key={idx}>{val.name}</span>
                    )
                })
               }
            </div>
        )
    }
}


export default DetailPage;