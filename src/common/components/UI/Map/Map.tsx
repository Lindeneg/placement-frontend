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
};


/**
 * Leaflet/MapBox component.
 */

const Map: Functional<MapProps> = props => {
    const [error, setError]               = useState<string>('');
    const [loading, setLoading]           = useState<boolean>(true);
    const mapRef: RMutRef<HTMLDivElement> = useRef(null);

    useEffect(() => {
        if (mapRef.current !== null && props.center.lat !== 0 && props.center.lng !== 0) {
            try {
                setLoading(true);
                const map : LeafletMap  = leaflet.map(mapRef.current).setView(props.center, 13);
                const tile: LeafletTile = leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + process.env.REACT_APP_MAP_BOX_API_KEY, {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id         : 'mapbox/streets-v11',
                }).addTo(map);
                tile.on('tileload', (): void => {
                    const marker: LeafletMarker = leaflet.marker(props.center).addTo(map);
                    props.popupContent && marker.bindPopup(props.popupContent);
                });
            } catch(err) {
                setError('An error occurred while loading the map.Try again later.');
                devLog(err);
            } finally {
                setLoading(false);
            }
        }
    }, [props.center, props.popupContent]);

    return (
        <div ref={mapRef} className={[classes.Map, props.className].join(' ')} style={props.style}>
            {loading && !error && <p className='center'>Loading map...</p>}
            {error && <p className='center'>{error}</p>}
        </div>
    )
};


export default Map;