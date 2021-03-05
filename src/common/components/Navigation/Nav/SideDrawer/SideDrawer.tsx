import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { 
    BaseProps, 
    Clickable, 
    Portal, 
    RMutRef, 
    Visibility 
} from "../../../../types";
import classes from './SideDrawer.module.css';


interface SideDrawerProps extends BaseProps, Visibility, Clickable {};


/**
 * Animated side drawer menu for mobile-views.
 */

const SideDrawer: Portal<SideDrawerProps> = props => {
    const target: HTMLElement | null = document.getElementById('drawer-hook');
    const nodeRef: RMutRef<HTMLElement> = useRef(null);
    if (target !== null) {
        return createPortal(
            <CSSTransition
                in={props.show}
                timeout={200}
                classNames={{
                    enter: classes.Enter,
                    enterActive: classes.EnterActive,
                    exit: classes.Exit,
                    exitActive: classes.ExitActive
                }}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
            >
                <aside ref={nodeRef} onClick={props.onClick} className={classes.Drawer} >{props.children}</aside>
            </CSSTransition>, 
            target
        );
    }
    return null;
};


export default SideDrawer;