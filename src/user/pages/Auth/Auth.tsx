import useForm from '../../../common/hooks/form';
import Input from '../../../common/components/Interaction/Input/Input';
import Card from '../../../common/components/UI/Card/Card';
import Button from '../../../common/components/Interaction/Button/Button';
import { Functional, OnSubmitFunc, ValidationType } from "../../../common/types";
import { getValidator } from '../../../common/util/validators';
import classes from './Auth.module.css';


const Login: Functional = props => {

    const [state, inputHandler] = useForm({
        inputs: {
            email   : { value: '', isValid: false },
            password: { value: '', isValid: false }
        },
        isValid: false
    });

    const onSubmitHandler: OnSubmitFunc = event => {
        event.preventDefault();
        console.log(state.inputs);
    };

    return (
        <Card className={classes.Auth} style={{maxWidth: '40rem'}}>
            <h2 className={classes.Header} >Login Required</h2>
            <hr />
            <form className='generic__form-wrapper' onSubmit={onSubmitHandler} >
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
                    type='text'
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
                    Login
                </Button>
            </form>
        </Card>
    );
};


export default Login;