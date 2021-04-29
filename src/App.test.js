import { render, screen, } from '@testing-library/react';
import Card from './components/card';

describe('Test show card component',()=>{
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
  
})