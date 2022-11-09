import React, { useEffect, useRef, useState } from "react";
import classes from "./SearchFeature.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

function SearchFeature(props) {
  const addressInputRef = useRef();
  const [locationObject, setLocationObject] = useState({});

  async function fetchAddress(inputValue) {
    if (inputValue) {
      const str = inputValue.split(' ').join('+');
      const response = await fetch(`https://maps.google.com/maps/api/geocode/json?address=${str}&key=AIzaSyCzSfrU0mR4BDwWARDNFZaSugM5bzVhdjU`);
      const fetchedResponse = await response.json(response);
      console.log(fetchedResponse);
      setLocationObject(fetchedResponse.results);
    };
  };

  async function fetchBuildingInformation(inputValue) {
    inputValue = 2323872;
    if (inputValue) {
      const response = await fetch('https://api3.geo.admin.ch/rest/services/api/MapServer/find?layer=ch.bfs.gebaeude_wohnungs_register&searchText='+egid+'&searchField=egid&returnGeometry=false&contains=false')
      const fetchedResponse = await response.json(response);
      console.log(fetchedResponse);
    }
  }

  useEffect(() => {
    console.log(locationObject);
    if (locationObject && locationObject.length === 1) {
      const resultAddress = locationObject[0];
      props.onSearchLocation(resultAddress.formatted_address, resultAddress.geometry.location.lat, resultAddress.geometry.location.lng);
    };

  }, [locationObject]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //fetchAddress(addressInputRef.current.value);
    fetchBuildingInformation
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={onSubmitHandler}>
        <input
          id="searchAddress"
          type="text"
          placeholder="Search Location ..."
          ref={addressInputRef}
        />
        <Button type="submit">Search</Button>
      </form>
    </Card>
  );
}

export default SearchFeature;
