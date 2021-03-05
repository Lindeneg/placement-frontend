import Input from '../../../common/components/Interaction/Input/Input';
import { BaseProps, Functional } from "../../../common/types";
import classes from './NewPlace.module.css';

interface NewPlacesProps extends BaseProps {

};

const NewPlaces: Functional<NewPlacesProps> = props => (
    <div className={classes.Form}>
        <Input type='text' label='Title' element='input' errorText='Please Enter Valid Title' />
    </div>
);

export default NewPlaces;