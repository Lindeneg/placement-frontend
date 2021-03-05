import { useParams } from 'react-router-dom'

import PlaceList from '../../components/PlaceList/PlaceList';
import { BaseProps, Functional, Place, UserPlacesParams } from "../../../common/types";

interface UserPlacesProps extends BaseProps {

};

const PLACES: Place[] = [
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


const UserPlaces: Functional<UserPlacesProps> = props => {

    const param = useParams<UserPlacesParams>();
    const loadedPlaces = PLACES.filter((e: Place): boolean => e.creatorId === param.userId);
    return (
        <PlaceList 
            places={loadedPlaces}
        />
    )
};

export default UserPlaces;