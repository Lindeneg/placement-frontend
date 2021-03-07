import { NavLink } from 'react-router-dom';

import { Functional } from "../../../../types";
import classes from './NavLinks.module.css';


/**
 * Base component for navigational routing links.
 */

const NavLinks: Functional = props => (
    <ul className={classes.Link}>
        <li>
            <NavLink activeClassName={classes.Active} to='/' exact>ALL USERS</NavLink>
        </li>
        <li>
            <NavLink activeClassName={classes.Active} to='/u1/places'>MY PLACES</NavLink>
        </li>
        <li>
            <NavLink activeClassName={classes.Active} to='/places/new'>ADD PLACE</NavLink>
        </li>
        <li>
            <NavLink activeClassName={classes.Active} to='/auth'>AUTH</NavLink>
        </li>
    </ul>
);


export default NavLinks;