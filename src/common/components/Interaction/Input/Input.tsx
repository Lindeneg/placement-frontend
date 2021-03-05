import { useReducer } from 'react';

import inputReducer from './reducer';
import { InputAction } from './action';
import { 
    BaseProps, 
    Functional, 
    Identifiable, 
    OnBlur, 
    OnChange, 
    UseReducerTuple, 
    ValidationValue,
    Validator
} from "../../../../common/types";
import classes from './Input.module.css';


interface InputProps extends BaseProps, Partial<Identifiable> {
    element       : 'input' | 'text-area',
    type        ? : 'text' | 'number',
    label       ? : string,
    errorText   ? : string,
    placeHolder ? : string,
    rows        ? : number,
    validators  ? : Validator[]
};

export interface InputState {
    value         : ValidationValue,
    isValid       : boolean,
    isTouched     : boolean
};

export type InputPayload = Partial<InputState>;


/**
 * Custom interactive Input/Form component.
 */

const Input: Functional<InputProps> = props => {

    const [state, dispatch]: UseReducerTuple<InputState, InputAction, InputPayload> = useReducer(
        inputReducer, 
        {value: '', isValid: false, isTouched: false}
    );

    const onChangeHandler: OnChange<HTMLInputElement | HTMLTextAreaElement> = event => {
        dispatch({
            type: InputAction.CHANGE,
            payload: {
                value: event.target.value
            },
            validators: props.validators
        });
    };

    const onTouchHandler: OnBlur<HTMLInputElement | HTMLTextAreaElement> = event => {
        dispatch({ type: InputAction.TOUCH });
    };

    let element: JSX.Element;
    switch (props.element) {
        case 'input':
            element = (
                <input 
                    id={props.id} 
                    type={props.type || 'text'} 
                    placeholder={props.placeHolder} 
                    onChange={onChangeHandler}
                    onBlur={onTouchHandler}
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
                    onBlur={onTouchHandler}
                    value={state.value}
                />
            );
            break;
        default:
            element = <input />;
            break;
    }

    return (
        <form className={[classes.Control, !state.isValid && state.isTouched && classes.Invalid].join(' ')}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!state.isValid && state.isTouched && <p>{props.errorText}</p>}
        </form>
    )
};


export default Input;