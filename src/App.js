import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchFeature from "./components/Features/SearchFeature";
import MapFeature from "./components/Features/MapFeature";
import DisplayBuildingInformationFeature from "./components/Features/DisplayBuildingInformationFeature";


function App() {
  const [searchLocation, setSearchLocation] = useState({});
  const [buildingInformation, setBuildingInformation] = useState({});


  const searchLocationHandler = (paramAddress, paramLat, paramLon, paramFeatureId, paramZoomLevel, paramEgid) => {
    setSearchLocation({ address: paramAddress, lat: paramLat, lon: paramLon, featureId: paramFeatureId, zoomLevel: paramZoomLevel, egid: paramEgid});
  };


  const buildingInformationHandler = (buildingInformationSource) => {
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
