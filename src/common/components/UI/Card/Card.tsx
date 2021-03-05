import { BaseProps, OptCls, Functional } from '../../../types';
import classes from './Card.module.css';


interface CardProps extends BaseProps, OptCls {};


const Card: Functional<CardProps> = props => (
    <div className={[classes.Card, props.className].join(' ')}>
        {props.children}
    </div>
);


export default Card;