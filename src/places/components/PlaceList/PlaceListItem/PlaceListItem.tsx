import { Fragment, useState } from 'react';


import Modal from '../../../../common/components/UI/Modal/Modal';
import Map from '../../../../common/components/UI/Map/Map';
import Button from '../../../../common/components/Interaction/Button/Button';
import Card from '../../../../common/components/UI/Card/Card';
import { BaseProps, Functional, Place, UseStateTuple } from "../../../../common/types";
import classes from './PlaceListItem.module.css';


interface PlaceListItemProps extends BaseProps, Place {};


const PlaceListItem: Functional<PlaceListItemProps> = props => {

    const [showMap, setShowMap]: UseStateTuple<boolean> = useState<boolean>(false);

    const onOpenMapHandler = () => {
        setShowMap(true);
    };

    const onCloseMapHandler = () => {
        setShowMap(false);
    };


    return (
        <Fragment>
            <Modal 
                show={showMap}
                onClose={onCloseMapHandler}
                headerText={props.address}
                contentCls={classes.PlaceListItemModalContent}
                footerCls={classes.PlaceListItemModalActions}
                footerNodes={<Button onClick={onCloseMapHandler} >CLOSE</Button>}
            >
                <div className={classes.MapContainer}>
                    <Map 
                        center={props.location}
                        zoom={16}
                    />
                </div>
            </Modal>
            <li className={classes.PlaceListItem}>
                <Card className={classes.PlaceListItemContent} >
                    <div className={classes.PlaceListItemImage}>
                        <img src={props.image} alt={props.title}/>
                    </div>
                    <div className={classes.PlaceListItemInfo}>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className={classes.PlaceListItemActions} >
                        <Button onClick={onOpenMapHandler} inverse>VIEW ON MAP</Button>

                        <Button link={{to: `places/${props.id}`}}>EDIT</Button>

                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </Fragment>
    )
};

export default PlaceListItem;