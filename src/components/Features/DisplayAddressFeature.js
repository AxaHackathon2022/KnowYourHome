import React from "react";
import Card from "../UI/Card";

import classes from './DisplayAddressFeature.module.css'

function DisplayAddressFeature(props) {

    return (
        <>
        {(props.currentLocation.address ) && (props.currentLocation.egid && props.currentLocation.egid.length) && (<Card className={classes.displayAddress}>
            <p>Adresse: {props.currentLocation.address}&nbsp;
                (Lat: {props.currentLocation.lat},&nbsp;
                Lon: {props.currentLocation.lon}),&nbsp;
                FeatureId: {props.currentLocation.featureId}),&nbsp;
                Egid: {props.currentLocation.egid})
            </p>
        </Card>)

        }
        </>
    );
};

export default DisplayAddressFeature;