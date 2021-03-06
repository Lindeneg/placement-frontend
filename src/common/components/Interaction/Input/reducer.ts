import InputAction from "./actions";
import { InputState, InputPayload } from './Input';
import { validate } from '../../../util/validators';
import { Action, Reducer,  } from "../../../types";


const reducer: Reducer<InputState, Action<InputAction, InputPayload>> = (state, action) => {
    switch(action.type) {
        case InputAction.CHANGE:
            return {
                ...state,
                value: action.payload?.value,
                isValid: validate(action.payload?.value, action.validators || [])
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