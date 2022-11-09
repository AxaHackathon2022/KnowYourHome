import React from "react";
import Card from "../UI/Card";

import classes from './DisplayBuildingInformation.module.css'

function DisplayBuildingInformationFeature(props) {
    function getHeatingString(heatingCode) {
        let returnString;
        switch (heatingCode) {
            case     7500:
                returnString = "Keine";
                break;
            case     7501:
                returnString = "Luft";
                break;
            case     7510:
                returnString = "Erdwärme (generisch)";
                break;
            case     7511:
                returnString = "Erdwärmesonde";
                break;
            case     7512:
                returnString = "Erdregister";
                break;
            case     7513:
                returnString = "Wasser (Grundwasser, Oberflächenwasser, Abwasser)";
                break;
            case     7520:
                returnString = "Gas";
                break;
            case     7530:
                returnString = "Heizöl";
                break;
            case     7540:
                returnString = "Holz (generisch)";
                break;
            case     7541:
                returnString = "Holz (Stückholz)";
                break;
            case     7542:
                returnString = "Holz (Pellets)";
                break;
            case     7543:
                returnString = "Holz (Schnitzel)";
                break;
            case     7550:
                returnString = "Abwärme (innerhalb des Gebäudes)";
                break;
            case     7560:
                returnString = "Elektrizität";
                break;
            case     7570:
                returnString = "Sonne (thermisch)";
                break;
            case     7580:
                returnString = "Fernwärme (generisch)";
                break;
            case     7581:
                returnString = "Fernwärme (Hochtemperatur)";
                break;
            case     7582:
                returnString = "Fernwärme (Niedertemperatur)";
                break;
            case     7598:
                returnString = "Unbestimmt";
                break;
            case     7599:
                returnString = "Andere";
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
                <p className={classes.displayBuildingInformation}><b>Heizung:</b> {getHeatingString(props.currentBuildingInformation.genh1)}</p>
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