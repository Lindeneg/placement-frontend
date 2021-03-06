import { useReducer, useCallback } from 'react';

import reducer from './reducer';
import NewPlaceAction from './actions';
import Button from '../../../common/components/Interaction/Button/Button';
import Input from '../../../common/components/Interaction/Input/Input';
import { getValidator } from '../../../common/util/validators';
import { 
    BaseProps, 
    Functional, 
    UseReducerTuple, 
    ValidationType, 
    ValidationValue,
    Identifiable,
    SIndexable,
    OnSubmitFunc
} from "../../../common/types";
import classes from './NewPlace.module.css';


interface NewPlaceProps extends BaseProps {};

interface NewPlaceStateMetaEntry extends SIndexable<ValidationValue | boolean> {
    value: ValidationValue,
    isValid: boolean
};

interface NewPlaceStateEntry extends SIndexable<NewPlaceStateMetaEntry> {};

export interface NewPlaceState extends SIndexable<NewPlaceStateEntry | boolean> {
    inputs: NewPlaceStateEntry,
    isValid: boolean
};

export interface NewPlacePayload extends Identifiable {
    value: ValidationValue,
    isValid: boolean
};


/**
 * Component for creating a new Place structure.
 */

const NewPlace: Functional<NewPlaceProps> = props => {

    const [state, dispatch]: UseReducerTuple<NewPlaceState, NewPlaceAction, NewPlacePayload> = useReducer(
        reducer,
        {
            inputs: { title: { value: '', isValid: false}, description: { value: '', isValid: false} },
            isValid: false
        }
    );

    const inputHandler = useCallback((id: string, value: string, isValid: boolean): void => {
        dispatch({type: NewPlaceAction.NEW_PLACE_CHANGE_INPUT, payload: {
            value, isValid, id
        }});
    }, []);

    const onSubmitHandler: OnSubmitFunc = event => {
        event.preventDefault();
        console.log(state.inputs);  
    };

    return (
        <form className={classes.Form} onSubmit={onSubmitHandler}>
            <Input 
                id='title'
                onInput={inputHandler}
                type='text' 
                label='Title' 
                element='input' 
                errorText='Please enter a valid title (max 12 characters)' 
                validators={[
                    getValidator(ValidationType.Require),
                    getValidator(ValidationType.MaxLength, 12)
                ]}
            />
            <Input 
                id='description'
                onInput={inputHandler}
                label='Description' 
                element='text-area' 
                errorText='Please enter a valid description (at least 4 characters but at most 128)' 
                validators={[
                    getValidator(ValidationType.MinLength, 4),
                    getValidator(ValidationType.MaxLength, 128)
                ]}
            />
            <Input 
                id='address'
                onInput={inputHandler}
                type='text' 
                label='Address' 
                element='input' 
                errorText='Please enter a valid address' 
                validators={[getValidator(ValidationType.Require)]}
            />
            <Button 
                type='submit'
                disabled={!state.isValid}
            >
                Add Place
            </Button>
        </form>
    )
};


export default NewPlace;