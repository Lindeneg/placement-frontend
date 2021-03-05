import UsersList from '../../components/UsersList/UsersList';
import { BaseProps, Functional } from "../../../common/types";
import { User } from '../../../common/types';


interface UsersProps extends BaseProps {};


const USERS: User[] = [
    {
        id: 'u1',
        name: 'miles',
        image: 'https://www.biography.com/.image/t_share/MTE1ODA0OTcxNjAxOTg3MDg1/miles-davis-9267992-2-402.jpg',
        placeQty: 2
    },
    {
        id: 'u2',
        name: 'davis',
        image: 'https://media.npr.org/assets/img/2012/01/31/miles-davis-2_wide-b2ba5a4cdd0039f88f30a83a579e47dc9874b5bd-s800-c85.jpg',
        placeQty: 5
    }
];


/**
 * Component with list of Users to be utilized in a UsersList.
 */

const Users: Functional<UsersProps> = props => (
    <UsersList 
        users={USERS}
    />
);


export default Users;