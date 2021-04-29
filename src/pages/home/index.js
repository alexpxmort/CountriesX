


import React,{useCallback, useEffect,useRef} from 'react';
import { useQuery,useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import {CardListCountries}  from '../../components/card-list-countries/index'
import SearchBox from '../../components/search-box';
import { Button } from '@material-ui/core';
import { getCounries } from '../../services/county.service';
import Spinner from '../../components/loading/loading.compont';
import { CLIENT_SIDE_COUNTRIES, GET_COUNTRIES_CLIENT } from '../../graphql/queries';
import {empty} from '../../utils/string.utils'
import {UPDATE_COUNTRY} from '../../graphql/mutations'
import { client } from '../../config/client-graphql';


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


      const [updateCountry] = useMutation(UPDATE_COUNTRY, { 
        update(cache, { data:{updateCountry} }) {

          console.log('here')
          cache.modify({
            fields: {
              countries(existingCountries = []) {
                console.log(existingCountries)

                let _arr =  [...existingCountries]

                return [_arr];
              }
            }
          });
        }
      });
    

    const filteredData  = (!empty(data) && !empty(data.countries))? data.countries.filter((country) => 
    country.name.toLowerCase().includes(searchField.toLowerCase())
  ):[];

    const goDetail = (code)=>{
      history.push(`/detail/${code}`)
    }


    const  handleClick= useCallback(()=>{
      updateCountry({ variables: { code: 'BR' } });
      let search = refInput.current.querySelector('input').value
      
      setSearchField(search)

    },[])


    return (
        <div data-testid="container_card">
            <h2 style={{marginLeft:10}}>Total of Countries: {filteredData.length}</h2>
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

