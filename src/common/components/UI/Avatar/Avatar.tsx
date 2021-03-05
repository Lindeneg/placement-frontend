import { BaseProps, OptCls, Functional } from "../../../types";
import classes from './Avatar.module.css';


interface AvatarProps extends BaseProps, OptCls {
    src     : string,
    alt     : string,
    width ? : string,
    height? : string
};


/**
 * Display an image (avatar) within the constrains of the component.
 */

const Avatar: Functional<AvatarProps> = props => (
    <div className={[classes.Avatar, props.className].join(' ')} style={props.style} >
        <img 
            src={props.src} 
            alt={props.alt} 
            style={{width: props.width, height: props.height}} 
        />
    </div>
);


export default Avatar;