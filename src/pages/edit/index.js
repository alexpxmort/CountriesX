  /**
 * Página de Edit do País
 * 
 */
    

   import FormCustom from "../../components/form/country.form"
   import{useState,useEffect} from 'react'
   import {empty} from '../../utils/string.utils'
   import Spinner from "../../components/loading/loading.compont";
   import { getCounriesByAlpha2Code } from "../../services/county.service";
   import './styles.css'
   import {UPDATE_COUNTRY} from '../../graphql/mutations'
    import {useMutation} from '@apollo/client'
import Message from "../../components/msg_alerts/msg_alerts";

   
   
   const EditCountryPage = ({history,match})=>{
   
       let _initialData = {
           name:'',
           capital:'',
           population:'',
           area:''
       };
       
     
       const [initialData,setData] = useState(_initialData)
       const [loading,setLoading] = useState(true)
       const[country,setCountry] = useState(null)
       const [updateCountry] = useMutation(UPDATE_COUNTRY);
   
       useEffect(()=>{
            initial()
        });

        useEffect(()=>{
            if(!empty(country)){
                setFieldsInitial(country)
            }
        },[country]);

   

    const code =(empty(match))?window.location.href.split('/edit/')[0]: match.params.code;

    const initial = async ()=>{
      try{
        let data = await getCounriesByAlpha2Code(code)
        if(data.length > 0){
            setCountry(data[0])
        }

        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }

   
       const id_form = 'country_form_edit';
       
       const editCountry =  (data,code)=>{

             updateCountry({ variables: { alpha2Code: code,updatedCountry: data }});
       }
   
       const goListCountries = ()=>{
           history.push('/');
       }
   
     
       const setFieldsInitial = (country)=>{
           if(!empty(country)){
   
               let{name,population,area,capital} = country;
                 
               let _obj = {
                   name:name,
                   area:area,
                   population:population,
                   capital:capital
               }
   
               
               setData(_obj)
   
               setTimeout(()=>{
                   setLoading(false)
               },1000)
           }
         
       }
   
   
       const handleSubmit =  (data)=>{
   
           if(isNaN(data.area) || isNaN(data.population) ){
               Message('Formato de dados inválidos!\nDigite Números nos campos de Área e População','warning')
   
               return false
           }
        
            editCountry(data,code)
            setTimeout(()=>{
                goListCountries() 
            },1500)
        }
        
   
       if(!loading){
           return(
                <div>
                    <div className='container_card_edit'>
                        <img id='editImage' src={country.flag.svgFile}/>
                        <h1>{country.name}</h1>
                    </div>
                    <FormCustom id={id_form}  initialData ={initialData} handleSubmit={handleSubmit}/>
                </div>
           )
       }else{
           return (
               <Spinner/>
           )
       }
   }
   
   export default EditCountryPage;