import { render, screen } from '@testing-library/react';
import Card from './components/card';
import {CardListCountries} from './components/card-list-countries'
import Spinner from './components/loading/loading.compont';
import DetailPage from './pages/detail';
import {BrowserRouter} from 'react-router-dom'



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



  it('show detail page',async ()=>{

    renderWithRouter(<DetailPage/>,{route:"/detail/AF"})

    expect(screen.getByTestId('loading')).toBeInTheDocument()

   
  })

})