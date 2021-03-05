import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './NavLinks/NavLinks';
import Backdrop from '../../UI/Backdrop/Backdrop';
import SideDrawer from './SideDrawer/SideDrawer';
import Header from '../Header/Header';
import { Functional, UseStateTuple } from "../../../types";
import classes from './Nav.module.css';


const Nav: Functional = props => {

    const [drawerIsOpen, setDrawerIsOpen]: UseStateTuple<boolean> = useState<boolean>(false);

    const handleOnOpenDrawer = () => {
        setDrawerIsOpen(true);
    };

    const handleOnCloseDrawer = () => {
        setDrawerIsOpen(false);
    };

    return (
        <Fragment>
            {drawerIsOpen &&  <Backdrop onClick={handleOnCloseDrawer} />}
            <SideDrawer show={drawerIsOpen} onClick={handleOnCloseDrawer} >
                <nav className={classes.NavDrawer}>
                    <NavLinks />
                </nav>
            </SideDrawer>
            <Header>
                <button className={classes.NavMenuBtn} onClick={handleOnOpenDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className={classes.NavTitle}>
                    <Link to='/'>Placement</Link>
                </h1>
                <nav className={classes.Nav}>
                    <NavLinks />
                </nav>
            </Header>
        </Fragment>
    )
};

export default Nav;