import { Functional } from "../../../types";
import classes from './Header.module.css';


const Header: Functional = props => (
    <header className={classes.Header}>
        {props.children}
    </header>
);

export default Header;