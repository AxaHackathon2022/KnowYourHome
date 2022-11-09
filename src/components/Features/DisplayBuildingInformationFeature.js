import React from "react";
import Card from "../UI/Card";

import classes from './DisplayBuildingInformation.module.css'

function DisplayBuildingInformationFeature(props) {
     return (
        <>
        {(props.currentBuildingInformation ) && (<Card className={classes.displayBuildingInformation}>
            <p className={classes.displayBuildingInformation}><b>Eidgenössische Gebäude ID:</b> {props.currentBuildingInformation.egid}</p>
            <p className={classes.displayBuildingInformation}><b>Heizung:</b> {props.currentBuildingInformation.gwaersceh1}</p>
            <p className={classes.displayBuildingInformation}><b>Baujahr:</b> {props.currentBuildingInformation.gbauj}</p>
            <p className={classes.displayBuildingInformation}><b>Gebäudefläche:</b> {props.currentBuildingInformation.garea} &#13217;</p>
            <p className={classes.displayBuildingInformation}><b>Gebäudevolumen:</b> {props.currentBuildingInformation.gvolsce} &#13221;</p>
            <p className={classes.displayBuildingInformation}><b>Anzahl Geschosse:</b> {props.currentBuildingInformation.gastw}</p>
            
            
        </Card>)
        
        }
        </>
    );
};

export default DisplayBuildingInformationFeature;