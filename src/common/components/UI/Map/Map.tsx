import { useRef, useEffect } from 'react';

import { BaseProps, Functional, OptCls, RMutRef, Location } from '../../../types';
import classes from './Map.module.css';


interface MapProps extends BaseProps, OptCls {
    center: Location,
    zoom  : number
};


/**
 * Google Map component.
 */

const Map: Functional<MapProps> = props => {
    const mapRef: RMutRef<HTMLDivElement> = useRef(null);

    useEffect(() => {
        if (mapRef.current !== null) {
            const map = new window.google.maps.Map(
                mapRef.current,
                {
                    center: props.center,
                    zoom: props.zoom
                }
            );
            new window.google.maps.Marker({ 
                position: props.center,
                map
            });
        }
    }, [props.center, props.zoom]);

    return <div ref={mapRef} className={[classes.Map, props.className].join(' ')} style={props.style}></div>;
};


export default Map;