import Input from '../../../common/components/Interaction/Input/Input';
import { getValidator } from '../../../common/util/validators';
import { 
    BaseProps, 
    Functional, 
    ValidationType 
} from "../../../common/types";
import classes from './NewPlace.module.css';


interface NewPlacesProps extends BaseProps {

};


/**
 * Component for creating a new Place structure.
 */

const NewPlace: Functional<NewPlacesProps> = props => (
    <div className={classes.Form}>
        <Input 
            type='text' 
            label='Title' 
            element='input' 
            errorText='Please enter a valid Title' 
            validators={[
                getValidator(ValidationType.Require)
            ]}
        />
    </div>
);


export default NewPlace;