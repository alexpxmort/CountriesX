import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { TOKEN_MAP_BOX } from '../../config/mapbox';
 import './map.styles.css'
import { empty } from '../../utils/string.utils';
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = TOKEN_MAP_BOX.token;

const Map = ({latitude,longitude,fiveCountrys}) => {

    const mapContainer = useRef();
    const [lng, setLng] = useState(longitude?longitude:-70.9);
    const [lat, setLat] = useState(latitude?latitude:42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        
        const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });

      

            if(empty(fiveCountrys)){
                fiveCountrys.forEach((val)=>{
                    var _marker = new mapboxgl.Marker()
                    .setLngLat([val.location.latitude, val.location.longitude])
                    .addTo(map);
                })
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