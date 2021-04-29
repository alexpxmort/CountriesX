


import React,{useCallback, useEffect,useRef} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import {CardListCountries}  from '../../components/card-list-countries/index'
import SearchBox from '../../components/search-box';
import { Button } from '@material-ui/core';
import { getCounries } from '../../services/county.service';
import Spinner from '../../components/loading/loading.compont';



const HomePage = ({history})=>{

    const[data,setData] = useState([])
    const[loading,setLoading]  = useState(true)
    const[searchField,setSearchField] = useState('')
    const refInput = useRef(null)
   
    useEffect(()=>{
        initial()
    });

    const initial = async ()=>{
      try{
        let data = await getCounries()
        setData(data)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }

    const filteredData  = data.filter((country) => 
      country.name.toLowerCase().includes(searchField.toLowerCase())
    );

    const goDetail = (code)=>{
      history.push(`/detail/${code}`)
    }


    const  handleClick= useCallback(()=>{
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

