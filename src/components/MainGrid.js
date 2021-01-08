import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GlobalData from "./GlobalData";
import CountryData from "./CountryData";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // backgroundColor: "#ccccff"
  },
}));

export default function MainGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Paper style={{ backgorundColor: "white" }} className={classes.paper}>
            <h2 style={{ color: "black" }}>
              <strong>Global Data</strong>
            </h2>
            <GlobalData />
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <Paper
            style={{ backgroundColor: "#D3E8FF" }}
            className={classes.paper}
          >
            <h2 style={{ color: "black" }}>Country Data</h2>
            <CountryData />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
