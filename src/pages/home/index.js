

import {withRouter} from 'react-router-dom'

import React,{useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {client} from '../../config/client-graphql'
import Card from '../../components/card';
import './styles.css'
import { useState } from 'react';

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
   
    useEffect(()=>{
        initial()
    });

    const initial = ()=>{
        client.query({
            query:COUNTRIES
        }).then(res => {
            const{Country} = res.data;

           setData(Country)

        })
    }

    useEffect(()=>{
        console.log(data[0])
    },[data])


   
        
    return (
        <div data-testid="container_card" className='container_row'>
            {
                data.map((val,idx)=>(
                    <Card name={val.name} key={idx} url={val.flag.svgFile} capital={val.capital}/>
                ))
            }
        </div>
    )
}

export default withRouter(HomePage);

