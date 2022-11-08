import React, { useEffect, useRef, useState } from "react";
import classes from "./SearchFeature.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

function SearchFeature(props) {
  const addressInputRef = useRef();
  const [locationObject, setLocationObject] = useState({});

  async function fetchAddress(inputValue) {
    //TODO: Daten aus Input auf Search-Call mappen
    const response = await fetch("https://api3.geo.admin.ch/rest/services/api/MapServer/find?layer=ch.bfs.gebaeude_wohnungs_register&searchText=2323872&searchField=egid&returnGeometry=false&contains=false");
    const fetchedResponse = await response.json(response);
    //TODO: Koordinaten 
    setLocationObject({ inputLocation: { locAddress: inputValue, locX: 47.5006875, locY: 8.733389 }, fetch: fetchedResponse.results[0].attributes });
  };

  useEffect(() => {
    console.log(locationObject);

    console.log(locationObject);
    if (locationObject.inputLocation) {
      const addressString = locationObject.fetch.strname_deinr + ", " + locationObject.fetch.dplz4 + " " + locationObject.fetch.ggdename;
      props.onSearchLocation(addressString, locationObject.inputLocation.locX, locationObject.inputLocation.locY);
    };

  }, [locationObject]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    fetchAddress(addressInputRef.current.value);
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
