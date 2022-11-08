import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/UI/Card";
import SearchFeature from "./components/Features/SearchFeature";
import DisplayAddressFeature from "./components/Features/DisplayAddressFeature";
import MyMap from "./components/Features/PublicMap";

function App() {
  const [searchLocation, setSearchLocation] = useState({});

  const searchLocationHandler = (paramAddress, paramX, paramY) => {
    setSearchLocation({ address: paramAddress, locX: paramX, locY: paramY });
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
        <Card>
          <MyMap />
        </Card>
      </div>
    </div>
  );
}

export default App;
