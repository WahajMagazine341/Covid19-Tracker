import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GlobalData from "./GlobalData";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#ccccff"
  },
}));

export default function MainGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={3}>
        <Paper className={classes.paper}>
          <h2 style={{color:"black"}}><strong>Global Data</strong></h2>
            <GlobalData />
          </Paper>
        </Grid>
       
        <Grid item xs={7}>
          <Paper className={classes.paper}> <h4>Country Data*</h4></Paper>
        </Grid> 
        <Grid item xs={2}>
        <Paper className={classes.paper}><h3><strong> Corona Virus </strong></h3> </Paper>
      </Grid>
      </Grid>
     
    </div>
  );
}
