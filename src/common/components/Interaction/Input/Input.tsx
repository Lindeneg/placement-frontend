import { useReducer } from 'react';

import { BaseProps, Functional, OnChange, Reducer, Action, UseReducerTuple } from "../../../../common/types";
import classes from './Input.module.css';


interface InputProps extends BaseProps {
    element: 'input' | 'text-area',
    label?: string,
    type?: 'text' | 'number',
    id?: string,
    errorText?: string,
    placeHolder?: string,
    rows?: number
};

interface InputState {
    value: string | number,
    isValid: boolean
};

interface InputPayload {
    value?: string | number, 
    isValid?: boolean
};

enum InputAction {
    CHANGE = 'CHANGE'
};

const inputReducer: Reducer<InputState, Action<InputAction, InputPayload>> = (state, action) => {

    switch(action.type) {
        case InputAction.CHANGE:
            return {
                ...state,
                value: action.payload?.value || state.value,
                isValid: true
            };
        default:
            return state;
    }
};

const Input: Functional<InputProps> = props => {

    const [state, dispatch]: UseReducerTuple<InputState, InputAction, InputPayload> = useReducer(
        inputReducer, 
        {value: '', isValid: false}
    );

    const onChangeHandler: OnChange<HTMLInputElement | HTMLTextAreaElement> = event => {
        dispatch({
            type: InputAction.CHANGE,
            payload: {
                value: event.target.value
            }
        });
    }

    let element;
    switch (props.element) {
        case 'input':
            element = (
                <input 
                    id={props.id} 
                    type={props.type || 'text'} 
                    placeholder={props.placeHolder} 
                    onChange={onChangeHandler}
                    value={state.value}
                />
            );
            break;
        case 'text-area':
            element = (
                <textarea 
                    id={props.id}
                    rows={props.rows || 3}
                    onChange={onChangeHandler}
                    value={state.value}
                />
            );
            break;
        default:
            element = <input />;
            break;
    }

    return element !== null ? (
        <form className={[classes.Control, !state.isValid && classes.Invalid].join(' ')}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!state.isValid && <p>{props.errorText}</p>}
        </form>
    ) : null;
};

export default Input;