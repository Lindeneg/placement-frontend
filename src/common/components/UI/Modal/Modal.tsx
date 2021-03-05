import { ReactNode, Fragment, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import { BaseProps, OptCls, Portal, OnSubmitFunc, Visibility, OnClickFunc, RMutRef } from "../../../types";
import classes from './Modal.module.css';


interface ModalProps extends BaseProps, OptCls, Visibility {
    headerCls?: string,
    headerText?: string,
    contentCls?: string,
    footerCls?: string,
    footerNodes?: ReactNode,
    onSubmit?: OnSubmitFunc
    onClose: OnClickFunc
};


const Modal: Portal<ModalProps> = props => {
    const target: HTMLElement | null = document.getElementById('modal-hook');
    const nodeRef: RMutRef<HTMLDivElement> = useRef(null);
    if (target !== null) {
        const jsx: JSX.Element = (
            <Fragment>
                {props.show && <Backdrop onClick={props.onClose} />}
                <CSSTransition
                    in={props.show}
                    mountOnEnter
                    unmountOnExit
                    timeout={200}
                    classNames={{
                        enter: classes.ModalEnter,
                        enterActive: classes.ModalEnterActive,
                        exit: classes.ModalExit,
                        exitActive: classes.ModalExitActive
                    }}
                    nodeRef={nodeRef}
                >
                <div 
                    ref={nodeRef}
                    className={[classes.Modal, props.className].join(' ')}
                    style={props.style}
                >
                    <header className={[classes.ModalHeader, props.headerCls].join(' ')}>
                        <h2>{props.headerText}</h2>
                    </header>
                    <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
                        <div className={[classes.ModalContent, props.contentCls].join(' ')}>
                            {props.children}
                        </div>
                        <footer className={[classes.ModalFooter, props.footerCls].join(' ')} >
                            {props.footerNodes}
                        </footer>
                    </form>
                </div>
                </CSSTransition>
            </Fragment>
        );
        return createPortal(jsx, target);
    }
    return null;
};


export default Modal;