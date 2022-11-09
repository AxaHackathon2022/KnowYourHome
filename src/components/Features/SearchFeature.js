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
      const searchByAdressResponse = await fetch(`https://api3.geo.admin.ch/rest/services/ech/SearchServer?searchText=${str}&lang=de&type=locations`);
      const fetchedResponse = await searchByAdressResponse.json();
      setLocationObject(fetchedResponse.results);
    }
  }

  useEffect(() => {
    function searchByFeature(featureId) {
      console.log("Search By Feature Id: " + featureId)
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json, text/plain, */*");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://api3.geo.admin.ch/rest/services/ech/MapServer/ch.bfs.gebaeude_wohnungs_register/${featureId}?geometryFormat=geojson`, requestOptions)
          .then(response => response.text())
          .then(result => console.log("By FeatureId: " + result))
          .catch(error => console.log('error', error));
    }

    if (locationObject && locationObject.length === 1) {
      const resultAddress = locationObject[0].attrs;
      searchByFeature(resultAddress.featureId);
      let label = resultAddress.label.replace("<b>", "").replace("</b>", "");
      props.onSearchLocation(label, resultAddress.lat, resultAddress.lon, resultAddress.featureId, resultAddress.zoomLevel);
    } else {

    }

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
