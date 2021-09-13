import React from "react";
import App from "../App";
import { Apartment } from "../module/apartment";
import classes from "./ApartmentItem.module.css";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

const ApartmentItem: React.FC<{
  id: number;
  App: Apartment;
  deleteHandler: (id: string) => void;
}> = (props) => {
  const appId: string = String(props.id);
  return (
    <div className={classes.wrapper}>
      <h2>Apartman : {props.App.name}</h2>
      <p>Adresa: {props.App.adress}</p>
      <p>Opis: {props.App.description}</p>
      <p>
        Latitude: {props.App.lat} , Longitude: {props.App.lon}
      </p>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={props.deleteHandler.bind(null, appId)}
      >
        Obrisi
      </Button>
    </div>
  );
};

export default ApartmentItem;
