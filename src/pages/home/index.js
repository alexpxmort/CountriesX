
/**
 * Página de Home do País
 * com Listagem e Pesquisa dos paises por nome
 * 
 */


import React,{useCallback, useEffect,useRef} from 'react';
import { useQuery} from '@apollo/react-hooks';
import { useState } from 'react';
import {CardListCountries}  from '../../components/card-list-countries/index'
import SearchBox from '../../components/search-box';
import { Button } from '@material-ui/core';
import { getCounries } from '../../services/county.service';
import Spinner from '../../components/loading/loading.compont';
import { GET_COUNTRIES_CLIENT } from '../../graphql/queries';
import {empty} from '../../utils/string.utils'
import { client } from '../../config/client-graphql';
import Total from '../../components/total';


const HomePage = ({history})=>{

    const[loading,setLoading]  = useState(true)
    const[searchField,setSearchField] = useState('')
    const refInput = useRef(null)
    const {data} = useQuery(GET_COUNTRIES_CLIENT)
   
    useEffect(async ()=>{
      if(empty(data.countries)){
        let _data = await getCounries();
         await  modifyData(_data)
      }
        setLoading(false)
      
    },[])

  
  const modifyData = (newData)=>{
      client.cache.writeQuery({
      query: GET_COUNTRIES_CLIENT,
      data: {
        countries: newData,
       },
     });
  }


    const filteredData  = (!empty(data) && !empty(data.countries))? data.countries.filter((country) => 
    country.name.toLowerCase().includes(searchField.toLowerCase())
  ):[];

    const goDetail = (code)=>{
      history.push(`/detail/${code}`)
    }


    const  handleClick= useCallback(()=>{
    
      let search = refInput.current.querySelector('input').value
      
      setSearchField(search)

    },[])


    return (
        <div data-testid="container_card">
            <Total label={'Countries'} total={filteredData.length}/>
            <SearchBox placeholder={'Procurar por Nome:'} ref={refInput}/>
            <Button  style={{marginLeft:10,marginTop:15,padding:15}} variant="contained" color="primary" type={'button'} onClick={handleClick}>
              Buscar
            </Button>
          
          {
            (loading)?(
              <Spinner/>
            ):(
              <CardListCountries countries={filteredData} onClick={goDetail}/>
            )
          }
        </div>
    )
}

export default HomePage;

