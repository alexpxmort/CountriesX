import React,{useEffect,useState} from 'react'
import Spinner from '../../components/loading/loading.compont'

import './styles.css'

const DetailPage  = ({country})=>{

    const [ loading,setLoading] = useState(true)
  
    if(loading){
        return (
            <Spinner/>
        )
    }else{
        return(
            <div className='container_card' data-testid={`${country.name}detail`}>
               <img src={country.url}/>
               <span id={`${country.name}detail`}>Nome: {country.name}</span>
               <span id={`${country.capital}detail`}>Capital: {country.capital}</span>
            </div>
        )
    }
}


export default DetailPage;