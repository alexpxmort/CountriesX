import React from 'react'
import Card from '../card';
import  './styles.css';

export const CardListCountries  = (props)=>(
    <div className='container_row'>
         {
            props.countries.map((country,idx)=>(
                <Card name={country.name} key={idx} alpha2Code = {country.alpha2Code} url={country.flag.svgFile} capital={country.capital} onClick={props.onClick}/>
            ))
          }
    </div>
);