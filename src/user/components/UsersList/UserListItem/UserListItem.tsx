import { Link } from 'react-router-dom';

import Avatar from '../../../../common/components/UI/Avatar/Avatar';
import Card from '../../../../common/components/UI/Card/Card';
import { 
    UserResponse, 
    BaseProps, 
    Functional 
} from "../../../../common/types";
import classes from './UserListItem.module.css';


interface UserListItemProps extends BaseProps, UserResponse {};


/**
 * Component for displaying a User entry in a UsersList.
 */

const UserListItem: Functional<UserListItemProps> = props => (
    <li className={classes.Item} >
        <Card className={classes.Content}>
            <Link to={`/${props._id}/places`}>
                <div className={classes.Image}>
                    <Avatar 
                        src={props.image}
                        alt={props.name}
                    />
                </div>
                <div className={classes.Info}>
                    <h2>{props.name}</h2>
                    <h3>{props.places.length} {props.places.length === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </Link>
        </Card>
    </li>
);


export default UserListItem;