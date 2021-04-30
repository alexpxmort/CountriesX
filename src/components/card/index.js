
/**
 * Componente de Card do País
 * 
 */


import { empty } from '../../utils/string.utils';

import './styles.css'

const Card  = ({name,url,capital,alpha2Code,onClick})=>{
    return(
        <div className='container_card' data-testid={name} onClick={()=>onClick(alpha2Code)}>
           <img src={url}/>
           <span id={`${name}x`}>Nome: {name}</span>
           <span id={`${capital}x`}>Capital: {empty(capital)?'Não possuí':capital}</span>
        </div>
    )
}


export default Card;