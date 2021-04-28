

import {withRouter} from 'react-router-dom'

import React,{useCallback, useEffect,useRef} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {client} from '../../config/client-graphql'
import { useState } from 'react';
import {CardListCountries}  from '../../components/card-list-countries/index'
import SearchBox from '../../components/search-box';
import { Button } from '@material-ui/core';

const COUNTRIES = gql`
  {
    Country {
        name
        nativeName
        alpha2Code
        alpha3Code
        area
        population
        populationDensity
        capital
        demonym
        gini
        location {
          latitude
          longitude
        }
        numericCode
        subregion {
          name
          region {
            name
          }
        }
        officialLanguages {
          iso639_1
          iso639_2
          name
          nativeName
        }
        currencies {
          name
          symbol
        }
        regionalBlocs {
          name
          acronym
          otherAcronyms {
            name
          }
          otherNames {
            name
          }
        }
        flag {
          emoji
          emojiUnicode
          svgFile
        }
        topLevelDomains {
          name
        }
        callingCodes {
          name
        }
        alternativeSpellings {
          name
        }
      }
  }
`;


const REGIONS = gql`
  {
    Region(orderBy: name_asc) {
      name
      children: subregions(orderBy: name_asc) {
        name
        children: countries(orderBy: name_asc) {
          name
        }
      }
    }
  }
`;


const HomePage = ({history})=>{

    const[data,setData] = useState([])
    const[searchField,setSearchField] = useState('')
    const refInput = useRef(null)
   
    useEffect(()=>{
        initial()
    });

    const initial = ()=>{
      try{
        client.query({
          query:COUNTRIES
      }).then(res => {
          const{Country} = res.data;

         setData(Country)

      })
      }catch(err){
        console.log(err)
      }
    }

    const filteredData  = data.filter((country) => 
      country.name.toLowerCase().includes(searchField.toLowerCase())
    );


  

    const  handleClick= useCallback(()=>{
      let search = refInput.current.querySelector('input').value
      

      setSearchField(search)

    },[])

    return (
        <div data-testid="container_card">
            <h2 style={{marginLeft:10}}>Total of Countries: {filteredData.length}</h2>
            <SearchBox placeholder={'Procurar por Nome:'} ref={refInput}/>
            <Button style={{marginLeft:10,marginTop:15,padding:15}} variant="contained" color="primary" type={'button'} onClick={handleClick}>
              Buscar
            </Button>
          
          <CardListCountries countries={filteredData}/>
        </div>
    )
}

export default withRouter(HomePage);

