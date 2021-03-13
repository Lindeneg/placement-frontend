import PlaceListItem from './PlaceListItem/PlaceListItem';
import Card from '../../../common/components/UI/Card/Card';
import Button from '../../../common/components/Interaction/Button/Button';
import { BaseProps, Functional, PlaceResponse } from "../../../common/types";
import classes from './PlaceList.module.css';


interface PlaceListProps extends BaseProps {
    places  : PlaceResponse[],
    onDelete: (placeId: string) => void
};


/**
 * Component with list of Places.
 */

const PlaceList: Functional<PlaceListProps> = props => {
    if (!(props.places.length > 0)) {
        return (
            <div className={[classes.List, 'center'].join(' ')}>
                <Card>
                    <h2>No places found. Go ahead and create one!</h2>
                    <Button link={{to: '/places/new'}} >Share Place</Button>
                </Card>
            </div>
        )
    }
    return (
        <ul className={classes.List} >
            {props.places.map((place: PlaceResponse): JSX.Element => (
                <PlaceListItem {...place} key={place._id} onDelete={props.onDelete} />
            ))}
        </ul>
    )
};


export default PlaceList;