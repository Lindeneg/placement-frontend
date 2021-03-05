import UserListItem from './UserListItem/UserListItem';
import Card from '../../../common/components/UI/Card/Card';
import { 
    BaseProps, 
    Functional 
} from "../../../common/types";
import { User } from "../../../common/types";
import classes from './UsersList.module.css';


interface UserListProps extends BaseProps {
    users: User[]
};


/**
 * Component that displays a list with all fetched Users.
 */

const UsersList: Functional<UserListProps> = props => {
    if (!(props.users.length > 0)) {
        return (
            <div className='center'>
                <Card>
                    <h2>No Users Found!</h2>
                </Card>
            </div>
        );
    }
    return (
        <ul className={classes.List}>
            {props.users.map((user: User): JSX.Element => (
                <UserListItem key={user.id} {...user} />
            ))}
        </ul>
    );
};


export default UsersList;