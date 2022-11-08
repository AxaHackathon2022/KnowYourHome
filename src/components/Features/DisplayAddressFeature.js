import React from "react";
import Card from "../UI/Card";

import classes from './DisplayAddressFeature.module.css'

function DisplayAddressFeature(props) {

    return (
        <>
        {(props.currentLocation.address ) && (<Card className={classes.displayAddress}>
            <p>Address: {props.currentLocation.address}&nbsp;</p>
            <p>(Lat: {props.currentLocation.lat},&nbsp;</p>
            <p>Lon: {props.currentLocation.lon})</p>
        </Card>)}
        </>
    );
};

export default DisplayAddressFeature;