import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { BaseProps, Clickable, Portal, RMutRef, Visibility } from "../../../../types";
import classes from './SideDrawer.module.css';


interface SideDrawerProps extends BaseProps, Visibility, Clickable {};


const SideDrawer: Portal<SideDrawerProps> = props => {
    const target: HTMLElement | null = document.getElementById('drawer-hook');
    const nodeRef: RMutRef<HTMLElement> = useRef(null);
    if (target !== null) {
        return ReactDOM.createPortal(
            <CSSTransition
                in={props.show}
                timeout={200}
                classNames={{
                    enter: classes.SlideInLeftEnter,
                    enterActive: classes.SlideInLeftEnterActive,
                    exit: classes.SlideInLeftExit,
                    exitActive: classes.SlideInLeftExitActive
                }}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
            >
                <aside ref={nodeRef} onClick={props.onClick} className={classes.SideDrawer} >{props.children}</aside>
            </CSSTransition>, 
            target
        );
    }
    return null;
};


export default SideDrawer;