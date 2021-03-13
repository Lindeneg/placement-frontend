import { Link } from 'react-router-dom';

import Avatar from '../../../../common/components/UI/Avatar/Avatar';
import Card from '../../../../common/components/UI/Card/Card';
import { getCustomDateStringFromTimestamp } from '../../../../common/util/util';
import { UserResponse, BaseProps, Functional } from "../../../../common/types";
import classes from './UserListItem.module.css';


interface UserListItemProps extends BaseProps, UserResponse {};


/**
 * Component for displaying a User entry in a UsersList.
 */

const UserListItem: Functional<UserListItemProps> = props => {
    const lastLogin: string | null = getCustomDateStringFromTimestamp(props.lastLogin);
    return (
        <li className={classes.Item} >
            <Card className={classes.Content}>
                <Link to={`/${props._id}/places`}>
                    <div className={classes.Image}>
                        <Avatar 
                            src={`${process.env.REACT_APP_SERVER_BASE_URL}/${props.image}`}
                            alt={props.name}
                        />
                    </div>
                    <div className={classes.Info}>
                        <h2>{props.name}</h2>
                        {lastLogin && <p>LAST SEEN <span>{lastLogin}</span></p>}
                        <h3>{props.places.length} {props.places.length === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    )
};


export default UserListItem;