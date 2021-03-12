import { Fragment, useState, useContext } from 'react';

import useHttp from '../../../../common/hooks/http';
import ErrorModal from '../../../../common/components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../../../common/components/UI/Spinner/Spinner';
import Modal from '../../../../common/components/UI/Modal/Modal';
import AuthContext from '../../../../common/context/auth';
import Map from '../../../../common/components/UI/Map/Map';
import Button from '../../../../common/components/Interaction/Button/Button';
import Card from '../../../../common/components/UI/Card/Card';
import { 
    BaseProps, 
    Functional, 
    PlaceResponse 
} from "../../../../common/types";
import classes from './PlaceListItem.module.css';
import { getURL } from '../../../../common/util/util';


interface PlaceListItemProps extends BaseProps, PlaceResponse {
    onDelete: (placeId: string) => void
};


/**
 * Component for displaying a Place entry in a PlaceList.
 */

const PlaceListItem: Functional<PlaceListItemProps> = props => {
    const authContext                                   = useContext(AuthContext);
    const { isLoading, error, clearError, sendRequest } = useHttp<PlaceResponse>();
    const [showMap, setShowMap]                         = useState<boolean>(false);
    const [showDeleteConfirm, setDeleteConfirm]         = useState<boolean>(false);

    const onOpenMapHandler = () => {
        setShowMap(true);
    };

    const onCloseMapHandler = () => {
        setShowMap(false);
    };

    const onOpenDeleteConfirmHandler = () => {
        setDeleteConfirm(true);
    };

    const onCloseDeleteConfirmHandler = () => {
        setDeleteConfirm(false);
    };

    const onConfirmDelete = async () => {
        setDeleteConfirm(false); 
        try {
            await sendRequest(getURL(`places/${props._id}`), 'DELETE', null, {
                'Authorization': 'Bearer ' + authContext.token
            });
            props.onDelete(props._id);
        } catch (err) {
            // error handled in error state from useHttp
        }
    };

    return (
        <Fragment>
            <ErrorModal onClear={clearError} error={error} show={!!error} />
            <Modal 
                show={showMap}
                onClose={onCloseMapHandler}
                headerText={props.address}
                contentCls={classes.ModalContent}
                footerCls={classes.ModalActions}
                footerNodes={<Button onClick={onCloseMapHandler} >CLOSE</Button>}
            >
                <div className={classes.Map}>
                    <Map 
                        center={props.location}
                        zoom={16}
                    />
                </div>
            </Modal>
            <Modal
                show={showDeleteConfirm}
                onClose={onCloseDeleteConfirmHandler}
                headerText='Are you sure?'
                footerCls={classes.ModalActions}
                footerNodes={
                    <Fragment>
                        <Button inverse onClick={onCloseDeleteConfirmHandler} >CANCEL</Button>
                        <Button danger onClick={onConfirmDelete} >DELETE</Button>
                    </Fragment>
                }
            >
                Are you sure you'd want to proceed? The action cannot be undone.
            </Modal>
            <li className={classes.Item}>
                <Card className={classes.Content} >
                    {isLoading && <Spinner asOverlay />}
                    <div className={classes.Image}>
                        <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/${props.image}`} alt={props.title}/>
                    </div>
                    <div className={classes.Info}>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className={classes.Actions} >
                        <Button onClick={onOpenMapHandler} inverse>VIEW ON MAP</Button>

                        {props.creatorId === authContext.userId && <Button link={{to: `/places/${props._id}`}}>EDIT</Button>}
                        {props.creatorId === authContext.userId && <Button danger onClick={onOpenDeleteConfirmHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </Fragment>
    )
};


export default PlaceListItem;