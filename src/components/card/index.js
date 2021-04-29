import React,{useEffect,useState} from 'react'

import './styles.css'

const Card  = ({name,url,capital,onClick})=>{
    return(
        <div className='container_card' data-testid={name} onClick={()=>onClick(name)}>
           <img src={url}/>
           <span id={`${name}x`}>Nome: {name}</span>
           <span id={`${capital}x`}>Capital: {capital}</span>
        </div>
    )
}


export default Card;