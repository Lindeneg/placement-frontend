import { useRef, useEffect, useState } from 'react';
import leaflet, { 
    Map       as LeafletMap, 
    Marker    as LeafletMarker, 
    TileLayer as LeafletTile
} from 'leaflet'; 

import { devLog } from '../../../util/util';
import { 
    BaseProps, 
    Functional, 
    OptCls, 
    RMutRef, 
    Location 
} from '../../../types';
import classes from './Map.module.css';


interface MapProps extends BaseProps, OptCls {
    center       : Location,
    popupContent?: string,
    maxZoom     ?: number,
    tileSize    ?: number,
    zoomOffset  ?: number
};


/**
 * Leaflet/MapBox component.
 */

const Map: Functional<MapProps> = props => {
    const [error, setError]               = useState<boolean>(true);
    const mapRef: RMutRef<HTMLDivElement> = useRef(null);

    useEffect(() => {
        if (mapRef.current !== null) {
            try {
                const map : LeafletMap  = leaflet.map(mapRef.current).setView(props.center, 13);
                const tile: LeafletTile = leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + process.env.REACT_APP_MAP_BOX_API_KEY, {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id         : 'mapbox/streets-v11',
                    maxZoom    : props.maxZoom    || 18,
                    tileSize   : props.tileSize   || 512,
                    zoomOffset : props.zoomOffset || -1,
                }).addTo(map);
                tile.on('tileload', (): void => {
                    const marker: LeafletMarker = leaflet.marker(props.center).addTo(map);
                    props.popupContent && marker.bindPopup(props.popupContent);
                    setError(false);
                });
            } catch(err) {
                devLog(err);
                setError(true);
            }
        }
    }, [props]);

    return (
        <div ref={mapRef} className={[classes.Map, props.className].join(' ')} style={props.style}>
            {error && <p className='center'>An error occurred while loading the map.Try again later.</p>}
        </div>
    )
};


export default Map;