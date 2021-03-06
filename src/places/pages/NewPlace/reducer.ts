import { Action, Reducer } from "../../../common/types";
import NewPlaceAction from "./actions";
import { NewPlacePayload, NewPlaceState } from "./NewPlace";



const reducer: Reducer<NewPlaceState, Action<NewPlaceAction, NewPlacePayload>> = (state, action) => {
    switch(action.type) {
        case NewPlaceAction.NEW_PLACE_CHANGE_INPUT:
            let isValid: boolean = true;
            for (const key in state.inputs) {
                if (key === action.payload.id) {
                    isValid = isValid && action.payload.isValid;
                } else {
                    isValid = isValid && state.inputs[key].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.payload.id]: { value: action.payload.value, isValid: action.payload.isValid }
                },
                isValid
            };

        default:
            return state;
    }
};


export default reducer;