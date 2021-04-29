import React from 'react'
import Card from '../card';
import  './styles.css';

export const CardListCountries  = (props)=>(
    <div className='container_row'>
         {
            props.countries.map((country,idx)=>(
                <Card name={country.name} key={idx} url={country.flag.svgFile} capital={country.capital} onClick={props.onClick}/>
            ))
          }
    </div>
);