
import {TextField,FormGroup} from '@material-ui/core';
import {forwardRef} from 'react'

export const SearchBox = ({placeholder},ref)=>{

      return(
        <FormGroup style={{marginTop:40,marginBottom:10,width:500,marginLeft:10}}>
            <TextField type='search' label={placeholder} variant={'outlined'} ref={ref}  />
        </FormGroup>
      )
    
}

export default forwardRef(SearchBox)