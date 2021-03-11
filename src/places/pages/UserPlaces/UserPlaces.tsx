import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'

import useHttp from '../../../common/hooks/http';
import ErrorModal from '../../../common/components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import PlaceList from '../../components/PlaceList/PlaceList';
import { getURL } from '../../../common/util/util';
import { 
    Functional, 
    UserPlacesParams,
    PlaceResponse
} from "../../../common/types";


/**
 * Component with list of Places tied to a given User.
 */

const UserPlaces: Functional = props => {
    const { isLoading, error, clearError, sendRequest } = useHttp<PlaceResponse[]>();
    const [places, setPlaces]                           = useState<PlaceResponse[]>([]);
    const [didRequest, setDidRequest]                   = useState<boolean>(false);
    const userId: string                                = useParams<UserPlacesParams>().userId;

    useEffect(() => {
        (async () => {
            try {
                const res: PlaceResponse[] | void = await sendRequest(getURL(`places/user/${userId}`));
                res && setPlaces(res);
            } catch(err) {
                // error handled in error state from useHttp
            } finally {
                setDidRequest(true);
            }
        })();
    }, [sendRequest, userId]);

    const onPlaceDeleteHandler = (placeId: string): void => {
        setPlaces(prev => prev.filter(e => e._id !== placeId));
    }

    return (
        <Fragment>
            <ErrorModal onClear={clearError} error={error} show={!!error} />
            {isLoading && <div className='center'><Spinner asOverlay /></div>} 
            {!isLoading && didRequest && <PlaceList 
                places={places}
                onDelete={onPlaceDeleteHandler} />}
        </Fragment>
    )
};


export default UserPlaces;