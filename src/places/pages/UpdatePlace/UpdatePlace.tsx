import { Fragment, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useHttp from '../../../common/hooks/http';
import useForm from '../../../common/hooks/form';
import ErrorModal from '../../../common/components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import Card from '../../../common/components/UI/Card/Card';
import Input from '../../../common/components/Interaction/Input/Input';
import Button from '../../../common/components/Interaction/Button/Button';
import { getURL } from '../../../common/util/util';
import { getValidator } from '../../../common/util/validators';
import { 
    Functional, 
    OnSubmitFunc, 
    UpdatePlaceParams, 
    PlaceResponse, 
    ValidationType 
} from "../../../common/types";



const UpdatePlace: Functional = props => {
    const history                                       = useHistory();
    const { isLoading, error, clearError, sendRequest } = useHttp<PlaceResponse>();
    const [didRequest, setDidRequest]                   = useState<boolean>(false);
    const [place, setPlace]                             = useState<PlaceResponse | void>();
    const placeId: string                               = useParams<UpdatePlaceParams>().placeId;

    const [state, inputHandler, setFormState] = useForm({
        inputs: {
            title      : { value: '', isValid: false },
            description: { value: '', isValid: false }
        },
        isValid: false
    });

    const onSubmitHandler: OnSubmitFunc = async event => {
        event.preventDefault();
        try {
            await sendRequest(getURL(`places/${placeId}`), 'PATCH', JSON.stringify({
                title      : state.inputs.title.value,
                description: state.inputs.description.value
            }), { 'Content-Type': 'application/json' });
            history.goBack();
        } catch (err) {
            // error handled in error state from useHttp
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const res: PlaceResponse | void = await sendRequest(getURL(`places/${placeId}`));
                setPlace(res);
                res && setFormState({
                    inputs: {
                        title: { value: res.title, isValid: true },
                        description: { value: res.description, isValid: true }
                    },
                    isValid: true
                });
            } catch(err) {
                // error handled in error state from useHtt
            } finally {
                setDidRequest(true);
            }
        })();
    }, [sendRequest, setFormState, placeId]);

    if (!place && !error && didRequest) {
        return (
            <div className='center'>
                <Card>
                    <h2>
                        Desired place could not be found.
                    </h2>
                </Card>
            </div>
        );
    }
    
    return (
        <Fragment>
            {error && <ErrorModal onClear={clearError} error={error} show={!!error} />}
            {isLoading && <Spinner asOverlay />}
            {!isLoading && place && <form className='generic__form-wrapper' onSubmit={onSubmitHandler}>
                <Input 
                    id='title'
                    label='Title'
                    element='input'
                    type='text'
                    errorText='Enter a valid title'
                    onInput={inputHandler}
                    validators={[getValidator(ValidationType.Require)]}
                    value={place.title}
                    valid={!!place.title}
                />
                <Input 
                    id='description'
                    label='Description'
                    element='text-area'
                    errorText='Enter a valid description (at least 5 characters)'
                    onInput={inputHandler}
                    validators={[getValidator(ValidationType.MinLength, 5)]}
                    value={place.description}
                    valid={!!place.description}
                />
                <Button
                    type='submit'
                    disabled={!state.isValid}
                >
                    Submit Change
                </Button>
            </form>}
        </Fragment>
    )
};


export default UpdatePlace;