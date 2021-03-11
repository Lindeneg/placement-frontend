import { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useHttp from '../../../common/hooks/http';
import useForm from '../../../common/hooks/form';
import Button from '../../../common/components/Interaction/Button/Button';
import Input from '../../../common/components/Interaction/Input/Input';
import ErrorModal from '../../../common/components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import AuthContext from '../../../common/context/auth';
import { getURL } from '../../../common/util/util';
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
            address    : { value: '', isValid: false} 
    },
        isValid: false,
    });


    const onSubmitHandler: OnSubmitFunc = async event => {
        event.preventDefault();
        try {
            await sendRequest(getURL('places'), 'POST', JSON.stringify({
                title: state.inputs.title.value,
                description: state.inputs.description.value,
                address: state.inputs.address.value,
                creatorId: authContext.userId,
                image: 'https://jewishinsider.nyc3.digitaloceanspaces.com/wp-content/uploads/2020/04/18184101/7186961586_5ad112c3c0_k-1200x689.jpg'
            }), { 'Content-Type': 'application/json' });
            history.push('/');
        } catch(err) {
            // error handled in error state from useHttp
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
                <Button 
                    type='submit'
                    disabled={!state.isValid}
                >
                    Add Place
                </Button>
            </form>}
        </Fragment>
    )
};


export default NewPlace;