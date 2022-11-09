import React from "react";
import Card from "../UI/Card";

import classes from './DisplayBuildingInformation.module.css'

function DisplayBuildingInformationFeature(props) {
    console.log("BI");
    console.log(props.currentBuildingInformation);
    console.log(props.currentBuildingInformation.egid);
 
    return (
        <>
        {(props.currentBuildingInformation ) && (<Card className={classes.displayBuildingInformation}>
            <p>Eidgenössische Gebäude ID: {props.currentBuildingInformation.egid}</p>
            <p>Heizung: {props.currentBuildingInformation.gwaersceh1}</p>
            <p>Baujahr: {props.currentBuildingInformation.gbauj}</p>
            <p>Gebäudefläche: {props.currentBuildingInformation.garea} &#13217;</p>
            <p>Gebäudevolumen: {props.currentBuildingInformation.gvolsce} &#13221;</p>
            <p>Anzahl Geschosse: {props.currentBuildingInformation.gastw}</p>
            
            
        </Card>)
        
        }
        </>
    );
};

export default DisplayBuildingInformationFeature;