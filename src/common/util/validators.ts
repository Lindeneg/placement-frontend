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
        // the exp is intended to be used in a .exec call to extract the groups
        return isValid && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toString());
    },
    [ValidationType.File]: (value, isValid, validator) => {
        /* the file is validated server-side as the input-field whereto the file that is being validated here
           was uploaded in, can only be an image file anyways. thus, nothing is done here. */
        return isValid;
    },
};

export const getValidator = (type: ValidationType, value?: number): Validator => (
    { type, value }
);

export const validate = (value: ValidationValue, validators: Validator[]): boolean => {
    let isValid: boolean = true;
    validators.forEach(validator => {
        const func: ValidationFunc | undefined = validationFunc[validator.type];
        if (typeof func !== 'undefined') {
            isValid = func(value || '', isValid, validator);
        }
    });
    return isValid;
};