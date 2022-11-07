import React from "react";
import Card from "../UI/Card";

import classes from './DisplayAdressFeature.module.css'

function DisplayAdressFeature(props) {

    return (
        <Card className={classes.displayAdress}>
            <p>Adress: {props.currentLocation.adress}&nbsp;</p>
            <p>(X: {props.currentLocation.locX},&nbsp;</p>
            <p>Y: {props.currentLocation.locY})</p>
        </Card>
    );
};

export default DisplayAdressFeature;