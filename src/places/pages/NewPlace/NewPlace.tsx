import { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useHttp from '../../../common/hooks/http.hook';
import useForm from '../../../common/hooks/form.hook';
import ImageUpload from '../../../common/components/Interaction/ImageUpload/ImageUpload';
import Button from '../../../common/components/Interaction/Button/Button';
import Input from '../../../common/components/Interaction/Input/Input';
import ErrorModal from '../../../common/components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import AuthContext from '../../../common/context/auth.context';
import { getURL, devLog } from '../../../common/util/util';
import { getValidator } from '../../../common/util/validators';
import {  
    Functional, 
    ValidationType, 
    OnSubmitFunc,
    PlaceResponse
} from "../../../common/types";


/**
 * Component for creating a new Place structure.
 */

const NewPlace: Functional = props => {
    const history                                       = useHistory();
    const authContext                                   = useContext(AuthContext);
    const { isLoading, error, clearError, sendRequest } = useHttp<PlaceResponse[]>();
    const [state, inputHandler]                         = useForm({
        inputs: { 
            title      : { value: '', isValid: false}, 
            description: { value: '', isValid: false},
            address    : { value: '', isValid: false},
            image      : { value: '', isValid: false }
    },
        isValid: false,
    });


    const onSubmitHandler: OnSubmitFunc = async event => {
        event.preventDefault();
        try {
            const formData: FormData = new FormData();
            // this should only run when the desired input is present
            // so the fallback is solely to satisfy tsc due to my type definitions 
            // so I'll probably redo the validation types at some point
            formData.append('title', state.inputs.title.value?.toString() || '');
            formData.append('description', state.inputs.description.value?.toString() || '');
            formData.append('address', state.inputs.address.value?.toString() || '');
            formData.append('creatorId', authContext.userId);
            formData.append('image', state.inputs.image.value instanceof File ? state.inputs.image.value : '');
            await sendRequest(getURL('places'), 'POST', formData, {
                'Authorization': 'Bearer ' + authContext.token
            });
            history.push('/');
        } catch(err) {
            devLog(err);
        }
    };

    return (
        <Fragment>
            <ErrorModal onClear={clearError} error={error} show={!!error} />
            {isLoading && <Spinner asOverlay />}
            {!isLoading && <form className='generic__form-wrapper' onSubmit={onSubmitHandler}>
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
                <ImageUpload 
                    id='image'
                    onInput={inputHandler}
                    errorText='Please provide an image.'
                    center
                />
                <Button 
                    type='submit'
                    disabled={!state.isValid}
                    style={{width: '100%'}}
                >
                    Add Place
                </Button>
            </form>}
        </Fragment>
    )
};


export default NewPlace;