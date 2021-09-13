import "./App.css";
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Map from "./Maps/Map";
import Apartments from "./components/Apartments";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      margin: theme.spacing(8),
      backgroundColor: "#e6e6e6",
      borderRadius: "10px",

      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Apartments />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Map />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
