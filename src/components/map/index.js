
/**
 * Componente de Mapa
 * props latitude,longitude e country
 */



import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { TOKEN_MAP_BOX } from '../../config/mapbox';
import {useQuery} from '@apollo/react-hooks'
 import './map.styles.css'
import { empty } from '../../utils/string.utils';
import { GET_COUNTRIES_CLIENT } from '../../graphql/queries'
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.MAPBOX_TOKEN || TOKEN_MAP_BOX;

const Map = ({latitude,longitude,country}) => {


    const mapContainer = useRef();
    const [lng, setLng] = useState(longitude?longitude:-70.9);
    const [lat, setLat] = useState(latitude?latitude:42.35);
    const [zoom, setZoom] = useState(9);
    const {data} = useQuery(GET_COUNTRIES_CLIENT)


    const filteredByName  = (name)=>{
        return  (!empty(data) && !empty(data.countries))? data.countries.filter((country) => 
        country.name.toLowerCase().includes(name.toLowerCase())
        ):[];
    }

    useEffect(() => {
        
        const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng,lat],
        zoom: zoom
        });

        if(!empty(country)){
            
            country.distanceToOtherCountries.forEach(
                (val)=>{
                    let _country = filteredByName(val.countryName)   
                    
                    if(!empty(_country)){

                        var _marker = new mapboxgl.Marker()
                        .setLngLat([_country[0].location.longitude,_country[0].location.latitude])
                        .setPopup(
                            new mapboxgl.Popup({
                                offset:25
                            }).setHTML(`
                            <h3>Country: ${val.countryName}</h3>
                            <p>Distance: ${val.distanceInKm} km</p>
                            `)
                        )
                        .addTo(map);
                    }
                    
                }
            )
        }

        return () => map.remove();
        }, []);

        return (
            <div>
                <div className="map-container" ref={mapContainer} />
            </div>
        );
};

export default Map;