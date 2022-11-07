import React, { useRef } from "react";
import classes from "./SearchFeature.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

function SearchFeature(props) {
  const adressInputRef = useRef();
  
  function GetLocation(inputLocation){
    //TODO: Adress/Location search
    return {locAdress: inputLocation, locX: 0.0, locY: 0.0};
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const locationObject = GetLocation(adressInputRef.current.value);
    
    // console.log(locationObject);
    
    props.onSearchLocation(locationObject.locAdress, locationObject.locX, locationObject.locY);
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={onSubmitHandler}>
        <input
          id="searchAdress" 
          type="text"
          placeholder="Search Location ..."
          ref={adressInputRef}
        />
        <Button type="submit">Search</Button>
      </form>
    </Card>
  );
}

export default SearchFeature;
