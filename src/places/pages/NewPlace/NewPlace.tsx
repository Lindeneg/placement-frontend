
import useForm from '../../../common/hooks/form';
import Button from '../../../common/components/Interaction/Button/Button';
import Input from '../../../common/components/Interaction/Input/Input';
import { getValidator } from '../../../common/util/validators';
import { 
    BaseProps, 
    Functional, 
    ValidationType, 
    OnSubmitFunc
} from "../../../common/types";


interface NewPlaceProps extends BaseProps {};


/**
 * Component for creating a new Place structure.
 */

const NewPlace: Functional<NewPlaceProps> = props => {

    const [state, inputHandler] = useForm({
        inputs: { 
            title      : { value: '', isValid: false}, 
            description: { value: '', isValid: false},
            address    : { value: '', isValid: false} 
    },
        isValid: false,
    });

    const onSubmitHandler: OnSubmitFunc = event => {
        event.preventDefault();
        console.log(state.inputs);  
    };

    return (
        <form className='generic__form-wrapper' onSubmit={onSubmitHandler}>
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