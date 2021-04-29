import React,{useEffect,useState} from 'react'
import Spinner from '../../components/loading/loading.compont'
import Map from '../../components/map'
import { getCounriesByAlpha2Code } from '../../services/county.service'
import {useQuery} from '@apollo/react-hooks'

import './styles.css'
import { GET_COUNTRIES_CLIENT } from '../../graphql/queries'
import { empty } from '../../utils/string.utils'

const DetailPage  = ({match})=>{

    const [ loading,setLoading] = useState(true)
    const[country,setCountry] = useState(null)
    const {data} = useQuery(GET_COUNTRIES_CLIENT)

    const[fiveCountrys,setFiveCountrys] = useState([])

    console.log(data)

    useEffect(()=>{
        initial()
    });

    const code = match.params.code;

    const initial = async ()=>{
      try{
        let data = await getCounriesByAlpha2Code(code)
        if(data.length > 0){
            setCountry(data[0])

           
            console.log(data[0].distanceToOtherCountries)

            let _arr = []
            data[0].distanceToOtherCountries.forEach(
                (val)=>{
                    let _country = filteredByName(val.countryName)

                    if(!empty(_country)){
                        let _obj = {
                            distanceInKm:val.distanceInKm,
                            countryName:val.countryName,
                            location:{
                                latitude:_country[0].location.latitude,
                                longitude:_country[0].location.longitude
                            }
                        }

                        _arr.push(_obj)
                    }
                }
            )

            setFiveCountrys(_arr)
        }
        setLoading(false)

      }catch(err){
        console.log(err)
      }
    }

    const filteredByName  = (name)=>{
      return  (!empty(data) && !empty(data.countries))? data.countries.filter((country) => 
      country.name.toLowerCase().includes(name.toLowerCase())
      ):[];
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
               <Map fiveCountrys={fiveCountrys} latitude={country.location.latitude} longitude={country.location.longitude}/>
            </div>
        )
    }
}


export default DetailPage;