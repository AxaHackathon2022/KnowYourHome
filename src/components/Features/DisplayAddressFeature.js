import React from "react";
import Card from "../UI/Card";

import classes from './DisplayAddressFeature.module.css'

function DisplayAddressFeature(props) {

    return (
        <>
        {(props.currentLocation.address ) && (<Card className={classes.displayAddress}>
            <p>Adresse: {props.currentLocation.address}&nbsp;
            (Lat: {props.currentLocation.lat},&nbsp;
            Lon: {props.currentLocation.lon})</p>
        </Card>)
        
        }
        </>
    );
};

export default DisplayAddressFeature;