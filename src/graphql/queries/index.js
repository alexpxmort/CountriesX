/**
 * Queries
 * 
 */



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
        location {
          latitude
          longitude
        }
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

export const GET_COUNTRIES_CLIENT = gql`
    {
      countries @client
    }
  
`;


export const COUNTRIES_BY_ALPHA_CODE = gql`
  query  Country($alpha2Code: String!) {
    Country(alpha2Code: $alpha2Code){
      name
      nativeName
      alpha2Code
      alpha3Code
      area
      population
      populationDensity
      convertedArea(areaUnit: SQUARE_MILES) {
        value
        unit
        populationDensity
      }
      capital
      demonym
      gini
      location {
        latitude
        longitude
      }
      numericCode
      subregion {
        name
        region {
          name
        }
      }
      officialLanguages {
        iso639_1
        iso639_2
        name
        nativeName
      }
      currencies {
        name
        symbol
      }
      regionalBlocs {
        name
        acronym
        otherAcronyms {
          name
        }
        otherNames {
          name
        }
      }
      flag {
        emoji
        emojiUnicode
        svgFile
      }
      borders {
        name
      }
      distanceToOtherCountries(first: 5) {
        distanceInKm
        countryName
      }
      topLevelDomains {
        name
      }
      callingCodes {
        name
      }
      alternativeSpellings {
        name
      }
      timezones {
        name
      }
      nameTranslations {
        languageCode
        value
      }
    }
  }
`;