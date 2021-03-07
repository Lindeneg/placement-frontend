import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useForm from '../../../common/hooks/form';
import Input from '../../../common/components/Interaction/Input/Input';
import Button from '../../../common/components/Interaction/Button/Button';
import Card from '../../../common/components/UI/Card/Card';
import { Functional, OnSubmitFunc, Place, UpdatePlaceParams, UseStateTuple, ValidationType } from "../../../common/types";
import { getValidator } from '../../../common/util/validators';



const DUMMY_DATA: Place[] = [
    {
        id: 'p1',
        creatorId: 'u1',
        title: 'Sweet home!',
        description: 'Cosy place to live.',
        image: 'https://s19623.pcdn.co/wp-content/uploads/2015/08/copenhagen-budget-guide.jpg',
        address: 'Ulstensvej 51, 2650 Valby',
        location: {lat: 55.667315, lng: 12.507300}
    },
    {
        id: 'p2',
        creatorId: 'u2',
        title: 'Eeeew Sweden!',
        description: 'I dont feel sorry for them.',
        image: 'https://www.gavelintl.com/wp-content/uploads/2018/06/stockholm1.jpg',
        address: 'Liljeholmen 11, 21120 Stockholm',
        location: {lat: 59.308010, lng: 18.034725}
    }
];


const UpdatePlace: Functional = props => {
    const [isLoading, setIsLoading]: UseStateTuple<boolean> = useState<boolean>(true);
    const param = useParams<UpdatePlaceParams>();

    const [state, inputHandler, setFormState] = useForm({
        inputs: {
            title      : { value: '', isValid: false },
            description: { value: '', isValid: false }
        },
        isValid: false
    });

    const onSubmitHandler: OnSubmitFunc = event => {
        event.preventDefault();
        console.log(state.inputs);
    };
    
    const place = DUMMY_DATA.find(e => e.id === param.placeId);
    
    useEffect(() => {
        if (place) {
            setFormState({
                inputs: {
                    title: { value: place.title, isValid: true },
                    description: { value: place.description, isValid: true }
                },
                isValid: true
            });
        }
        setIsLoading(false);
    }, [setFormState, place]);


    if (isLoading) {
        return (
            <div className='center'><h2>Loading...</h2></div>
        );
    }

    if (!place) {
        return (
            <Card>
                <div className='center'><h2>Could not find place.</h2></div>
            </Card>
        );
    }

    return (
        <form className='generic__form-wrapper' onSubmit={onSubmitHandler}>
            <Input 
                id='title'
                label='Title'
                element='input'
                type='text'
                errorText='Enter a valid title'
                onInput={inputHandler}
                validators={[getValidator(ValidationType.Require)]}
                value={state.inputs.title.value}
                valid={state.inputs.title.isValid}
            />
            <Input 
                id='description'
                label='Description'
                element='text-area'
                errorText='Enter a valid description (at least 5 characters)'
                onInput={inputHandler}
                validators={[getValidator(ValidationType.MinLength, 5)]}
                value={state.inputs.description.value}
                valid={state.inputs.description.isValid}
            />
            <Button
                type='submit'
                disabled={!state.isValid}
            >
                Submit Change
            </Button>
        </form>
    )
};


export default UpdatePlace;