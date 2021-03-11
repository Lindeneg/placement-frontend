import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import Button from '../../../Interaction/Button/Button';
import AuthContext from '../../../../context/auth';
import { Functional } from "../../../../types";
import classes from './NavLinks.module.css';


/**
 * Base component for navigational routing links.
 */

const NavLinks: Functional = props => {
    const history     = useHistory();
    const authContext = useContext(AuthContext);

    const onLogOut = (): void => {
        authContext.logout();
        history.push('/');
    }

    return (
        <ul className={classes.Link}>
            <li>
                <NavLink activeClassName={classes.Active} to='/' exact>ALL USERS</NavLink>
            </li>
            {authContext.isLoggedIn && <li>
                <NavLink activeClassName={classes.Active} to={`/${authContext.userId}/places`}>MY PLACES</NavLink>
            </li>}
            {authContext.isLoggedIn && <li>
                <NavLink activeClassName={classes.Active} to='/places/new'>ADD PLACE</NavLink>
            </li>}
            {!authContext.isLoggedIn && <li>
                <NavLink activeClassName={classes.Active} to='/auth'>LOGIN/SIGNUP</NavLink>
            </li>}
            {authContext.isLoggedIn && <li>
                <Button inverse onClick={onLogOut} >LOGOUT</Button>
            </li>}
        </ul>
    )
};


export default NavLinks;