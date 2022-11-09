import React, {useEffect, useRef, useState} from "react";
import classes from "./SearchFeature.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

function SearchFeature(props) {
  const addressInputRef = useRef();
  const [locationObject, setLocationObject] = useState({});
  const [egid, setEgid] = useState({});

  async function fetchAddress(inputValue) {
    if (inputValue) {
      const str = inputValue.split(' ').join('+');
      const searchByAdressResponse = await fetch(`https://api3.geo.admin.ch/rest/services/ech/SearchServer?searchText=${str}&lang=de&type=locations`);
      const fetchedResponse = await searchByAdressResponse.json();
      setLocationObject(fetchedResponse.results);
    }
  }

  useEffect(() => {
    console.log("useEffect changed")
    if (locationObject && locationObject.length === 1) {
      const resultAddress = locationObject[0].attrs;
      searchByFeatureId(resultAddress.featureId).then(r => {
        console.log("egid: "+ r)
        setEgid(r);
      });
    }
  }, [locationObject]);

  useEffect(() => {
    console.log("useEffect for both changed")
    if (locationObject && egid && locationObject.length === 1) {
      const resultAddress = locationObject[0].attrs;
      let label = resultAddress.label.replace("<b>", "").replace("</b>", "");
      props.onSearchLocation(label, resultAddress.lat, resultAddress.lon, resultAddress.featureId, resultAddress.zoomLevel, egid);
    }
}, [locationObject, egid]);

  async function searchByFeatureId(featureId) {
    console.log("Search By Feature Id: " + featureId)
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json, text/plain, */*");

    let getByFeatureResponse = await fetch(`https://api3.geo.admin.ch/rest/services/ech/MapServer/ch.bfs.gebaeude_wohnungs_register/${featureId}?geometryFormat=geojson`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    });
    const response = await getByFeatureResponse.json();
    return response.feature.properties.egid;
  }


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
