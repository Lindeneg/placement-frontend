import { InputAction } from "./action";
import { InputState, InputPayload } from './Input';
import { validate } from '../../../util/validators';
import { Action, Reducer, Validator, ValidationValue } from "../../../types";


const reducer: Reducer<InputState, Action<InputAction, InputPayload>> = (state, action) => {
    const validators: Validator[]     = action.validators || [];
    const value     : ValidationValue = action.payload?.value || '';
    switch(action.type) {
        case InputAction.CHANGE:
            return {
                ...state,
                value,
                isValid: validate(value, validators)
            };
        case InputAction.TOUCH:
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
};


export default reducer;