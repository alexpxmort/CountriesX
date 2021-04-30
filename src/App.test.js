/**
 * Testes dos Componentes
 */



import { render, screen } from '@testing-library/react';
import Card from './components/card';
import {CardListCountries} from './components/card-list-countries'
import Spinner from './components/loading/loading.compont';
import DetailPage from './pages/detail';
import {BrowserRouter} from 'react-router-dom'
import { InputCustom } from './components/input-custom';
import {Form} from '@unform/web'
import FormCustom from './components/form/country.form';
import Total from './components/total';

const  renderWithRouter  = (ui,{route  ='/'} = {})=>{
  window.history.pushState({},'Test Page',route)

  return render(
    ui,{
      wrapper:BrowserRouter
    }
  )
}

describe('Test components',()=>{
  it('show card',async ()=>{
    const obj = {
      name:'Brazil',
      url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
      capital:'Brasília'
    }

    render(<Card name={`${obj.name}`} url={obj.url} capital={obj.capital}/>)

    const container = screen.getByTestId(obj.name)


    const image = container.querySelector('img')
    const spanNome = document.getElementById(`${obj.name}x`)
    const spanCapital = document.getElementById(`${obj.capital}x`)


    expect(spanNome).toHaveTextContent(`Nome: ${obj.name}`)
    expect(spanCapital).toHaveTextContent(`Capital: ${obj.capital}`)
    expect(image.getAttribute('src')).toEqual(obj.url)

  })

  it('show card list',async ()=>{

    const countries = [
      {
        name:'Brazil',
        flag:{
          svgFile:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        },
        capital:'Brasília'
      },
      {
        name:'United States of America',
        flag:{
          svgFile:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        },
        capital:'Washington, D.C.'
      }
    ]

    render(<CardListCountries countries={countries}/>)

    const container = screen.getByTestId(`card_list_container`);


    expect(container.children.length).toEqual(countries.length)

  })

  it('show loading',async()=>{
    render(<Spinner/>)

    const container = screen.getByTestId(`loading`);

    expect(container).toBeInTheDocument()
  })

  it('show input custom',async ()=>{

    let _name = 'nome';

    render(<Form>
      <InputCustom required name={_name} label="Nome" variant="outlined"  type={'text'}/>
    </Form>)


    const container = screen.getByTestId(`${_name}_input`)

    let _val = '123';

    expect(container.querySelector('input').getAttribute('name')).toEqual(_name)

    container.querySelector('input').setAttribute('value',`${_val}`);

    expect(container.querySelector('input').getAttribute('value')).toEqual(`${_val}`)

   
  })

  it('show country form',async ()=>{

    let _initialData = {
      name:'Brazil',
      capital:'Brasilia',
      population:'13123',
      area:'156156'
    };

    let qtdFields = 4;

    let _valSubmited = 'submited';
  

    const handleSubmit = (data)=>{
      container.querySelector('input').setAttribute('value',_valSubmited)
    }

    render( <FormCustom id={'teste'}  initialData ={_initialData} handleSubmit={handleSubmit}/>      )

    const container = screen.getByTestId(`form_country`)

    expect(container.querySelectorAll('input').length).toEqual(qtdFields)

    let _arrFields = Array.from(container.querySelectorAll('input'));

    for(var key in _initialData){
      if(_initialData.hasOwnProperty(key)){

       let _found =  _arrFields.filter((val)=>{
          return  val.getAttribute('name') === key
        })

        if(_found.length > 0){
          // eslint-disable-next-line jest/no-conditional-expect
          expect(_found[0].value).toEqual(_initialData[key])
        }
      }
     
  }

    container.querySelector('button').click()

    expect(container.querySelector('input').getAttribute('value')).toEqual(_valSubmited)
   
  })


  it('show total component',async ()=>{
    let _total = 100;
    let _label = 'Countries';

    render(<Total label={_label} total={_total}/>)

    const container  = screen.getByTestId('total_test')

    expect(container).toHaveTextContent(`Total of ${_label}: ${_total}`)
  })


  it('show detail page',async ()=>{

    renderWithRouter(<DetailPage/>,{route:"/detail/AF"})

    expect(screen.getByTestId('loading')).toBeInTheDocument()

   
  })

})