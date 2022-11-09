import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchFeature from "./components/Features/SearchFeature";
import MapFeature from "./components/Features/MapFeature";
import DisplayBuildingInformationFeature from "./components/Features/DisplayBuildingInformationFeature";


function App() {
  const [searchLocation, setSearchLocation] = useState({});
  const [buildingInformation, setBuildingInformation] = useState({});


  const searchLocationHandler = (paramAddress, paramLat, paramLon) => {
    setSearchLocation({ address: paramAddress, lat: paramLat, lon: paramLon });
  };


  const buildingInformationHandler = (buildingInformationSource) => {
    console.log("handler: ");
    console.log(buildingInformationSource);
    setBuildingInformation(buildingInformationSource);
  };

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <SearchFeature
          currentLocation={searchLocation}
          onSearchLocation={searchLocationHandler}
          onBuildingInformationChange={buildingInformationHandler}
        />
        <DisplayBuildingInformationFeature
          currentLocation={searchLocation}
          currentBuildingInformation={buildingInformation} />
        <MapFeature posLng={searchLocation.lon} posLat={searchLocation.lat} />
      </div>
    </div>
  );
}

export default App;
