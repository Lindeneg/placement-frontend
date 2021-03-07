import { useState, useContext } from 'react';

import useForm from '../../../common/hooks/form';
import Input from '../../../common/components/Interaction/Input/Input';
import Card from '../../../common/components/UI/Card/Card';
import Button from '../../../common/components/Interaction/Button/Button';
import AuthContext from '../../../common/context/auth';
import { Functional, OnClickFunc, OnSubmitFunc, UseStateTuple, ValidationType } from "../../../common/types";
import { getValidator } from '../../../common/util/validators';
import classes from './Auth.module.css';


const Login: Functional = props => {

    const authContext                                           = useContext(AuthContext);
    const [isInLoginMode, setLoginMode]: UseStateTuple<boolean> = useState<boolean>(false);

    const [state, inputHandler, setFormState] = useForm({
        inputs: {
            email   : { value: '', isValid: false },
            password: { value: '', isValid: false }
        },
        isValid: false
    });

    const onSubmitHandler: OnSubmitFunc = event => {
        event.preventDefault();
        console.log(state.inputs);
        authContext.login();
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
                    name: { value: '', isValid: false }
                },
                isValid: false
            });
        }
        setLoginMode(prevState => !prevState);
    };

    return (
        <Card className={classes.Auth} style={{maxWidth: '40rem'}}>
            <h2 className={classes.Header}>{isInLoginMode ? 'Proceed Login' : 'Proceed Sign Up'}</h2>
            <hr />
            <form className='generic__form-wrapper' onSubmit={onSubmitHandler} >
                {!isInLoginMode && 
                    <Input 
                    id='name'
                    label='Name'
                    element='input'
                    type='text'
                    errorText='Please enter a name.'
                    onInput={inputHandler}
                    validators={[getValidator(ValidationType.Require)]}
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
    );
};


export default Login;