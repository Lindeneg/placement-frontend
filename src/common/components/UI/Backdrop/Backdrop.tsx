import ReactDOM from 'react-dom';

import { BaseProps, Clickable, Portal } from "../../../types";
import classes from './Backdrop.module.css';


interface BackdropProps extends BaseProps, Clickable {};


/**
 * Simple backdrop component acting as utility for overlaying components (such as modals).
 */

const Backdrop: Portal<BackdropProps> = props => {
    const target: HTMLElement | null = document.getElementById('backdrop-hook');
    if (target !== null) {
        return ReactDOM.createPortal(
            <div
                className={classes.Backdrop}
                onClick={props.onClick}
            >
            </div>, target);
    }
    return null;
};


export default Backdrop;