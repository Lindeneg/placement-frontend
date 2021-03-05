import { NIndexable, ValidationFunc, ValidationType, ValidationValue, Validator } from "../types";


const validationFunc: NIndexable<ValidationFunc> = {
    [ValidationType.Require]: (value, isValid, validator) => {
        return isValid && value.toString().trim().length > 0;
    },
    [ValidationType.MinLength]: (value, isValid, validator) => {
        return isValid && value.toString().trim().length >= (validator.value || 3);
    },
    [ValidationType.MaxLength]: (value, isValid, validator) => {
        return isValid && value.toString().trim().length <= (validator.value || 12);
    },
    [ValidationType.MinValue]: (value, isValid, validator) => {
        return isValid && +value >= (validator.value || 0);
    },
    [ValidationType.MaxValue]: (value, isValid, validator) => {
        return isValid && +value <= (validator.value || 10);
    },
    [ValidationType.Email]: (value, isValid, validator) => {
        return isValid && /^\S+@\S+\.\S+$/.test(value.toString()); // TODO redo regexp
    },
    [ValidationType.File]: (value, isValid, validator) => {
        return isValid; // TODO
    },
};

export const getValidator = (type: ValidationType, value?: number): Validator => (
    { type, value }
);

export const validate = (value: ValidationValue, validators: Validator[]): boolean => {
    let isValid: boolean = true;
    for (let i = 0; i < validators.length; i++) {
        const validator = validators[i];
        isValid = validationFunc[validator.type](value, isValid, validator);
    }
    return isValid;
};