import { Button } from "@material-ui/core";
import ApartmentItem from "./ApartmentItem";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { Apartment } from "../module/apartment";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import classes from "./Apartments.module.css";
import SaveIcon from "@material-ui/icons/Save";

const Apartments = () => {
  let list: Apartment[] = [];

  const [newName, setNewName] = useState<string>("");
  const [newAdress, setNewAdress] = useState<string>("");
  const [newDesc, setNewDesc] = useState<string>("");
  const [newLat, setNewLat] = useState<string>();
  const [newLon, setNewLon] = useState<string>();

  const newNameHandler = (e: any) => {
    setNewName(e.target.value);
  };

  const newAdressHandler = (e: any) => {
    setNewAdress(e.target.value);
  };

  const newDescHandler = (e: any) => {
    setNewDesc(e.target.value);
  };

  const newLatHandler = (e: any) => {
    setNewLat(e.target.value);
  };
  const newLonHandler = (e: any) => {
    setNewLon(e.target.value);
  };

  const [newData, setNewData] = useState<any>();
  const [showInput, setShowInput] = useState<boolean>(false);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "https://apartments-8ac3d-default-rtdb.europe-west1.firebasedatabase.app/Apartments.json",
    }).then((response) => {
      setNewData(response.data);
    });
  }, [newData?.length]);

  let key: any;

  if (newData !== undefined) {
    for (key in newData) {
      list.push(newData[key]);
    }
  }

  const deleteItem = (id: string) => {
    const appId = Number(id);
    console.log();
    console.log(id);
    const entries = Object.entries(newData);
    axios({
      method: "delete",
      url:
        "https://apartments-8ac3d-default-rtdb.europe-west1.firebasedatabase.app/Apartments/" +
        entries[appId][0] +
        ".json",
    });
    window.location.reload();
  };

  const showInputHandler = () => {
    setShowInput((prev) => !prev);
  };

  const submitHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    const newAppId = String(new Date().getMilliseconds());

    axios({
      method: "post",
      url: "https://apartments-8ac3d-default-rtdb.europe-west1.firebasedatabase.app/Apartments.json",
      data: {
        name: newName,
        adress: newAdress,
        description: newDesc,
        lat: Number(newLat),
        lon: Number(newLon),
      },
    });
    showInputHandler();
    window.location.reload();
  };

  return (
    <React.Fragment>
      <h2>Dostupni Apartmani</h2>
      {list.map((item, index) => (
        <ApartmentItem App={item} id={index} deleteHandler={deleteItem} />
      ))}

      {showInput || (
        <Button variant="contained" color="primary" onClick={showInputHandler}>
          <AddCircleOutlineIcon />
        </Button>
      )}

      {showInput && (
        <React.Fragment>
          <h2>Dodajte novi Apartman</h2>
          <form>
            <TextField
              variant="outlined"
              color="primary"
              label="Ime"
              value={newName}
              className={classes.textField}
              onChange={newNameHandler}
            />{" "}
            <TextField
              variant="outlined"
              color="primary"
              label="Adresa"
              className={classes.textField}
              value={newAdress}
              onChange={newAdressHandler}
            />{" "}
            <TextField
              variant="outlined"
              color="primary"
              label="Opis"
              className={classes.textField}
              value={newDesc}
              onChange={newDescHandler}
            />{" "}
            <TextField
              variant="outlined"
              color="primary"
              label="Latitude"
              className={classes.textField}
              value={newLat}
              onChange={newLatHandler}
            />{" "}
            <TextField
              variant="outlined"
              color="primary"
              label="Longitude"
              className={classes.textField}
              value={newLon}
              onChange={newLonHandler}
            />
            <br></br>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={submitHandler}
            >
              Spremi
            </Button>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Apartments;
