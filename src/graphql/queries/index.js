import { gql } from 'apollo-boost';



export const COUNTRIES = gql`
  {
    Country {
        name
        nativeName
        alpha2Code
        alpha3Code
        population
        capital
        currencies {
          name
          symbol
        }
        flag {
          svgFile
        }
      }
  }
`;


