import { useState, useContext, Fragment } from 'react';

import useForm from '../../../common/hooks/form.hook';
import useHttp from '../../../common/hooks/http.hook';
import Input from '../../../common/components/Interaction/Input/Input';
import ImageUpload from '../../../common/components/Interaction/ImageUpload/ImageUpload';
import Card from '../../../common/components/UI/Card/Card';
import ErrorModal from '../../../common/components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import Button from '../../../common/components/Interaction/Button/Button';
import AuthContext from '../../../common/context/auth.context';
import { getURL, devLog } from '../../../common/util/util';
import { getValidator } from '../../../common/util/validators';
import { 
    Functional, 
    OnClickFunc, 
    OnSubmitFunc, 
    ValidationType, 
    UserResponse 
} from "../../../common/types";
import classes from './Auth.module.css';



/**
 * Component to handle login and signup.
 */

const Auth: Functional = props => {
    const authContext                                   = useContext(AuthContext);
    const [isInLoginMode, setLoginMode]                 = useState<boolean>(true);
    const { isLoading, error, clearError, sendRequest } = useHttp<UserResponse>();

    const [state, inputHandler, setFormState] = useForm({
        inputs: {
            email   : { value: '', isValid: false },
            password: { value: '', isValid: false }
        },
        isValid: false
    });

    const onSubmitHandler: OnSubmitFunc = async event => {
        event.preventDefault();

        if (isInLoginMode) {
            try {
                const res: UserResponse | void = await sendRequest(
                    getURL('users/login'), 
                    'POST',
                    JSON.stringify({
                        email: state.inputs.email.value,
                        password: state.inputs.password.value
                    }),
                    { 'Content-Type': 'application/json' });
                res && authContext.login(res._id, res.token || '');
            } catch (err) {
                devLog(err)
            }
        } else {
            try {
                const formData: FormData = new FormData();
                // this should only run when the desired input is present
                // so the fallback is solely to satisfy tsc due to my type definitions 
                // so I'll probably redo the validation types at some point
                formData.append('name', state.inputs.name.value?.toString() || '');
                formData.append('email', state.inputs.email.value?.toString() || '');
                formData.append('password', state.inputs.password.value?.toString() || '');
                formData.append('image', state.inputs.image.value instanceof File ? state.inputs.image.value : '');
                const res: UserResponse | void = await sendRequest(
                    getURL('users/signup'), 
                    'POST',
                    formData
                );
                res && authContext.login(res._id, res.token || '');
            } catch(err) {
                devLog(err)
            }
        }
    };

    const onToggleModeHandler: OnClickFunc = () => {
        if (!isInLoginMode) {
            setFormState({
                inputs: {
                    email   : { ...state.inputs.email },
                    password: { ...state.inputs.password }
                },
                isValid: state.inputs.email.isValid && state.inputs.password.isValid
            });
        } else {
            setFormState({
                inputs: {
                    ...state.inputs,
                    name : { value: '', isValid: false },
                    image: { value: '', isValid: false }
                },
                isValid: false
            });
        }
        setLoginMode(prevState => !prevState);
    };

    return (
        <Fragment>
            {error && <ErrorModal onClear={clearError} error={error} show={!!error} />}
            <Card className={classes.Auth} style={{maxWidth: '40rem'}}>
                {isLoading && <Spinner asOverlay />}
                <h2 className={classes.Header}>{isInLoginMode ? 'Proceed Login' : 'Proceed Sign Up'}</h2>
                <hr />
                <form className='generic__form-wrapper' onSubmit={onSubmitHandler} >
                    {!isInLoginMode && <Input 
                        id='name'
                        label='Name'
                        element='input'
                        type='text'
                        errorText='Please enter a name.'
                        onInput={inputHandler}
                        validators={[getValidator(ValidationType.Require)]}
                    />}
                    {!isInLoginMode && <ImageUpload 
                        id='image'
                        errorText='Please provide an image.'
                        onInput={inputHandler}
                        center
                    />}
                    <Input 
                        id='email'
                        label='Email'
                        element='input'
                        type='email'
                        errorText='Please enter a valid email address.'
                        onInput={inputHandler}
                        validators={[
                            getValidator(ValidationType.Require),
                            getValidator(ValidationType.Email)
                        ]}
                    />
                    <Input 
                        id='password'
                        label='Password'
                        element='input'
                        type='password'
                        errorText='Please enter a valid password (at least 8 characters but at most 32).'
                        onInput={inputHandler}
                        validators={[
                            getValidator(ValidationType.Require),
                            getValidator(ValidationType.MinLength, 8),
                            getValidator(ValidationType.MaxLength, 32)
                        ]}
                    />
                    <Button
                        type='submit'
                        disabled={!state.isValid}
                    >
                        {isInLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button 
                    inverse 
                    type='button'
                    onClick={onToggleModeHandler}
                >
                        {isInLoginMode ? 'SWITCH TO SIGNUP' : 'SWITCH TO LOGIN'}
                </Button>
            </Card>
        </Fragment>
    );
};


export default Auth;