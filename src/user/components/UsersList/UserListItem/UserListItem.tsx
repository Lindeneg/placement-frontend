import { Link } from 'react-router-dom';

import { BaseProps, Functional } from "../../../../common/types";
import Avatar from '../../../../common/components/UI/Avatar/Avatar';
import Card from '../../../../common/components/UI/Card/Card';
import { User } from "../../../../common/types";
import classes from './UserListItem.module.css';


interface UserListItemProps extends BaseProps, User {};


const UserListItem: Functional<UserListItemProps> = props => (
    <li className={classes.UserListItem} >
        <Card className={classes.UserListItemContent}>
            <Link to={`/${props.id}/places`}>
                <div className={classes.UserListItemImage}>
                    <Avatar 
                        src={props.image}
                        alt={props.name}
                    />
                </div>
                <div className={classes.UserListItemInfo}>
                    <h2>{props.name}</h2>
                    <h3>{props.placeQty} {props.placeQty === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </Link>
        </Card>
    </li>
);

export default UserListItem;