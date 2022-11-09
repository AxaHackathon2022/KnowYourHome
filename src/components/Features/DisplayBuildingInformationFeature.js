import React from "react";
import Card from "../UI/Card";

import classes from './DisplayBuildingInformation.module.css'

function DisplayBuildingInformationFeature(props) {
    function getHeatingString(heatingCode) {
        let returnString;
        switch (heatingCode) {
            case 860:
                returnString = "Heizkessel";
                break;
            default:
                returnString = "Wärmepupe/Fernwärme";
                break;
        }
        return returnString;
    }
    return (
        <>
            {(props.currentLocation.address || props.currentBuildingInformation.egid) && (<Card className={classes.displayBuildingInformation}>
                <h3>{props.currentLocation.address}</h3>
                <p><b>Lat:</b> {props.currentLocation.lat}, <b>Lon:</b> {props.currentLocation.lon}</p>
                <p>&nbsp;</p>
                <p className={classes.displayBuildingInformation}><b>Eidgenössische Gebäude ID:</b> {props.currentBuildingInformation.egid}</p>
                <p className={classes.displayBuildingInformation}><b>Heizung:</b> {getHeatingString(props.currentBuildingInformation.gwaersceh1)}</p>
                <p className={classes.displayBuildingInformation}><b>Baujahr:</b> {props.currentBuildingInformation.gbauj}</p>
                <p className={classes.displayBuildingInformation}><b>Gebäudefläche:</b> {props.currentBuildingInformation.garea} &#13217;</p>
                <p className={classes.displayBuildingInformation}><b>Anzahl Geschosse:</b> {props.currentBuildingInformation.gastw}</p>
                <hr /><p><b>Schätzwert:</b> CHF 1'200'000.00 </p>
                <p><b>Hypothek:</b> CHF 800'000.00 </p>

            </Card>)

            }
        </>
    );
};

export default DisplayBuildingInformationFeature;