/**
 * Componente Customizado de Formulario
 * 
 */




 import {Button} from '@material-ui/core';
 import { InputCustom } from '../input-custom';
 import {Form} from '@unform/web'
 const FormCustom = ({id,initialData,handleSubmit})=>{
     return(
         <div style={{marginTop:80,marginLeft:20}}>
             <Form id={id}  initialData={initialData} onSubmit={handleSubmit} data-testid='form_country'>
                 <InputCustom required name={'name'} label="Nome" variant="outlined"  type={'text'}/>
                 <InputCustom  label="Capital"  name={'capital'} variant="outlined"   type={'text'} />
                 <InputCustom  label="Área"  name={'area'} variant="outlined"   type={'text'} />
                 <InputCustom required label="População"  name={'population'} variant="outlined"   type={'text'} />
                 <Button  type={'submit'} variant="contained" color="primary">
                     Salvar
                 </Button>
             </Form>
         </div>
     )
 }
 
 export default FormCustom;