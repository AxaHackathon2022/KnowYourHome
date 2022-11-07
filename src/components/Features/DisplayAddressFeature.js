import React from "react";
import Card from "../UI/Card";

import classes from './DisplayAddressFeature.module.css'

function DisplayAddressFeature(props) {

    return (
        <>
        {(props.currentLocation.address ) && (<Card className={classes.displayAddress}>
            <p>Address: {props.currentLocation.address}&nbsp;</p>
            <p>(X: {props.currentLocation.locX},&nbsp;</p>
            <p>Y: {props.currentLocation.locY})</p>
        </Card>)}
        </>
    );
};

export default DisplayAddressFeature;