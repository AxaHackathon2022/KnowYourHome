import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/UI/Card";
import SearchFeature from "./components/Features/SearchFeature";
import DisplayAdressFeature from "./components/Features/DisplayAdressFeature";

function App() {
  const [searchLocation, setSearchLocation] = useState({});

  const searchLocationHandler = (paramAdress, paramX, paramY) => {
    setSearchLocation({ adress: paramAdress, locX: paramX, locY: paramY });
  };

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <SearchFeature
          currentLocation={searchLocation}
          onSearchLocation={searchLocationHandler}
        />
        <DisplayAdressFeature 
          currentLocation={searchLocation}
        />
        <Card>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Card>
      </div>
    </div>
  );
}

export default App;
