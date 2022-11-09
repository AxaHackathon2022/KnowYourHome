import React, {useEffect, useRef, useState} from "react";
import classes from "./SearchFeature.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

function SearchFeature(props) {
  const addressInputRef = useRef();
  const [locationObject, setLocationObject] = useState({});
  const [buildingInformationObject, setBuildingInformationObject] = useState({});
  const [egid, setEgid] = useState({});

  async function fetchAddress(inputValue) {
    if (inputValue) {
      const str = inputValue.split(' ').join('+');
      const searchByAdressResponse = await fetch(`https://api3.geo.admin.ch/rest/services/ech/SearchServer?searchText=${str}&lang=de&type=locations`);
      const fetchedResponse = await searchByAdressResponse.json();
      setLocationObject(fetchedResponse.results);
    }
  }

  async function fetchBuildingInformation(egid) {
    if (egid && egid.length) {
      const response = await fetch(`https://api3.geo.admin.ch/rest/services/api/MapServer/find?layer=ch.bfs.gebaeude_wohnungs_register&searchText=${egid}&searchField=egid&returnGeometry=false&contains=false`)
      const fetchedResponse = await response.json();
      setBuildingInformationObject(fetchedResponse.results);
    }
  }

  useEffect(() => {
    if (locationObject && locationObject.length) {
      const resultAddress = locationObject[0].attrs;
      searchByFeatureId(resultAddress.featureId).then(r => setEgid(r));
    }
  }, [locationObject]);

  useEffect(() => {
    if (buildingInformationObject && buildingInformationObject.length && buildingInformationObject[0].attributes) {
      props.onBuildingInformationChange(buildingInformationObject[0].attributes);
    }
  }, [buildingInformationObject]);


  useEffect(() => {
    if (locationObject && egid && locationObject.length && egid.length) {
      fetchBuildingInformation(egid);
      const resultAddress = locationObject[0].attrs;
      let label = resultAddress.label.replace("<b>", "").replace("</b>", "");
      props.onSearchLocation(label, resultAddress.lat, resultAddress.lon, resultAddress.featureId, resultAddress.zoomLevel, egid);
    }
}, [locationObject, egid]);

  async function searchByFeatureId(featureId) {
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
