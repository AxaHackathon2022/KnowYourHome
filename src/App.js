import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchFeature from "./components/Features/SearchFeature";
import DisplayAddressFeature from "./components/Features/DisplayAddressFeature";
import MapFeature from "./components/Features/MapFeature";

function App() {
  const [searchLocation, setSearchLocation] = useState({});

  const searchLocationHandler = (paramAddress, paramLat, paramLon, paramFeatureId, paramZoomLevel) => {
    setSearchLocation({ address: paramAddress, lat: paramLat, lon: paramLon, featureId: paramFeatureId, zoomLevel: paramZoomLevel});
  };

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <SearchFeature
          currentLocation={searchLocation}
          onSearchLocation={searchLocationHandler}
        />
        <DisplayAddressFeature 
          currentLocation={searchLocation}
        />
          <MapFeature posLng={searchLocation.lon} posLat={searchLocation.lat}/>
      </div>
    </div>
  );
}

export default App;
