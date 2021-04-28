import { render, screen, } from '@testing-library/react';
import Card from './components/card';

describe('Test show card component',()=>{
  it('show card',async ()=>{
    const obj = {
      name:'Brazil',
      url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
      capital:'São Paulo'
    }

    render(<Card name={`${obj.name}`} url={obj.url}/>)

    const container = screen.getByTestId(obj.name)

    const image = container.querySelector('img')
    const spanNome = container.querySelector(`span #${obj.name}x`)

    expect(spanNome).toHaveTextContent(obj.name)
    expect(image.getAttribute('src')).toEqual(obj.url)

  })
})